// src/app/dashboard/page.tsx (Enhanced)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Users,
  Calendar,
  ArrowRight,
  Target,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Zap,
  Award,
  Rocket,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  // Fetch user's reports
  const recentReports = await prisma.report.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    select: {
      id: true,
      title: true,
      industry: true,
      investmentScore: true,
      createdAt: true,
      region: true,
    },
  });

  const totalReports = await prisma.report.count({
    where: {
      userId: session.user.id,
    },
  });

  const avgScore = totalReports > 0 ? Math.round(
    (await prisma.report.aggregate({
      where: {
        userId: session.user.id,
        investmentScore: { not: null },
      },
      _avg: {
        investmentScore: true,
      },
    }))._avg.investmentScore || 0
  ) : 0;

  // Calculate reports from this month
  const thisMonthReports = await prisma.report.count({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  // Calculate reports from last month
  const lastMonthReports = await prisma.report.count({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  // Calculate growth percentage
  const growthPercentage = lastMonthReports > 0 
    ? Math.round(((thisMonthReports - lastMonthReports) / lastMonthReports) * 100)
    : thisMonthReports > 0 ? 100 : 0;

  // Get top industries
  const industryCounts: Record<string, number> = {};
  recentReports.forEach(report => {
    industryCounts[report.industry] = (industryCounts[report.industry] || 0) + 1;
  });
  const topIndustries = Object.entries(industryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([industry, count]) => ({ industry, count }));

  // Get high performing reports
  const highPerformingReports = recentReports.filter(r => (r.investmentScore || 0) >= 80);

  // Determine user level based on activity
  const getUserLevel = () => {
    if (totalReports >= 10) return { level: 'Expert', color: 'bg-purple-100 text-purple-800', icon: Award };
    if (totalReports >= 5) return { level: 'Pro', color: 'bg-blue-100 text-blue-800', icon: Star };
    if (totalReports >= 2) return { level: 'Active', color: 'bg-green-100 text-green-800', icon: Zap };
    return { level: 'New', color: 'bg-yellow-100 text-yellow-800', icon: Rocket };
  };

  const userLevel = getUserLevel();
  const LevelIcon = userLevel.icon;

  return (
    <div className="space-y-8">
      {/* Welcome Header with User Level */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Welcome back, {session.user.name}!
            <Badge className={userLevel.color}>
              <LevelIcon className="h-3 w-3 mr-1" />
              {userLevel.level}
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to validate your next big idea? You've created {totalReports} validation{totalReports !== 1 ? 's' : ''} so far.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/validate">
              <Plus className="mr-2 h-4 w-4" />
              New Validation
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview with Growth Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-3xl font-bold text-blue-600">{totalReports}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {growthPercentage > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">{growthPercentage}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </>
              ) : growthPercentage < 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1 rotate-180" />
                  <span className="text-red-500">{Math.abs(growthPercentage)}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </>
              ) : (
                <span className="text-muted-foreground">No change from last month</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-green-600">{avgScore}</p>
              </div>
              <Target className="h-10 w-10 text-green-500" />
            </div>
            <div className="mt-2">
              <Progress value={avgScore} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold text-purple-600">{thisMonthReports}</p>
              </div>
              <Calendar className="h-10 w-10 text-purple-500" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {thisMonthReports > 0 ? (
                `Great progress! Keep it up.`
              ) : (
                `No validations yet this month.`
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Performers</p>
                <p className="text-3xl font-bold text-orange-600">{highPerformingReports.length}</p>
              </div>
              <Star className="h-10 w-10 text-orange-500" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {highPerformingReports.length > 0 ? (
                `Ideas with 80+ score`
              ) : (
                `No high performers yet`
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 hover:border-solid">
              <Link href="/dashboard/validate">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Plus className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Validate Idea</h3>
                  <p className="text-sm text-muted-foreground">Get AI-powered analysis</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/dashboard/reports">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">My Reports</h3>
                  <p className="text-sm text-muted-foreground">View all validations</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/dashboard/analytics">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Trends & insights</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/dashboard/reports">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Lightbulb className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Resources</h3>
                  <p className="text-sm text-muted-foreground">Guides & templates</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Recent Reports */}
          {recentReports.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>Your latest startup validations</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/reports">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                          </div>
                          <Badge variant="outline" className="capitalize">{report.industry}</Badge>
                          <Badge variant="secondary" className="capitalize">{report.region.replace('-', ' ')}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {report.investmentScore !== null && (
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              report.investmentScore >= 80 ? 'text-green-600' :
                              report.investmentScore >= 60 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {report.investmentScore}
                            </div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/reports/${report.id}`}>
                            View
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Industries */}
          {topIndustries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Top Industries</CardTitle>
                <CardDescription>Industries you've validated the most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topIndustries.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium capitalize">{item.industry}</h3>
                        <span className="text-lg font-bold">{item.count}</span>
                      </div>
                      <Progress value={(item.count / recentReports.length) * 100} className="h-2" />
                      <div className="mt-1 text-xs text-muted-foreground">
                        {Math.round((item.count / recentReports.length) * 100)}% of your reports
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest validation activities</CardDescription>
            </CardHeader>
            <CardContent>
              {recentReports.length > 0 ? (
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={report.id} className="flex gap-4 p-4 border-l-4 border-l-blue-500 bg-blue-50/30 rounded-r-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Created validation report</h4>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{report.title}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs capitalize">{report.industry}</Badge>
                          {report.investmentScore !== null && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                report.investmentScore >= 80 ? 'border-green-500 text-green-700' :
                                report.investmentScore >= 60 ? 'border-yellow-500 text-yellow-700' :
                                'border-red-500 text-red-700'
                              }`}
                            >
                              Score: {report.investmentScore}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your validation activities will appear here
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/validate">
                      Start Your First Validation
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Personalized Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalReports === 0 ? (
                  <div className="text-center py-4">
                    <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Start validating ideas to get personalized tips
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Diversify Your Industries</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          You've focused on {topIndustries[0]?.industry || 'one industry'}. Try exploring other industries for more insights.
                        </p>
                      </div>
                    </div>
                    
                    {avgScore < 70 && (
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Improve Your Ideas</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your average score is {avgScore}. Focus on addressing weaknesses in your ideas to improve scores.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {thisMonthReports === 0 && (
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Stay Consistent</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            You haven't validated any ideas this month. Regular validation helps refine your entrepreneurial skills.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalReports === 0 ? (
                  <div className="text-center py-4">
                    <Rocket className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Start your journey with these recommended actions
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/dashboard/validate">
                        Validate Your First Idea
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button asChild className="w-full justify-start">
                      <Link href="/dashboard/validate">
                        <Plus className="mr-2 h-4 w-4" />
                        Validate New Idea
                      </Link>
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full justify-start">
                      <Link href="/dashboard/reports">
                        <FileText className="mr-2 h-4 w-4" />
                        Review Past Reports
                      </Link>
                    </Button>
                    
                    {avgScore < 80 && (
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard/analytics">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analyze Your Performance
                        </Link>
                      </Button>
                    )}
                    
                    {highPerformingReports.length > 0 && (
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href={`/dashboard/reports/${highPerformingReports[0].id}`}>
                          <Star className="mr-2 h-4 w-4" />
                          Explore Your Best Idea
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Your Entrepreneurial Journey</CardTitle>
              <CardDescription>Track your progress as a startup validator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      totalReports >= 1 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {totalReports >= 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                    </div>
                    <div>
                      <h4 className="font-medium">First Validation</h4>
                      <p className="text-sm text-muted-foreground">Complete your first idea validation</p>
                    </div>
                  </div>
                  {totalReports >= 1 ? (
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  ) : (
                    <Button size="sm" asChild>
                      <Link href="/dashboard/validate">Start</Link>
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      totalReports >= 3 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {totalReports >= 3 ? <CheckCircle className="h-5 w-5" /> : '2'}
                    </div>
                    <div>
                      <h4 className="font-medium">Consistent Validator</h4>
                      <p className="text-sm text-muted-foreground">Complete 3 validations</p>
                    </div>
                  </div>
                  {totalReports >= 3 ? (
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  ) : (
                    <Badge variant="outline">{totalReports}/3 completed</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      avgScore >= 70 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {avgScore >= 70 ? <CheckCircle className="h-5 w-5" /> : '3'}
                    </div>
                    <div>
                      <h4 className="font-medium">Quality Analyst</h4>
                      <p className="text-sm text-muted-foreground">Achieve average score of 70+</p>
                    </div>
                  </div>
                  {avgScore >= 70 ? (
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  ) : (
                    <Badge variant="outline">{avgScore}/70 points</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      totalReports >= 10 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {totalReports >= 10 ? <CheckCircle className="h-5 w-5" /> : '4'}
                    </div>
                    <div>
                      <h4 className="font-medium">Expert Validator</h4>
                      <p className="text-sm text-muted-foreground">Complete 10 validations</p>
                    </div>
                  </div>
                  {totalReports >= 10 ? (
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  ) : (
                    <Badge variant="outline">{totalReports}/10 completed</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Getting Started Guide for New Users */}
      {totalReports === 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Rocket className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">🚀 Getting Started</h3>
                <p className="text-muted-foreground">Your journey to startup validation begins here</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-2">Describe Your Idea</h4>
                <p className="text-sm text-muted-foreground">
                  Tell us about your startup concept and target market
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-2">Get AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes market potential, risks, and opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-2">Review & Export</h4>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive reports and pitch deck materials
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button size="lg" asChild>
                <Link href="/dashboard/validate">
                  Start Your First Validation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}