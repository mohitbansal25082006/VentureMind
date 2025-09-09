// src/app/api/onepager/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { openai } from '@/lib/openai';
import type { Prisma } from '@prisma/client';

// ---------------- Types ----------------
interface MarketAnalysis {
  growthRate?: number;
}

interface CompetitorAnalysis {
  competitiveAdvantage?: string;
}

interface OnePagerSection {
  title: string;
  content: string;
}

interface OnePager {
  sections: OnePagerSection[];
}

interface AnalysisData {
  marketAnalysis?: MarketAnalysis;
  competitorAnalysis?: CompetitorAnalysis;
  onePager?: OnePager;
  [key: string]: unknown;
}

// ---------------- Helpers ----------------
function parseJsonToAnalysisData(value: unknown): AnalysisData {
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

/** Extract the first JSON object from a text blob (handles markdown/code fences) */
function extractFirstJsonObject(text: string): string | null {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }
  return null;
}

// Type guard to validate the parsed object structure
function isValidOnePager(obj: unknown): obj is OnePager {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'sections' in obj &&
    Array.isArray((obj as OnePager).sections) &&
    (obj as OnePager).sections.every(
      (section: unknown) =>
        typeof section === 'object' &&
        section !== null &&
        'title' in section &&
        'content' in section &&
        typeof (section as OnePagerSection).title === 'string' &&
        typeof (section as OnePagerSection).content === 'string'
    )
  );
}

// ---------------- Route ----------------
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { reportId?: string };
    const { reportId } = body;

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    // Fetch the report
    const report = await prisma.report.findFirst({
      where: {
        id: reportId,
        userId: session.user.id,
      },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Safely parse analysisData
    const analysisData = parseJsonToAnalysisData(report.analysisData);

    // Build prompt
    const onePagerPrompt = `
Create a concise one-page business summary for the following startup idea:

Title: ${report.title}
Description: ${report.description}
Industry: ${report.industry}
Target Market: ${report.targetMarket}
Region: ${report.region}

Market Analysis:
- TAM: ${report.tamSize ?? 'N/A'}
- SAM: ${report.samSize ?? 'N/A'}
- SOM: ${report.somSize ?? 'N/A'}
- Growth Rate: ${analysisData.marketAnalysis?.growthRate ?? 'N/A'}%

Competitive Advantage: ${analysisData.competitorAnalysis?.competitiveAdvantage ?? 'N/A'}

Investment Score: ${report.investmentScore ?? 'N/A'}/100

Return a single valid JSON object (nothing else) with this structure:
{
  "sections": [
    { "title": "Executive Summary", "content": "string" },
    { "title": "Problem Statement", "content": "string" },
    { "title": "Solution", "content": "string" },
    { "title": "Market Opportunity", "content": "string" },
    { "title": "Business Model", "content": "string" },
    { "title": "Competitive Landscape", "content": "string" },
    { "title": "Team", "content": "string" },
    { "title": "Financial Projections", "content": "string" },
    { "title": "Funding Requirements", "content": "string" },
    { "title": "Contact Information", "content": "string" }
  ]
}
Make the content concise and investor-friendly.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert business writer. Create concise, compelling one-page business summaries in valid JSON format.',
        },
        { role: 'user', content: onePagerPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const rawText = completion.choices?.[0]?.message?.content;
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('No response from OpenAI');
    }

    // Extract and parse JSON robustly
    let onePager: OnePager;
    try {
      const jsonText = extractFirstJsonObject(rawText) ?? rawText;
      const parsed = JSON.parse(jsonText) as unknown;
      
      // Use type guard instead of any
      if (isValidOnePager(parsed)) {
        onePager = parsed;
      } else {
        throw new Error('Parsed object does not match OnePager structure');
      }
    } catch (err) {
      console.error('Failed to parse OpenAI one-pager JSON:', err, 'raw:', rawText);
      return NextResponse.json(
        { error: 'OpenAI returned invalid JSON for one-pager. Raw response logged on server.' },
        { status: 500 }
      );
    }

    // Merge and convert to plain JSON for Prisma
    const merged = {
      ...analysisData,
      onePager,
    };
    const updatedAnalysis = JSON.parse(JSON.stringify(merged)) as Prisma.InputJsonValue;

    await prisma.report.update({
      where: { id: reportId },
      data: {
        analysisData: updatedAnalysis,
      },
    });

    return NextResponse.json({
      success: true,
      onePager,
    });
  } catch (error) {
    console.error('Error generating one-pager:', error);
    return NextResponse.json(
      { error: 'Failed to generate one-pager' },
      { status: 500 }
    );
  }
}