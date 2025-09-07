// src/app/api/pitchdeck/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { openai } from '@/lib/openai';

function parseJsonToObject(value: unknown): Record<string, any> {
  if (value === null || value === undefined) return {};
  if (typeof value === 'object') {
    // already an object/array — normalize to object if possible
    try {
      return (value as Record<string, any>) ?? {};
    } catch {
      return {};
    }
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return (parsed && typeof parsed === 'object') ? parsed as Record<string, any> : {};
    } catch {
      // not valid JSON string
      return {};
    }
  }
  // primitives (number / boolean / bigint) — can't spread, return empty object
  return {};
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reportId } = body;

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    // Fetch the report (includes analysisData which is stored as Prisma Json)
    const report = await prisma.report.findFirst({
      where: {
        id: reportId,
        userId: session.user.id,
      },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Safely parse analysisData into an object so we can read nested fields without TS complaints
    const analysisDataObj = parseJsonToObject(report.analysisData);

    // Build prompt using available data (use fallback values if missing)
    const tam = report.tamSize ?? analysisDataObj?.marketAnalysis?.tamSize ?? 'N/A';
    const sam = report.samSize ?? analysisDataObj?.marketAnalysis?.samSize ?? 'N/A';
    const som = report.somSize ?? analysisDataObj?.marketAnalysis?.somSize ?? 'N/A';
    const growthRate = analysisDataObj?.marketAnalysis?.growthRate ?? 'N/A';
    const competitiveAdvantage = analysisDataObj?.competitorAnalysis?.competitiveAdvantage ?? 'N/A';
    const investmentScore = report.investmentScore ?? analysisDataObj?.investmentAnalysis?.score ?? 'N/A';

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
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert pitch deck creator for startups. Create compelling, investor-focused pitch decks in valid JSON format."
        },
        {
          role: "user",
          content: pitchDeckPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const rawContent = completion.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error('No response from OpenAI');
    }

    // The model sometimes wraps JSON in markdown or extra text — try to extract the first JSON object
    let pitchDeck: any;
    try {
      // quick attempt: find first '{' and last '}' and parse substring
      const firstBrace = rawContent.indexOf('{');
      const lastBrace = rawContent.lastIndexOf('}');
      if (firstBrace >= 0 && lastBrace > firstBrace) {
        const jsonString = rawContent.slice(firstBrace, lastBrace + 1);
        pitchDeck = JSON.parse(jsonString);
      } else {
        // fallback: try full parse
        pitchDeck = JSON.parse(rawContent);
      }
    } catch (err) {
      console.error('Failed to parse OpenAI response as JSON:', err, 'raw:', rawContent);
      return NextResponse.json({ error: 'OpenAI returned invalid JSON. Raw response logged on server.' }, { status: 500 });
    }

    // Merge pitchDeck into existing analysisData safely
    const existingAnalysis = parseJsonToObject(report.analysisData);
    const updatedAnalysis = {
      ...existingAnalysis,
      pitchDeck,
    };

    // Save updated analysisData back to the report
    await prisma.report.update({
      where: { id: reportId },
      data: {
        analysisData: updatedAnalysis, // Prisma accepts plain objects for Json fields
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
