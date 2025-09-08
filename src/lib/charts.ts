// src/lib/charts.ts

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export const marketSizeColors = {
  TAM: '#8884d8',
  SAM: '#82ca9d',
  SOM: '#ffc658',
};

// ----------------- Risk Matrix -----------------
export type ProbabilityLevel = 'high' | 'medium' | 'low';
export type ImpactLevel = 'high' | 'medium' | 'low';

export interface Risk {
  risk: string;
  description: string;
  probability: ProbabilityLevel;
  impact: ImpactLevel;
}

export interface RiskMatrixPoint {
  x: number;
  y: number;
  name: string;
  description: string;
}

export const riskMatrixData = (risks: Risk[]): RiskMatrixPoint[] => {
  return risks.map((risk) => ({
    x: risk.probability === 'high' ? 3 : risk.probability === 'medium' ? 2 : 1,
    y: risk.impact === 'high' ? 3 : risk.impact === 'medium' ? 2 : 1,
    name: risk.risk,
    description: risk.description,
  }));
};

// ----------------- SWOT -----------------
export interface Swot {
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
}

export interface SwotChartItem {
  category: string;
  count: number;
  color: string;
}

export const swotChartData = (swot: Swot): SwotChartItem[] => {
  return [
    {
      category: 'Strengths',
      count: swot.strengths?.length || 0,
      color: '#22c55e',
    },
    {
      category: 'Weaknesses',
      count: swot.weaknesses?.length || 0,
      color: '#ef4444',
    },
    {
      category: 'Opportunities',
      count: swot.opportunities?.length || 0,
      color: '#3b82f6',
    },
    {
      category: 'Threats',
      count: swot.threats?.length || 0,
      color: '#f97316',
    },
  ];
};

// ----------------- Competitor -----------------
export type ThreatLevel = 'high' | 'medium' | 'low';

export interface Competitor {
  name: string;
  strengths?: string[];
  weaknesses?: string[];
  threat: ThreatLevel;
}

export interface CompetitorStrengthData {
  name: string;
  strengths: number;
  weaknesses: number;
  threat: number;
}

export const competitorStrengthData = (
  competitors: Competitor[]
): CompetitorStrengthData[] => {
  return competitors.map((comp) => ({
    name: comp.name,
    strengths: comp.strengths?.length || 0,
    weaknesses: comp.weaknesses?.length || 0,
    threat: comp.threat === 'high' ? 3 : comp.threat === 'medium' ? 2 : 1,
  }));
};
