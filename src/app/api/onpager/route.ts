// src/app/api/onepager/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { openai } from '@/lib/openai';

type AnalysisData = {
  marketAnalysis?: {
    growthRate?: number;
  };
  competitorAnalysis?: {
    competitiveAdvantage?: string;
  };
  onePager?: any;
  [key: string]: any;
};

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
    let analysisData: AnalysisData = {};
    try {
      if (report.analysisData && typeof report.analysisData === 'object') {
        analysisData = report.analysisData as AnalysisData;
      } else if (typeof report.analysisData === 'string') {
        analysisData = JSON.parse(report.analysisData) as AnalysisData;
      }
    } catch {
      analysisData = {};
    }

    // Generate one-pager content
    const onePagerPrompt = `
    Create a concise one-page business summary for the following startup idea:
    
    Title: ${report.title}
    Description: ${report.description}
    Industry: ${report.industry}
    Target Market: ${report.targetMarket}
    Region: ${report.region}
    
    Market Analysis:
    - TAM: ${report.tamSize}
    - SAM: ${report.samSize}
    - SOM: ${report.somSize}
    - Growth Rate: ${analysisData.marketAnalysis?.growthRate ?? 'N/A'}%
    
    Competitive Advantage: ${analysisData.competitorAnalysis?.competitiveAdvantage ?? 'N/A'}
    
    Investment Score: ${report.investmentScore}/100
    
    Create a one-pager in JSON format with the following structure:
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
    
    Make the content concise, compelling, and suitable for a one-page document. Use data from the analysis where available.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert business writer. Create concise, compelling one-page business summaries in valid JSON format."
        },
        { role: "user", content: onePagerPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const onePager = JSON.parse(content);

    // Update the report with one-pager data
    await prisma.report.update({
      where: { id: reportId },
      data: {
        analysisData: {
          ...(analysisData || {}),
          onePager,
        },
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
