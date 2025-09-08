// src/components/dashboard/risk-matrix.tsx
'use client';

import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { getRiskColor } from '@/lib/validation';
import type { Risk } from '@/types/validation';

interface RiskMatrixProps {
  risks: Risk[];
}

type RiskLevel = 'high' | 'medium' | 'low';

interface RiskChartData {
  x: number;
  y: number;
  name: string;
  description: string;
  mitigation: string;
  impact: Risk['impact'];
  probability: Risk['probability'];
  riskLevel: RiskLevel;
  index: number;
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const riskData: RiskChartData[] = useMemo(
    () =>
      risks.map((risk, index) => ({
        x: risk.probability === 'high' ? 3 : risk.probability === 'medium' ? 2 : 1,
        y: risk.impact === 'high' ? 3 : risk.impact === 'medium' ? 2 : 1,
        name: risk.risk,
        description: risk.description,
        mitigation: risk.mitigation,
        impact: risk.impact,
        probability: risk.probability,
        riskLevel: getRiskLevel(risk.impact, risk.probability),
        index,
      })),
    [risks]
  );

  function getRiskLevel(impact: string, probability: string): RiskLevel {
    const impactScore = impact === 'high' ? 3 : impact === 'medium' ? 2 : 1;
    const probScore = probability === 'high' ? 3 : probability === 'medium' ? 2 : 1;
    const totalScore = impactScore * probScore;

    if (totalScore >= 6) return 'high';
    if (totalScore >= 4) return 'medium';
    return 'low';
  }

  const getRiskLevelColor = (level: RiskLevel): string => {
    switch (level) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>): React.ReactElement | null => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as RiskChartData;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg max-w-sm">
          <h4 className="font-medium text-sm mb-2">{data.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">{data.description}</p>
          <div className="flex gap-2 mb-2">
            <Badge className={getRiskColor(data.impact, data.probability)}>
              {data.riskLevel} risk
            </Badge>
            <Badge variant="outline">{data.impact} impact</Badge>
            <Badge variant="outline">{data.probability} probability</Badge>
          </div>
          <div className="text-xs">
            <strong>Mitigation:</strong> {data.mitigation}
          </div>
        </div>
      );
    }
    return null;
  };

  const riskCategories = useMemo(() => {
    const high = risks.filter((r) => getRiskLevel(r.impact, r.probability) === 'high');
    const medium = risks.filter(
      (r) => getRiskLevel(r.impact, r.probability) === 'medium'
    );
    const low = risks.filter((r) => getRiskLevel(r.impact, r.probability) === 'low');

    return { high, medium, low };
  }, [risks]);

  if (!risks || risks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No risks identified</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">
              {riskCategories.high.length}
            </div>
            <div className="text-sm text-red-600">High Risk</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 text-center">
            <Info className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {riskCategories.medium.length}
            </div>
            <div className="text-sm text-yellow-600">Medium Risk</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {riskCategories.low.length}
            </div>
            <div className="text-sm text-green-600">Low Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Matrix Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Matrix</CardTitle>
          <CardDescription>
            Risk assessment based on impact vs probability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[0.5, 3.5]}
                  tickCount={3}
                  tickFormatter={(value) =>
                    value === 1 ? 'Low' : value === 2 ? 'Medium' : 'High'
                  }
                  label={{
                    value: 'Probability',
                    position: 'insideBottom',
                    offset: -10,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[0.5, 3.5]}
                  tickCount={3}
                  tickFormatter={(value) =>
                    value === 1 ? 'Low' : value === 2 ? 'Medium' : 'High'
                  }
                  label={{ value: 'Impact', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter data={riskData}>
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getRiskLevelColor(entry.riskLevel)}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Details */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis & Mitigation</CardTitle>
          <CardDescription>
            Detailed risk breakdown with mitigation strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium">{risk.risk}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {risk.description}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm font-medium">Mitigation Strategy:</p>
                      <p className="text-sm text-muted-foreground">
                        {risk.mitigation}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getRiskColor(risk.impact, risk.probability)}>
                      {getRiskLevel(risk.impact, risk.probability)} risk
                    </Badge>
                    <div className="text-xs text-muted-foreground text-right">
                      <div>Impact: {risk.impact}</div>
                      <div>Probability: {risk.probability}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
