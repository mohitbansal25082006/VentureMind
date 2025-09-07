// src/app/api/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { validateStartupIdea } from '@/lib/openai';
import { ideaValidationSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validationResult = ideaValidationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid input data',
          details: validationResult.error.issues, // ✅ fixed here
        },
        { status: 400 }
      );
    }

    const { title, description, industry, targetMarket, region } =
      validationResult.data;

    // Generate AI analysis
    console.log('Generating AI analysis for:', title);
    const analysisData = await validateStartupIdea(
      description,
      industry,
      targetMarket,
      region
    );

    // Save report to database
    const report = await prisma.report.create({
      data: {
        userId: session.user.id,
        title,
        description,
        industry,
        targetMarket,
        region,
        analysisData: analysisData,
        tamSize: BigInt(analysisData.marketAnalysis.tamSize || 0),
        samSize: BigInt(analysisData.marketAnalysis.samSize || 0),
        somSize: BigInt(analysisData.marketAnalysis.somSize || 0),
        marketTrends: analysisData.marketAnalysis.marketTrends,
        competitors: analysisData.competitorAnalysis.directCompetitors,
        competitorAnalysis: analysisData.competitorAnalysis,
        strengths: analysisData.swotAnalysis.strengths,
        weaknesses: analysisData.swotAnalysis.weaknesses,
        opportunities: analysisData.swotAnalysis.opportunities,
        threats: analysisData.swotAnalysis.threats,
        risks: analysisData.riskAnalysis.risks,
        revenueStreams: analysisData.businessModel.revenueStreams,
        monetizationStrategy: analysisData.businessModel,
        techStack: analysisData.techAnalysis.recommendedStack,
        techComplexity: analysisData.techAnalysis.complexity,
        teamEstimation: analysisData.techAnalysis.roles,
        mvpTimeline: analysisData.techAnalysis.developmentTime,
        budgetEstimate: analysisData.techAnalysis.budgetEstimate.mvp,
        investmentScore: analysisData.investmentAnalysis.score,
        improvementTips: analysisData.investmentAnalysis.improvementAreas,
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.id,
      data: analysisData,
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate startup idea' },
      { status: 500 }
    );
  }
}
