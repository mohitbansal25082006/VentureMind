// src/components/dashboard/investment-score.tsx
'use client';

import { useMemo } from 'react';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Lightbulb
} from 'lucide-react';
import { getScoreColor, getScoreLabel } from '@/lib/validation';
import type { InvestmentAnalysis } from '@/types/validation';

interface InvestmentScoreProps {
  investmentAnalysis: InvestmentAnalysis;
}

export function InvestmentScore({ investmentAnalysis }: InvestmentScoreProps) {
  const scoreData = useMemo(() => [
    {
      name: 'Investment Score',
      value: investmentAnalysis.score,
      fill: investmentAnalysis.score >= 80 ? '#22c55e' : 
            investmentAnalysis.score >= 60 ? '#eab308' :
            investmentAnalysis.score >= 40 ? '#f97316' : '#ef4444'
    }
  ], [investmentAnalysis.score]);

  const factorsData = useMemo(() => 
    investmentAnalysis.factors?.map(factor => ({
      ...factor,
      percentage: (factor.score / 10) * 100,
      color: factor.score >= 8 ? '#22c55e' : 
             factor.score >= 6 ? '#eab308' :
             factor.score >= 4 ? '#f97316' : '#ef4444'
    })) || []
  , [investmentAnalysis.factors]);

  const improvementsByPriority = useMemo(() => {
    const areas = investmentAnalysis.improvementAreas || [];
    return {
      high: areas.filter(area => area.priority === 'high'),
      medium: areas.filter(area => area.priority === 'medium'), 
      low: areas.filter(area => area.priority === 'low')
    };
  }, [investmentAnalysis.improvementAreas]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFundingStageInfo = (stage: string) => {
    switch (stage) {
      case 'pre-seed':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          description: 'Initial development and validation stage' 
        };
      case 'seed':
        return { 
          color: 'bg-green-100 text-green-800', 
          description: 'Market validation and early traction' 
        };
      case 'series-a':
        return { 
          color: 'bg-purple-100 text-purple-800', 
          description: 'Proven business model and growth' 
        };
      case 'later':
        return { 
          color: 'bg-orange-100 text-orange-800', 
          description: 'Scaling and expansion stage' 
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          description: 'Stage to be determined' 
        };
    }
  };

  const stageInfo = getFundingStageInfo(investmentAnalysis.fundingStage);

  return (
    <div className="space-y-6">
      {/* Investment Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <CardTitle>Investment Readiness Score</CardTitle>
            <CardDescription>Overall assessment out of 100</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative w-32 h-32 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  data={scoreData} 
                  startAngle={90} 
                  endAngle={-270}
                  innerRadius="60%" 
                  outerRadius="90%"
                >
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(investmentAnalysis.score)}`}>
                    {investmentAnalysis.score}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getScoreLabel(investmentAnalysis.score)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Funding Stage</p>
                <Badge className={stageInfo.color}>
                  {investmentAnalysis.fundingStage}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {stageInfo.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estimated Funding</p>
                <p className="text-xl font-bold text-green-600">
                  {investmentAnalysis.estimatedFunding}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scoring Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Breakdown</CardTitle>
          <CardDescription>
            Factors contributing to your investment readiness score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {factorsData.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{factor.factor}</h4>
                  <Badge style={{ backgroundColor: factor.color, color: 'white' }}>
                    {factor.score}/10
                  </Badge>
                </div>
                <Progress value={factor.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{factor.explanation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
          <CardDescription>
            Recommendations to enhance your investment readiness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* High Priority */}
            {improvementsByPriority.high.length > 0 && (
              <div>
                <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  High Priority ({improvementsByPriority.high.length})
                </h4>
                <div className="space-y-3">
                  {improvementsByPriority.high.map((area, index) => (
                    <Alert key={index} className="border-red-200 bg-red-50">
                      <AlertDescription>
                        <div>
                          <strong>{area.area}:</strong> {area.suggestion}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Priority */}
            {improvementsByPriority.medium.length > 0 && (
              <div>
                <h4 className="font-medium text-yellow-700 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Medium Priority ({improvementsByPriority.medium.length})
                </h4>
                <div className="space-y-3">
                  {improvementsByPriority.medium.map((area, index) => (
                    <Alert key={index} className="border-yellow-200 bg-yellow-50">
                      <AlertDescription>
                        <div>
                          <strong>{area.area}:</strong> {area.suggestion}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {/* Low Priority */}
            {improvementsByPriority.low.length > 0 && (
              <div>
                <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Nice to Have ({improvementsByPriority.low.length})
                </h4>
                <div className="space-y-3">
                  {improvementsByPriority.low.map((area, index) => (
                    <Alert key={index} className="border-green-200 bg-green-50">
                      <AlertDescription>
                        <div>
                          <strong>{area.area}:</strong> {area.suggestion}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}