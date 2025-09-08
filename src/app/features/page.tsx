// src/app/features/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Brain, 
  Target, 
  Shield, 
  Zap, 
  FileText, 
  Users, 
  TrendingUp, 
  Globe,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Clock,
  Download,
  Share2,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  BarChart2,
  PieChart,
  Activity,
  Database,
  Cloud,
  Lock,
  Smartphone,
  MessageSquare,
  Video,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0"></div>
        <div className="container relative z-10 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need to Validate Your Startup Idea
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              VentureMind provides a comprehensive suite of AI-powered tools to help entrepreneurs validate their business ideas quickly and effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard/validate">
                  Start Validating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-muted-foreground">
              Our platform is packed with powerful features designed to help you validate your startup idea with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  AI-Powered Analysis
                  <Badge variant="secondary">Core</Badge>
                </CardTitle>
                <CardDescription>
                  Leverage advanced AI to analyze your startup idea from multiple angles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Market size and opportunity analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Competitor landscape assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>SWOT and risk analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Investment readiness scoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Market Research
                  <Badge variant="secondary">Core</Badge>
                </CardTitle>
                <CardDescription>
                  Comprehensive market analysis with TAM, SAM, and SOM calculations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Total Addressable Market (TAM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Serviceable Addressable Market (SAM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Serviceable Obtainable Market (SOM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Market trends and growth projections</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Competitor Analysis
                  <Badge variant="secondary">Core</Badge>
                </CardTitle>
                <CardDescription>
                  Identify and analyze your competitors to find your competitive edge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Direct and indirect competitor identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Competitive positioning analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Market gap identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Competitive advantage recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Risk Assessment
                  <Badge variant="secondary">Core</Badge>
                </CardTitle>
                <CardDescription>
                  Identify potential risks and get mitigation strategies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive risk identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Impact and probability analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Risk matrix visualization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Mitigation strategy recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-red-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Pitch Deck Generator
                  <Badge variant="secondary">Advanced</Badge>
                </CardTitle>
                <CardDescription>
                  Automatically generate professional pitch decks for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>10-slide professional pitch deck</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Investor-focused content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Customizable design templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Export to PDF or Google Slides</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  One-Pager Summary
                  <Badge variant="secondary">Advanced</Badge>
                </CardTitle>
                <CardDescription>
                  Create concise one-page business summaries for investors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Executive summary generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Key business metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Funding requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Professional formatting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
              <Star className="w-3 h-3 mr-1" />
              Advanced Capabilities
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-muted-foreground">
              Take your startup validation to the next level with our advanced features.
            </p>
          </div>

          <Tabs defaultValue="analytics" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    Advanced Analytics Dashboard
                  </CardTitle>
                  <CardDescription>
                    Gain deep insights into your validation performance and trends.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PieChart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Industry Breakdown</h4>
                        <p className="text-sm text-muted-foreground">
                          Visualize your validation history across different industries.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Performance Trends</h4>
                        <p className="text-sm text-muted-foreground">
                          Track your improvement over time with detailed trend analysis.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Score Distribution</h4>
                        <p className="text-sm text-muted-foreground">
                          Understand the distribution of your validation scores.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Regional Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Analyze your validations by geographic region.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="collaboration" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Collaboration
                  </CardTitle>
                  <CardDescription>
                    Work together with your team to validate and refine your startup ideas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Real-time Comments</h4>
                        <p className="text-sm text-muted-foreground">
                          Collaborate with team members through real-time comments and feedback.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Share2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Shareable Reports</h4>
                        <p className="text-sm text-muted-foreground">
                          Easily share validation reports with stakeholders and investors.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Team Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Invite team members and manage access permissions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Video Meetings</h4>
                        <p className="text-sm text-muted-foreground">
                          Schedule and conduct video meetings directly from the platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                Platform Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect VentureMind with your favorite tools and services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Crunchbase Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Access real-time competitor data from Crunchbase.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Cloud className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Drive</h4>
                        <p className="text-sm text-muted-foreground">
                          Save and access your reports directly in Google Drive.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Slack Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Get notifications and share reports in your Slack channels.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Smartphone className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Mobile Apps</h4>
                        <p className="text-sm text-muted-foreground">
                          Access VentureMind on the go with our mobile applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Validate Your Startup Idea?</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Join thousands of entrepreneurs who are using VentureMind to turn their ideas into successful businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard/validate">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white bg-black/30 hover:bg-white hover:text-blue-600 font-medium" asChild>
                    <Link href="/how-it-works">
                        How It Works
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}