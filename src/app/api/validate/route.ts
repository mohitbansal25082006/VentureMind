// src/app/api/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { validateStartupIdea } from '@/lib/openai';
import { ideaValidationSchema } from '@/lib/validation';
import type { Prisma } from '@prisma/client';

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
          details: validationResult.error.issues,
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

    // Convert all objects to Prisma-compatible JSON values
    const analysisDataJson = JSON.parse(JSON.stringify(analysisData)) as Prisma.InputJsonValue;
    const marketTrendsJson = JSON.parse(JSON.stringify(analysisData.marketAnalysis.marketTrends)) as Prisma.InputJsonValue;
    const competitorsJson = JSON.parse(JSON.stringify(analysisData.competitorAnalysis.directCompetitors)) as Prisma.InputJsonValue;
    const competitorAnalysisJson = JSON.parse(JSON.stringify(analysisData.competitorAnalysis)) as Prisma.InputJsonValue;
    const strengthsJson = JSON.parse(JSON.stringify(analysisData.swotAnalysis.strengths)) as Prisma.InputJsonValue;
    const weaknessesJson = JSON.parse(JSON.stringify(analysisData.swotAnalysis.weaknesses)) as Prisma.InputJsonValue;
    const opportunitiesJson = JSON.parse(JSON.stringify(analysisData.swotAnalysis.opportunities)) as Prisma.InputJsonValue;
    const threatsJson = JSON.parse(JSON.stringify(analysisData.swotAnalysis.threats)) as Prisma.InputJsonValue;
    const risksJson = JSON.parse(JSON.stringify(analysisData.riskAnalysis.risks)) as Prisma.InputJsonValue;
    const revenueStreamsJson = JSON.parse(JSON.stringify(analysisData.businessModel.revenueStreams)) as Prisma.InputJsonValue;
    const monetizationStrategyJson = JSON.parse(JSON.stringify(analysisData.businessModel)) as Prisma.InputJsonValue;
    const techStackJson = JSON.parse(JSON.stringify(analysisData.techAnalysis.recommendedStack)) as Prisma.InputJsonValue;
    const teamEstimationJson = JSON.parse(JSON.stringify(analysisData.techAnalysis.roles)) as Prisma.InputJsonValue;
    const improvementTipsJson = JSON.parse(JSON.stringify(analysisData.investmentAnalysis.improvementAreas)) as Prisma.InputJsonValue;

    // Save report to database
    const report = await prisma.report.create({
      data: {
        userId: session.user.id,
        title,
        description,
        industry,
        targetMarket,
        region,
        analysisData: analysisDataJson,
        tamSize: BigInt(analysisData.marketAnalysis.tamSize || 0),
        samSize: BigInt(analysisData.marketAnalysis.samSize || 0),
        somSize: BigInt(analysisData.marketAnalysis.somSize || 0),
        marketTrends: marketTrendsJson,
        competitors: competitorsJson,
        competitorAnalysis: competitorAnalysisJson,
        strengths: strengthsJson,
        weaknesses: weaknessesJson,
        opportunities: opportunitiesJson,
        threats: threatsJson,
        risks: risksJson,
        revenueStreams: revenueStreamsJson,
        monetizationStrategy: monetizationStrategyJson,
        techStack: techStackJson,
        techComplexity: analysisData.techAnalysis.complexity,
        teamEstimation: teamEstimationJson,
        mvpTimeline: analysisData.techAnalysis.developmentTime,
        budgetEstimate: analysisData.techAnalysis.budgetEstimate.mvp,
        investmentScore: analysisData.investmentAnalysis.score,
        improvementTips: improvementTipsJson,
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