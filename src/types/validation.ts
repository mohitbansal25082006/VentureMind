// src/types/validation.ts
export interface MarketAnalysis {
  tamSize: number;
  samSize: number;
  somSize: number;
  marketTrends: MarketTrend[];
  growthRate: number;
  marketMaturity: 'emerging' | 'growing' | 'mature' | 'declining';
}

export interface MarketTrend {
  trend: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketShare?: string;
  funding?: string;
}

export interface CompetitorAnalysis {
  directCompetitors: Competitor[];
  indirectCompetitors: {
    name: string;
    description: string;
    threat: 'high' | 'medium' | 'low';
  }[];
  competitiveAdvantage: string;
  marketGap: string;
}

export interface SWOTPoint {
  point: string;
  description: string;
  impact?: 'high' | 'medium' | 'low';
  severity?: 'high' | 'medium' | 'low';
  potential?: 'high' | 'medium' | 'low';
  probability?: 'high' | 'medium' | 'low';
}

export interface SWOTAnalysis {
  strengths: SWOTPoint[];
  weaknesses: SWOTPoint[];
  opportunities: SWOTPoint[];
  threats: SWOTPoint[];
}

export interface Risk {
  risk: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface RevenueStream {
  stream: string;
  description: string;
  feasibility: 'high' | 'medium' | 'low';
  scalability: 'high' | 'medium' | 'low';
  timeline: string;
}

export interface BusinessModel {
  revenueStreams: RevenueStream[];
  costStructure: {
    category: string;
    description: string;
    percentage: number;
  }[];
  keyMetrics: {
    metric: string;
    description: string;
    target: string;
  }[];
}

export interface TechAnalysis {
  recommendedStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
    additional: string[];
  };
  complexity: 'low' | 'medium' | 'high';
  developmentTime: string;
  teamSize: number;
  roles: {
    role: string;
    skills: string[];
    priority: 'high' | 'medium' | 'low';
  }[];
  budgetEstimate: {
    mvp: string;
    fullProduct: string;
    monthly: string;
  };
}

export interface InvestmentAnalysis {
  score: number;
  factors: {
    factor: string;
    score: number;
    explanation: string;
  }[];
  improvementAreas: {
    area: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  fundingStage: 'pre-seed' | 'seed' | 'series-a' | 'later';
  estimatedFunding: string;
}

export interface ValidationReport {
  marketAnalysis: MarketAnalysis;
  competitorAnalysis: CompetitorAnalysis;
  swotAnalysis: SWOTAnalysis;
  riskAnalysis: { risks: Risk[] };
  businessModel: BusinessModel;
  techAnalysis: TechAnalysis;
  investmentAnalysis: InvestmentAnalysis;
}

export interface ReportData {
  id: string;
  userId: string;
  title: string;
  description: string;
  industry: string;
  targetMarket: string;
  region: string;
  analysisData?: ValidationReport;
  investmentScore?: number;
  createdAt: Date;
  updatedAt: Date;
}