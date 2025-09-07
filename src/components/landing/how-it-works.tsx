import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, PenTool, Brain, FileText, Presentation } from "lucide-react"

const steps = [
  {
    icon: PenTool,
    title: "Describe Your Idea",
    description: "Enter your startup idea and answer a few clarifying questions about your target market and industry.",
    color: "text-blue-600"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes market data, competitors, and generates comprehensive insights about your idea.",
    color: "text-purple-600"
  },
  {
    icon: FileText,
    title: "Get Detailed Report",
    description: "Receive market research, SWOT analysis, competitor benchmarking, and monetization strategies.",
    color: "text-green-600"
  },
  {
    icon: Presentation,
    title: "Pitch-Ready Materials",
    description: "Download auto-generated pitch deck and business summary ready to share with investors.",
    color: "text-orange-600"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VentureMind
            </span>{" "}
            Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From idea to investor-ready pitch in just 4 simple steps. 
            Our AI handles the heavy lifting so you can focus on building.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {/* Desktop Arrows */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 w-16 -translate-y-1/2">
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="hidden lg:block absolute top-1/2 left-1/2 w-16 -translate-y-1/2">
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="hidden lg:block absolute top-1/2 left-3/4 w-16 -translate-y-1/2">
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>

          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="p-4 rounded-full bg-white shadow-md">
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </CardContent>

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}