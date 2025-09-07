import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Shield, 
  FileText, 
  Zap,
  BarChart3,
  Target,
  DollarSign
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI analyzes your idea from multiple angles including market fit, competition, and feasibility."
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    description: "Comprehensive TAM/SAM/SOM analysis with market size estimation and trend identification."
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboards",
    description: "Visual charts and graphs make complex data easy to understand and share with stakeholders."
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    description: "Identify and benchmark against existing solutions in your market space with detailed comparisons."
  },
  {
    icon: Shield,
    title: "SWOT & Risk Assessment",
    description: "Detailed strengths, weaknesses, opportunities, and threats analysis with risk mitigation strategies."
  },
  {
    icon: DollarSign,
    title: "Monetization Strategies",
    description: "AI suggests multiple revenue streams and business models tailored to your specific idea."
  },
  {
    icon: Target,
    title: "Investor Readiness Score",
    description: "Get scored on investment readiness with specific recommendations for improvement."
  },
  {
    icon: FileText,
    title: "Pitch Deck Generation",
    description: "Auto-generated 10-slide pitch deck and one-page business summary ready for investors."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive analysis in minutes, not weeks of traditional market research."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Validate
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our AI-powered platform provides comprehensive startup validation tools 
            that traditionally took weeks to compile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}