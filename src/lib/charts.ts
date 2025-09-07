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

export const riskMatrixData = (risks: any[]) => {
  return risks.map(risk => ({
    x: risk.probability === 'high' ? 3 : risk.probability === 'medium' ? 2 : 1,
    y: risk.impact === 'high' ? 3 : risk.impact === 'medium' ? 2 : 1,
    name: risk.risk,
    description: risk.description,
  }));
};

export const swotChartData = (swot: any) => {
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

export const competitorStrengthData = (competitors: any[]) => {
  return competitors.map((comp, index) => ({
    name: comp.name,
    strengths: comp.strengths?.length || 0,
    weaknesses: comp.weaknesses?.length || 0,
    threat: comp.threat === 'high' ? 3 : comp.threat === 'medium' ? 2 : 1,
  }));
};