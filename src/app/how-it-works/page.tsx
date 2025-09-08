// src/app/how-it-works/page.tsx
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
  Settings,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Save,
  Send,
  CheckSquare,
  FileBarChart,
  UserCheck,
  Layers,
  GitBranch,
  Code,
  Server,
  Cpu,
  HardDrive
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0"></div>
        <div className="container relative z-10 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How VentureMind Works
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Validate your startup idea in minutes with our simple 4-step process powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard/validate">
                  Start Validating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">
                  View Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple 4-Step Process</h2>
            <p className="text-muted-foreground">
              Our streamlined process makes it easy to validate your startup idea quickly and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors relative z-10">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Describe Your Idea</CardTitle>
                <CardDescription>
                  Tell us about your startup concept and target market.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Basic information about your idea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Industry and target market details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Geographic focus region</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Time:</span> 2-3 minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-lg group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors relative z-10">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>
                  Our AI analyzes your idea from multiple angles.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Market size and opportunity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Competitor landscape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Risks and opportunities</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Time:</span> 30-60 seconds
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-lg group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"></div>
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors relative z-10">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Review Results</CardTitle>
                <CardDescription>
                  Explore your comprehensive validation report.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Interactive charts and visualizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Detailed analysis breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Investment readiness score</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Time:</span> 5-10 minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-lg group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-bl-full"></div>
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors relative z-10">
                  <span className="text-xl font-bold text-orange-600">4</span>
                </div>
                <CardTitle>Export & Share</CardTitle>
                <CardDescription>
                  Generate pitch decks and share your results.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Professional pitch deck</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>One-page business summary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Export to PDF or share online</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Time:</span> 1-2 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
              <Layers className="w-3 h-3 mr-1" />
              Detailed Process
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Behind the Scenes</h2>
            <p className="text-muted-foreground">
              Learn more about the technology and processes that power VentureMind.
            </p>
          </div>

          <Tabs defaultValue="idea" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="idea">Idea Input</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
              <TabsTrigger value="report">Report Generation</TabsTrigger>
              <TabsTrigger value="export">Export & Share</TabsTrigger>
            </TabsList>
            
            <TabsContent value="idea" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Step 1: Idea Input
                  </CardTitle>
                  <CardDescription>
                    Tell us about your startup idea in detail.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">What We Need</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Plus className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Startup Title</h4>
                            <p className="text-sm text-muted-foreground">A clear, concise name for your idea</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Detailed Description</h4>
                            <p className="text-sm text-muted-foreground">What problem does it solve and how?</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Target Market</h4>
                            <p className="text-sm text-muted-foreground">Who are your customers?</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Globe className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Industry & Region</h4>
                            <p className="text-sm text-muted-foreground">Where will you operate?</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Our Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Search className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Intelligent Form</h4>
                            <p className="text-sm text-muted-foreground">
                              Our smart form guides you through providing the essential information.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Filter className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Contextual Questions</h4>
                            <p className="text-sm text-muted-foreground">
                              We ask follow-up questions based on your industry and market.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Save className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Auto-Save</h4>
                            <p className="text-sm text-muted-foreground">
                              Your progress is saved automatically as you complete each section.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Step 2: AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Our advanced AI analyzes your idea from multiple perspectives.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Analysis Components</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Market Analysis</h4>
                            <p className="text-sm text-muted-foreground">TAM, SAM, SOM calculations</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Competitor Analysis</h4>
                            <p className="text-sm text-muted-foreground">Direct and indirect competitors</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Risk Assessment</h4>
                            <p className="text-sm text-muted-foreground">Potential risks and mitigation</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Investment Readiness</h4>
                            <p className="text-sm text-muted-foreground">Score and recommendations</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">AI Technology</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Cpu className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Advanced Language Models</h4>
                            <p className="text-sm text-muted-foreground">
                              Powered by state-of-the-art GPT models for deep analysis.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Database className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Market Data Integration</h4>
                            <p className="text-sm text-muted-foreground">
                              Real-time market data for accurate analysis.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Server className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Proprietary Algorithms</h4>
                            <p className="text-sm text-muted-foreground">
                              Custom algorithms for startup-specific insights.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="report" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileBarChart className="h-5 w-5" />
                    Step 3: Report Generation
                  </CardTitle>
                  <CardDescription>
                    We generate a comprehensive validation report with interactive elements.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Report Sections</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Eye className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Executive Summary</h4>
                            <p className="text-sm text-muted-foreground">Key findings and insights</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Market Analysis</h4>
                            <p className="text-sm text-muted-foreground">Interactive charts and data</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">SWOT Analysis</h4>
                            <p className="text-sm text-muted-foreground">Strengths, weaknesses, opportunities, threats</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserCheck className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Recommendations</h4>
                            <p className="text-sm text-muted-foreground">Actionable next steps</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Interactive Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <BarChart2 className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Interactive Charts</h4>
                            <p className="text-sm text-muted-foreground">
                              Explore data with dynamic visualizations.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Layers className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Tabbed Interface</h4>
                            <p className="text-sm text-muted-foreground">
                              Organized sections for easy navigation.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <GitBranch className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Linked Insights</h4>
                            <p className="text-sm text-muted-foreground">
                              Connections between different analysis areas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="export" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Step 4: Export & Share
                  </CardTitle>
                  <CardDescription>
                    Generate professional materials and share your validation results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Export Options</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Pitch Deck</h4>
                            <p className="text-sm text-muted-foreground">10-slide professional presentation</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">One-Pager</h4>
                            <p className="text-sm text-muted-foreground">Concise business summary</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <HardDrive className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Full Report</h4>
                            <p className="text-sm text-muted-foreground">Complete analysis in PDF format</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Code className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Raw Data</h4>
                            <p className="text-sm text-muted-foreground">JSON/CSV for further analysis</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Sharing Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Share2 className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Shareable Links</h4>
                            <p className="text-sm text-muted-foreground">
                              Generate secure links to share your reports.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Collaboration Tools</h4>
                            <p className="text-sm text-muted-foreground">
                              Invite team members to view and comment.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Video className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Presentation Mode</h4>
                            <p className="text-sm text-muted-foreground">
                              Full-screen presentation view for pitch decks.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
              <Code className="w-3 h-3 mr-1" />
              Technology Stack
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-muted-foreground">
              VentureMind is built with cutting-edge technologies to deliver the best possible experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced GPT models and proprietary algorithms
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Big Data Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time market data and trend analysis
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Cloud Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Scalable, secure, and high-performance cloud services
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Security & Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security and data protection
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Join thousands of entrepreneurs who are using VentureMind to validate their startup ideas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard/validate">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white bg-black/20 hover:bg-white hover:text-blue-600 font-medium" asChild>
                    <Link href="/features">
                        View Features
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