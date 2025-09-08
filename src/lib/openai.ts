// src/lib/openai.ts
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MarketTrend {
  trend: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketShare: string;
  funding: string;
}

interface IndirectCompetitor {
  name: string;
  description: string;
  threat: 'high' | 'medium' | 'low';
}

interface SWOTItem {
  point: string;
  description: string;
  impact?: 'high' | 'medium' | 'low';
  severity?: 'high' | 'medium' | 'low';
  potential?: 'high' | 'medium' | 'low';
  probability?: 'high' | 'medium' | 'low';
}

interface Risk {
  risk: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  mitigation: string;
}

interface RevenueStream {
  stream: string;
  description: string;
  feasibility: 'high' | 'medium' | 'low';
  scalability: 'high' | 'medium' | 'low';
  timeline: string;
}

interface CostCategory {
  category: string;
  description: string;
  percentage: number;
}

interface KeyMetric {
  metric: string;
  description: string;
  target: string;
}

interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  additional: string[];
}

interface Role {
  role: string;
  skills: string[];
  priority: 'high' | 'medium' | 'low';
}

interface BudgetEstimate {
  mvp: string;
  fullProduct: string;
  monthly: string;
}

interface Factor {
  factor: string;
  score: number;
  explanation: string;
}

interface ImprovementArea {
  area: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface StartupValidationReport {
  marketAnalysis: {
    tamSize: number;
    samSize: number;
    somSize: number;
    marketTrends: MarketTrend[];
    growthRate: number;
    marketMaturity: 'emerging' | 'growing' | 'mature' | 'declining';
  };
  competitorAnalysis: {
    directCompetitors: Competitor[];
    indirectCompetitors: IndirectCompetitor[];
    competitiveAdvantage: string;
    marketGap: string;
  };
  swotAnalysis: {
    strengths: SWOTItem[];
    weaknesses: SWOTItem[];
    opportunities: SWOTItem[];
    threats: SWOTItem[];
  };
  riskAnalysis: {
    risks: Risk[];
  };
  businessModel: {
    revenueStreams: RevenueStream[];
    costStructure: CostCategory[];
    keyMetrics: KeyMetric[];
  };
  techAnalysis: {
    recommendedStack: TechStack;
    complexity: 'low' | 'medium' | 'high';
    developmentTime: string;
    teamSize: number;
    roles: Role[];
    budgetEstimate: BudgetEstimate;
  };
  investmentAnalysis: {
    score: number;
    factors: Factor[];
    improvementAreas: ImprovementArea[];
    fundingStage: 'pre-seed' | 'seed' | 'series-a' | 'later';
    estimatedFunding: string;
  };
}

export const generateValidationPrompt = (idea: string, industry: string, targetMarket: string, region: string) => `
You are a startup validation expert and venture capitalist. Analyze the following startup idea and provide a comprehensive validation report.

Startup Idea: "${idea}"
Industry: ${industry}
Target Market: ${targetMarket}
Region: ${region}

Please provide a detailed analysis in the following JSON format:

{
  "marketAnalysis": {
    "tamSize": number (in USD),
    "samSize": number (in USD),
    "somSize": number (in USD),
    "marketTrends": [
      {
        "trend": "string",
        "impact": "high|medium|low",
        "description": "string"
      }
    ],
    "growthRate": number (percentage),
    "marketMaturity": "emerging|growing|mature|declining"
  },
  "competitorAnalysis": {
    "directCompetitors": [
      {
        "name": "string",
        "description": "string",
        "strengths": ["string"],
        "weaknesses": ["string"],
        "marketShare": "string",
        "funding": "string"
      }
    ],
    "indirectCompetitors": [
      {
        "name": "string",
        "description": "string",
        "threat": "high|medium|low"
      }
    ],
    "competitiveAdvantage": "string",
    "marketGap": "string"
  },
  "swotAnalysis": {
    "strengths": [
      {
        "point": "string",
        "description": "string",
        "impact": "high|medium|low"
      }
    ],
    "weaknesses": [
      {
        "point": "string",
        "description": "string",
        "severity": "high|medium|low"
      }
    ],
    "opportunities": [
      {
        "point": "string",
        "description": "string",
        "potential": "high|medium|low"
      }
    ],
    "threats": [
      {
        "point": "string",
        "description": "string",
        "probability": "high|medium|low"
      }
    ]
  },
  "riskAnalysis": {
    "risks": [
      {
        "risk": "string",
        "description": "string",
        "impact": "high|medium|low",
        "probability": "high|medium|low",
        "mitigation": "string"
      }
    ]
  },
  "businessModel": {
    "revenueStreams": [
      {
        "stream": "string",
        "description": "string",
        "feasibility": "high|medium|low",
        "scalability": "high|medium|low",
        "timeline": "string"
      }
    ],
    "costStructure": [
      {
        "category": "string",
        "description": "string",
        "percentage": number
      }
    ],
    "keyMetrics": [
      {
        "metric": "string",
        "description": "string",
        "target": "string"
      }
    ]
  },
  "techAnalysis": {
    "recommendedStack": {
      "frontend": ["string"],
      "backend": ["string"],
      "database": ["string"],
      "infrastructure": ["string"],
      "additional": ["string"]
    },
    "complexity": "low|medium|high",
    "developmentTime": "string",
    "teamSize": number,
    "roles": [
      {
        "role": "string",
        "skills": ["string"],
        "priority": "high|medium|low"
      }
    ],
    "budgetEstimate": {
      "mvp": "string",
      "fullProduct": "string",
      "monthly": "string"
    }
  },
  "investmentAnalysis": {
    "score": number (0-100),
    "factors": [
      {
        "factor": "string",
        "score": number (0-10),
        "explanation": "string"
      }
    ],
    "improvementAreas": [
      {
        "area": "string",
        "suggestion": "string",
        "priority": "high|medium|low"
      }
    ],
    "fundingStage": "pre-seed|seed|series-a|later",
    "estimatedFunding": "string"
  }
}

Provide realistic, data-driven insights based on current market conditions and startup trends. Be critical but constructive in your analysis.
`;

export async function validateStartupIdea(
  idea: string,
  industry: string,
  targetMarket: string,
  region: string
): Promise<StartupValidationReport> {
  try {
    const prompt = generateValidationPrompt(idea, industry, targetMarket, region);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert startup analyst and venture capitalist. Provide detailed, realistic startup validation reports in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const analysis: StartupValidationReport = JSON.parse(content);
    return analysis;
  } catch (error) {
    console.error('Error validating startup idea:', error);
    throw new Error('Failed to validate startup idea');
  }
}