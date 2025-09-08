// src/app/dashboard/analytics/page.tsx (Enhanced)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdvancedAnalytics } from '@/components/dashboard/advanced-analytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users,
  Lightbulb,
  ArrowRight,
  Activity,
  PieChart,
  TrendingDown,
  Download,
  RefreshCw,
  Calendar,
  Award,
  Briefcase,
  Globe,
  Star,
  Zap,
  ChevronRight,
  BarChart2,
  LineChart,
  AreaChart,
  FileText,
  Eye,
  Settings,
  MoreHorizontal,
  Home
} from 'lucide-react';
import Link from 'next/link';

interface ReportData {
  id: string;
  userId: string;
  title: string;
  description: string;
  industry: string;
  region: string;
  targetMarket: string;
  investmentScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }
  
  // Fetch user's reports with all required fields for AdvancedAnalytics
  const reports = await prisma.report.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      userId: true,
      title: true,
      description: true,
      industry: true,
      region: true,
      targetMarket: true,
      investmentScore: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  
  // Transform reports to match the expected type for AdvancedAnalytics
  const transformedReports: ReportData[] = reports.map(report => ({
    ...report,
    investmentScore: report.investmentScore ?? undefined
  }));
  
  const totalReports = reports.length;
  const avgScore = totalReports > 0 ? Math.round(
    reports.reduce((sum, report) => sum + (report.investmentScore || 0), 0) / totalReports
  ) : 0;
  const highScoreReports = reports.filter(r => (r.investmentScore || 0) >= 80).length;
  
  // Top industries
  const industryCounts: Record<string, number> = {};
  reports.forEach(report => {
    industryCounts[report.industry] = (industryCounts[report.industry] || 0) + 1;
  });
  const topIndustries = Object.entries(industryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([industry, count]) => ({ industry, count }));
  
  // Calculate reports from this month
  const thisMonthReports = reports.filter(r => 
    new Date(r.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  
  // Calculate reports from last month
  const lastMonthReports = reports.filter(r => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return new Date(r.createdAt) > lastMonth && new Date(r.createdAt) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  }).length;
  
  // Calculate growth percentage
  const growthPercentage = lastMonthReports > 0 
    ? Math.round(((thisMonthReports - lastMonthReports) / lastMonthReports) * 100)
    : thisMonthReports > 0 ? 100 : 0;
  
  // Get score distribution
  const scoreDistribution = {
    excellent: reports.filter(r => (r.investmentScore || 0) >= 80).length,
    good: reports.filter(r => (r.investmentScore || 0) >= 60 && (r.investmentScore || 0) < 80).length,
    fair: reports.filter(r => (r.investmentScore || 0) >= 40 && (r.investmentScore || 0) < 60).length,
    poor: reports.filter(r => (r.investmentScore || 0) < 40).length,
  };
  
  // Get region distribution
  const regionCounts: Record<string, number> = {};
  reports.forEach(report => {
    regionCounts[report.region] = (regionCounts[report.region] || 0) + 1;
  });
  const topRegions = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([region, count]) => ({ region, count }));
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-indigo-100">
              Deep insights and trends from your startup validations. Track your progress and identify patterns in your entrepreneurial journey.
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-md" asChild>
              <Link href="/dashboard/validate">
                <BarChart3 className="mr-2 h-4 w-4" />
                Validate Idea
              </Link>
            </Button>
            <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white flex items-center gap-2" asChild>
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-3xl font-bold text-blue-600">{totalReports}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                {growthPercentage > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">{growthPercentage}%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </>
                ) : growthPercentage < 0 ? (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500 font-medium">{Math.abs(growthPercentage)}%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">No change from last month</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-3xl font-bold text-green-600">{avgScore}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{avgScore}/100</span>
              </div>
              <Progress value={avgScore} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Scores</p>
                <p className="text-3xl font-bold text-purple-600">{highScoreReports}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant={highScoreReports > 0 ? "default" : "secondary"} className="text-xs">
                {highScoreReports > 0 ? 'Excellent ideas' : 'Aim higher'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Industry</p>
                <p className="text-2xl font-bold text-orange-600 truncate max-w-[120px]">
                  {topIndustries[0]?.industry || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {topIndustries[0] && (
                <>{Math.round((topIndustries[0].count / totalReports) * 100)}% of your reports</>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Top Industries */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Your Top Industries
              </CardTitle>
              <CardDescription>
                Industries you&apos;ve validated the most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topIndustries.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium capitalize">{item.industry}</h3>
                      <span className="text-lg font-bold">{item.count}</span>
                    </div>
                    <Progress value={(item.count / totalReports) * 100} className="h-2" />
                    <div className="mt-1 text-xs text-muted-foreground">
                      {Math.round((item.count / totalReports) * 100)}% of your reports
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Top Regions */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Your Top Regions
              </CardTitle>
              <CardDescription>
                Regions you&apos;ve focused on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRegions.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium capitalize">{item.region.replace('-', ' ')}</h3>
                      <span className="text-lg font-bold">{item.count}</span>
                    </div>
                    <Progress value={(item.count / totalReports) * 100} className="h-2" />
                    <div className="mt-1 text-xs text-muted-foreground">
                      {Math.round((item.count / totalReports) * 100)}% of your reports
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Score Distribution */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Score Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of your investment scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Excellent (80-100)</h3>
                    <span className="text-lg font-bold text-green-600">{scoreDistribution.excellent}</span>
                  </div>
                  <Progress value={(scoreDistribution.excellent / totalReports) * 100} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {totalReports > 0 ? Math.round((scoreDistribution.excellent / totalReports) * 100) : 0}% of reports
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Good (60-79)</h3>
                    <span className="text-lg font-bold text-blue-600">{scoreDistribution.good}</span>
                  </div>
                  <Progress value={(scoreDistribution.good / totalReports) * 100} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {totalReports > 0 ? Math.round((scoreDistribution.good / totalReports) * 100) : 0}% of reports
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Fair (40-59)</h3>
                    <span className="text-lg font-bold text-yellow-600">{scoreDistribution.fair}</span>
                  </div>
                  <Progress value={(scoreDistribution.fair / totalReports) * 100} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {totalReports > 0 ? Math.round((scoreDistribution.fair / totalReports) * 100) : 0}% of reports
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Poor (0-39)</h3>
                    <span className="text-lg font-bold text-red-600">{scoreDistribution.poor}</span>
                  </div>
                  <Progress value={(scoreDistribution.poor / totalReports) * 100} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {totalReports > 0 ? Math.round((scoreDistribution.poor / totalReports) * 100) : 0}% of reports
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry Distribution */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Industry Distribution
                </CardTitle>
                <CardDescription>
                  How your validations are distributed across industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topIndustries.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="font-medium capitalize">{item.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {Math.round((item.count / totalReports) * 100)}%
                        </span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Region Distribution */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Region Distribution
                </CardTitle>
                <CardDescription>
                  How your validations are distributed across regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRegions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="font-medium capitalize">{item.region.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {Math.round((item.count / totalReports) * 100)}%
                        </span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Monthly Activity
              </CardTitle>
              <CardDescription>
                Your validation activity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div>
                  <h4 className="font-medium">This Month</h4>
                  <p className="text-2xl font-bold text-blue-600">{thisMonthReports}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm">
                    {growthPercentage > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-500 font-medium">{growthPercentage}%</span>
                      </>
                    ) : growthPercentage < 0 ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-500 font-medium">{Math.abs(growthPercentage)}%</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">No change</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Advanced Analytics */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Advanced Analytics
          </h2>
          <p className="text-gray-600 mt-1">Detailed charts and visualizations of your validation data</p>
        </div>
        <AdvancedAnalytics reports={transformedReports} />
      </div>
      
      {/* Getting Started Guide */}
      {totalReports === 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">🚀 Getting Started with Analytics</h3>
                <p className="text-gray-600">Unlock insights by validating your startup ideas</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Validate Your Ideas</h4>
                <p className="text-gray-600 text-sm">
                  Start by validating a few startup ideas to build your analytics data
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Explore Trends</h4>
                <p className="text-gray-600 text-sm">
                  Use the analytics dashboard to identify patterns and insights
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Refine Your Strategy</h4>
                <p className="text-gray-600 text-sm">
                  Apply insights to improve your startup ideas and validation approach
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" asChild>
                <Link href="/dashboard/validate">
                  Start Your First Validation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}