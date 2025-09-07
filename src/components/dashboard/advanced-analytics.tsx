// src/components/dashboard/advanced-analytics.tsx (New)
'use client';
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieChartIcon,
  Activity,
  Target,
  DollarSign,
  Users,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { formatCurrency } from '@/lib/validation';
import type { ReportData } from '@/types/validation';

interface AdvancedAnalyticsProps {
  reports: ReportData[];
}

export function AdvancedAnalytics({ reports }: AdvancedAnalyticsProps) {
  const industryData = useMemo(() => {
    const industryCounts: Record<string, number> = {};
    reports.forEach(report => {
      industryCounts[report.industry] = (industryCounts[report.industry] || 0) + 1;
    });
    
    return Object.entries(industryCounts).map(([industry, count]) => ({
      name: industry,
      value: count
    }));
  }, [reports]);

  const regionData = useMemo(() => {
    const regionCounts: Record<string, number> = {};
    reports.forEach(report => {
      regionCounts[report.region] = (regionCounts[report.region] || 0) + 1;
    });
    
    return Object.entries(regionCounts).map(([region, count]) => ({
      name: region.replace('-', ' '),
      value: count
    }));
  }, [reports]);

  const scoreData = useMemo(() => {
    const scoreRanges = {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61-80': 0,
      '81-100': 0
    };
    
    reports.forEach(report => {
      if (report.investmentScore !== undefined) {
        const score = report.investmentScore;
        if (score <= 20) scoreRanges['0-20']++;
        else if (score <= 40) scoreRanges['21-40']++;
        else if (score <= 60) scoreRanges['41-60']++;
        else if (score <= 80) scoreRanges['61-80']++;
        else scoreRanges['81-100']++;
      }
    });
    
    return Object.entries(scoreRanges).map(([range, count]) => ({
      name: range,
      value: count
    }));
  }, [reports]);

  const timelineData = useMemo(() => {
    const monthlyCounts: Record<string, number> = {};
    
    reports.forEach(report => {
      const date = new Date(report.createdAt);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;
    });
    
    return Object.entries(monthlyCounts)
      .map(([monthKey, count]) => {
        const [year, month] = monthKey.split('-');
        return {
          name: `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`,
          value: count
        };
      })
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [reports]);

  const avgScoresByIndustry = useMemo(() => {
    const industryScores: Record<string, { total: number; count: number }> = {};
    
    reports.forEach(report => {
      if (report.investmentScore !== undefined) {
        if (!industryScores[report.industry]) {
          industryScores[report.industry] = { total: 0, count: 0 };
        }
        industryScores[report.industry].total += report.investmentScore;
        industryScores[report.industry].count += 1;
      }
    });
    
    return Object.entries(industryScores)
      .map(([industry, { total, count }]) => ({
        name: industry,
        score: Math.round(total / count)
      }))
      .sort((a, b) => b.score - a.score);
  }, [reports]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const totalReports = reports.length;
  const avgScore = reports.reduce((sum, report) => sum + (report.investmentScore || 0), 0) / totalReports || 0;
  const highScoreReports = reports.filter(r => (r.investmentScore || 0) >= 80).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-blue-600">{totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(avgScore)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Scores</p>
                <p className="text-2xl font-bold text-purple-600">{highScoreReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-orange-600">
                  {reports.filter(r => 
                    new Date(r.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Report Creation Timeline</CardTitle>
              <CardDescription>
                Number of reports created over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industries">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports by Industry</CardTitle>
                <CardDescription>
                  Distribution of reports across different industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Scores by Industry</CardTitle>
                <CardDescription>
                  Investment readiness scores across different industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={avgScoresByIndustry} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <CardTitle>Investment Score Distribution</CardTitle>
              <CardDescription>
                Distribution of investment readiness scores across all reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Reports by Region</CardTitle>
              <CardDescription>
                Distribution of reports across different regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}