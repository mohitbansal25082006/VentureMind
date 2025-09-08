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
  Sparkles,
  ChevronRight,
  Activity,
  DollarSign,
  PieChart,
  Filter,
  Search,
  Bell,
  Settings,
  User,
  Globe,
  Briefcase,
  TrendingDown,
  ThumbsUp,
  Eye,
  Download,
  Share2,
  Folders,
  Bookmark,
  MessageSquare,
  BarChart2,
  Grid3X3,
  LayoutGrid,
  MoreHorizontal
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
    if (totalReports >= 10) return { level: 'Expert', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Award, description: 'You&apos;ve mastered the art of startup validation' };
    if (totalReports >= 5) return { level: 'Pro', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Star, description: 'You&apos;re becoming a validation pro' };
    if (totalReports >= 2) return { level: 'Active', color: 'bg-green-100 text-green-800 border-green-200', icon: Zap, description: 'You&apos;re actively building your validation skills' };
    return { level: 'New', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Rocket, description: 'Welcome to your validation journey' };
  };

  const userLevel = getUserLevel();
  const LevelIcon = userLevel.icon;

  // Get time of day for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Welcome Header with User Level */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{greeting}, {session.user.name}!</h1>
                <p className="text-blue-100 mt-1">
                  Ready to validate your next big idea? You&apos;ve created {totalReports} validation{totalReports !== 1 ? 's' : ''} so far.
                </p>
              </div>
            </div>
            <Badge className={`${userLevel.color} mt-3 border`}>
              <LevelIcon className="h-3 w-3 mr-1" />
              {userLevel.level} Validator
            </Badge>
            <p className="text-blue-100 text-sm mt-2 max-w-lg">{userLevel.description}</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/dashboard/validate">
                <Plus className="mr-2 h-4 w-4" />
                New Validation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview with Growth Indicators */}
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
            <div className="mt-4 flex items-center text-sm">
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
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
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
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold text-purple-600">{thisMonthReports}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant={thisMonthReports > 0 ? "default" : "secondary"} className="text-xs">
                {thisMonthReports > 0 ? 'On track' : 'Get started'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Performers</p>
                <p className="text-3xl font-bold text-orange-600">{highPerformingReports.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant={highPerformingReports.length > 0 ? "default" : "secondary"} className="text-xs">
                {highPerformingReports.length > 0 ? 'Excellent ideas' : 'Aim higher'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed hover:border-blue-500 hover:bg-blue-50/30">
              <Link href="/dashboard/validate">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-lg">Validate Idea</h3>
                  <p className="text-sm text-muted-foreground">Get AI-powered analysis</p>
                  <div className="mt-4 text-blue-600 font-medium text-sm flex items-center justify-center">
                    Get Started <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-green-500 hover:bg-green-50/30">
              <Link href="/dashboard/reports">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-lg">My Reports</h3>
                  <p className="text-sm text-muted-foreground">View all validations</p>
                  <div className="mt-4 text-green-600 font-medium text-sm flex items-center justify-center">
                    View Reports <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-purple-500 hover:bg-purple-50/30">
              <Link href="/dashboard/analytics">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-lg">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Trends & insights</p>
                  <div className="mt-4 text-purple-600 font-medium text-sm flex items-center justify-center">
                    Explore Data <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-orange-500 hover:bg-orange-50/30">
              <Link href="/dashboard/resources">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-lg">Resources</h3>
                  <p className="text-sm text-muted-foreground">Guides & templates</p>
                  <div className="mt-4 text-orange-600 font-medium text-sm flex items-center justify-center">
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Recent Reports */}
          {recentReports.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Recent Reports
                    </CardTitle>
                    <CardDescription>Your latest startup validations</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/reports">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-blue-600 transition-colors">{report.title}</h4>
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
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
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
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Your Top Industries
                </CardTitle>
                <CardDescription>Industries you&apos;ve validated the most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topIndustries.map((item) => (
                    <div key={item.industry} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
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
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest validation activities</CardDescription>
            </CardHeader>
            <CardContent>
              {recentReports.length > 0 ? (
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex gap-4 p-4 border-l-4 border-l-blue-500 bg-blue-50/30 rounded-r-lg hover:bg-blue-50/50 transition-colors">
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
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/reports/${report.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your validation activities will appear here once you start creating reports
                  </p>
                  <Button size="lg" asChild>
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
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Personalized Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalReports === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Start validating ideas to get personalized tips
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Diversify Your Industries</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          You&apos;ve focused on {topIndustries[0]?.industry || 'one industry'}. Try exploring other industries for more insights.
                        </p>
                      </div>
                    </div>
                    
                    {avgScore < 70 && (
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Improve Your Ideas</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your average score is {avgScore}. Focus on addressing weaknesses in your ideas to improve scores.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {thisMonthReports === 0 && (
                      <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Clock className="h-4 w-4 text-purple-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Stay Consistent</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            You haven&apos;t validated any ideas this month. Regular validation helps refine your entrepreneurial skills.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {totalReports === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Rocket className="h-6 w-6 text-purple-500" />
                    </div>
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
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Your Entrepreneurial Journey
              </CardTitle>
              <CardDescription>Track your progress as a startup validator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      totalReports >= 1 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {totalReports >= 1 ? <CheckCircle className="h-6 w-6" /> : '1'}
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

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      totalReports >= 3 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {totalReports >= 3 ? <CheckCircle className="h-6 w-6" /> : '2'}
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

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      avgScore >= 70 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {avgScore >= 70 ? <CheckCircle className="h-6 w-6" /> : '3'}
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

                <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      totalReports >= 10 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                      {totalReports >= 10 ? <CheckCircle className="h-6 w-6" /> : '4'}
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
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">🚀 Getting Started</h3>
                <p className="text-gray-600">Your journey to startup validation begins here</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Describe Your Idea</h4>
                <p className="text-gray-600">
                  Tell us about your startup concept and target market
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Get AI Analysis</h4>
                <p className="text-gray-600">
                  Our AI analyzes market potential, risks, and opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Review & Export</h4>
                <p className="text-gray-600">
                  Get comprehensive reports and pitch deck materials
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
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