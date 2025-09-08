// src/app/dashboard/analytics/page.tsx (Updated)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdvancedAnalytics } from '@/components/dashboard/advanced-analytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }

  // Fetch user's reports
  const reports = await prisma.report.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      industry: true,
      region: true,
      investmentScore: true,
      createdAt: true,
    },
  });

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Insights and trends from your startup validations
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/validate">
            Validate New Idea
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

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
                <p className="text-2xl font-bold text-green-600">{avgScore}</p>
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
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Industry</p>
                <p className="text-2xl font-bold text-orange-600">
                  {topIndustries[0]?.industry || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Industries */}
      <Card>
        <CardHeader>
          <CardTitle>Your Top Industries</CardTitle>
          <CardDescription>
            Industries you've validated the most
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topIndustries.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.industry}</h3>
                  <span className="text-lg font-bold">{item.count}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {Math.round((item.count / totalReports) * 100)}% of your reports
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics */}
      <AdvancedAnalytics reports={reports as any} />

      {/* Getting Started Guide */}
      {totalReports === 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4">🚀 Getting Started with Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-2">Validate Your Ideas</h4>
                <p className="text-sm text-muted-foreground">
                  Start by validating a few startup ideas to build your analytics data
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-2">Explore Trends</h4>
                <p className="text-sm text-muted-foreground">
                  Use the analytics dashboard to identify patterns and insights
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-2">Refine Your Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  Apply insights to improve your startup ideas and validation approach
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
