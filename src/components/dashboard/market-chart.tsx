// src/components/dashboard/market-chart.tsx
'use client';

import { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  TooltipProps
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/validation';
import type { MarketAnalysis } from '@/types/validation';
import type { NameType, ValueType, Payload } from 'recharts/types/component/DefaultTooltipContent';

interface MarketChartProps {
  marketAnalysis: MarketAnalysis;
}

interface MarketSizeDataItem {
  name: string;
  value: number;
  color: string;
  abbreviation: string;
}

interface TrendDataItem {
  name: string;
  impact: number;
  description: string;
  impactLabel: string;
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: Array<Payload<ValueType, NameType>>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function MarketChart({ marketAnalysis }: MarketChartProps) {
  const marketSizeData = useMemo((): MarketSizeDataItem[] => [
    {
      name: 'TAM (Total Addressable)',
      value: marketAnalysis.tamSize,
      color: COLORS[0],
      abbreviation: 'TAM'
    },
    {
      name: 'SAM (Serviceable Addressable)', 
      value: marketAnalysis.samSize,
      color: COLORS[1],
      abbreviation: 'SAM'
    },
    {
      name: 'SOM (Serviceable Obtainable)',
      value: marketAnalysis.somSize,
      color: COLORS[2],
      abbreviation: 'SOM'
    }
  ], [marketAnalysis]);

  const trendsData = useMemo((): TrendDataItem[] => 
    marketAnalysis.marketTrends?.map((trend) => ({
      name: trend.trend,
      impact: trend.impact === 'high' ? 3 : trend.impact === 'medium' ? 2 : 1,
      description: trend.description,
      impactLabel: trend.impact
    })) || []
  , [marketAnalysis.marketTrends]);

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'emerging': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-green-100 text-green-800'; 
      case 'mature': return 'bg-yellow-100 text-yellow-800';
      case 'declining': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as MarketSizeDataItem;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  const TrendsTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as TrendDataItem;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg max-w-xs">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
          <Badge className={`mt-2 ${
            data.impactLabel === 'high' ? 'bg-red-100 text-red-800' :
            data.impactLabel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {data.impactLabel} impact
          </Badge>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Market Size Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketSizeData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.abbreviation}
                  </p>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>
                    {formatCurrency(item.value)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {item.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Size Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Size Analysis</CardTitle>
          <CardDescription>
            Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketSizeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="abbreviation" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {marketSizeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      {trendsData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Market Trends Impact</CardTitle>
            <CardDescription>
              Key trends affecting your market and their potential impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 3]} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={150}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip content={<TrendsTooltip />} />
                  <Bar dataKey="impact" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {marketAnalysis.growthRate}%
                </p>
                <p className="text-xs text-muted-foreground">Annual growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Maturity</p>
                <Badge className={getMaturityColor(marketAnalysis.marketMaturity)}>
                  {marketAnalysis.marketMaturity}
                </Badge>
              </div>
              <TrendingDown className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}