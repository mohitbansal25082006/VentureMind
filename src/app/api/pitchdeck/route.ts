// src/app/api/pitchdeck/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { openai } from '@/lib/openai';
import type { Prisma } from '@prisma/client';

// ---------------- Types ----------------
interface MarketAnalysis {
  tamSize?: string;
  samSize?: string;
  somSize?: string;
  growthRate?: string;
}

interface CompetitorAnalysis {
  competitiveAdvantage?: string;
}

interface InvestmentAnalysis {
  score?: string | number;
}

interface AnalysisData {
  marketAnalysis?: MarketAnalysis;
  competitorAnalysis?: CompetitorAnalysis;
  investmentAnalysis?: InvestmentAnalysis;
  [key: string]: unknown;
}

interface Slide {
  title: string;
  content: Record<string, unknown>;
}

interface PitchDeck {
  slides: Slide[];
}

// ---------------- Helpers ----------------
function parseJsonToObject(value: unknown): AnalysisData {
  if (value === null || value === undefined) return {};
  if (typeof value === 'object') {
    try {
      return (value as AnalysisData) ?? {};
    } catch {
      return {};
    }
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return (parsed && typeof parsed === 'object') ? (parsed as AnalysisData) : {};
    } catch {
      return {};
    }
  }
  return {};
}

// ---------------- Route ----------------
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: { reportId?: string } = await request.json();
    const { reportId } = body;

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    // Fetch report from DB
    const report = await prisma.report.findFirst({
      where: {
        id: reportId,
        userId: session.user.id,
      },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const analysisDataObj = parseJsonToObject(report.analysisData);

    // Build prompt
    const tam = report.tamSize ?? analysisDataObj?.marketAnalysis?.tamSize ?? 'N/A';
    const sam = report.samSize ?? analysisDataObj?.marketAnalysis?.samSize ?? 'N/A';
    const som = report.somSize ?? analysisDataObj?.marketAnalysis?.somSize ?? 'N/A';
    const growthRate = analysisDataObj?.marketAnalysis?.growthRate ?? 'N/A';
    const competitiveAdvantage =
      analysisDataObj?.competitorAnalysis?.competitiveAdvantage ?? 'N/A';
    const investmentScore =
      report.investmentScore ?? analysisDataObj?.investmentAnalysis?.score ?? 'N/A';

    const pitchDeckPrompt = `
Create a professional, investor-focused 10-slide pitch deck in valid JSON for the following startup idea.

Title: ${report.title}
Description: ${report.description}
Industry: ${report.industry}
Target Market: ${report.targetMarket}
Region: ${report.region}

Market Analysis:
- TAM: ${String(tam)}
- SAM: ${String(sam)}
- SOM: ${String(som)}
- Growth Rate: ${String(growthRate)}%

Competitive Advantage: ${String(competitiveAdvantage)}

Investment Score: ${String(investmentScore)} / 100

Return the output strictly as a single valid JSON object with this structure:
{
  "slides": [
    { "title": "Cover", "content": { "startupName":"", "tagline":"", "presenter":"" } },
    { "title": "Problem", "content": { "problemStatement":"", "currentSolutions":[], "painPoints": [] } },
    { "title": "Solution", "content": { "productDescription":"", "keyFeatures":[], "uniqueValueProposition":"" } },
    { "title": "Market Opportunity", "content": { "tam":"", "sam":"", "som":"", "marketTrends": [] } },
    { "title": "Business Model", "content": { "revenueStreams": [], "pricingStrategy":"", "customerAcquisition":"" } },
    { "title": "Competitive Landscape", "content": { "keyCompetitors": [], "competitiveAdvantage":"", "marketGap":"" } },
    { "title": "Go-to-Market Strategy", "content": { "targetSegments": [], "marketingChannels": [], "salesStrategy": "" } },
    { "title": "Team", "content": { "teamStructure":"", "keyRoles": [], "advisors": [] } },
    { "title": "Financial Projections", "content": { "revenueProjections":"", "keyMetrics":"", "fundingRequirements":"" } },
    { "title": "Investment Opportunity", "content": { "fundingAmount":"", "useOfFunds": [], "timeline":"", "exitStrategy":"" } }
  ]
}

Use data from the analysis where available and keep text concise, compelling, and investor-focused.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert pitch deck creator for startups. Create compelling, investor-focused pitch decks in valid JSON format.',
        },
        {
          role: 'user',
          content: pitchDeckPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const rawContent = completion.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error('No response from OpenAI');
    }

    let pitchDeck: PitchDeck;
    try {
      const firstBrace = rawContent.indexOf('{');
      const lastBrace = rawContent.lastIndexOf('}');
      if (firstBrace >= 0 && lastBrace > firstBrace) {
        const jsonString = rawContent.slice(firstBrace, lastBrace + 1);
        pitchDeck = JSON.parse(jsonString) as PitchDeck;
      } else {
        pitchDeck = JSON.parse(rawContent) as PitchDeck;
      }
    } catch (err) {
      console.error('Failed to parse OpenAI response as JSON:', err, 'raw:', rawContent);
      return NextResponse.json(
        { error: 'OpenAI returned invalid JSON. Raw response logged on server.' },
        { status: 500 }
      );
    }

    const existingAnalysis = parseJsonToObject(report.analysisData);

    // Convert to plain JSON then cast to Prisma.InputJsonValue to satisfy the compiler
    const updatedAnalysis = JSON.parse(
      JSON.stringify({
        ...existingAnalysis,
        pitchDeck,
      })
    ) as Prisma.InputJsonValue;

    await prisma.report.update({
      where: { id: reportId },
      data: {
        analysisData: updatedAnalysis,
      },
    });

    return NextResponse.json({
      success: true,
      pitchDeck,
    });
  } catch (error) {
    console.error('Error generating pitch deck:', error);
    return NextResponse.json(
      { error: 'Failed to generate pitch deck' },
      { status: 500 }
    );
  }
}
