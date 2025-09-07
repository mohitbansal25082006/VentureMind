"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { 
  Plus, 
  TrendingUp, 
  FileText, 
  Clock, 
  BarChart3,
  Lightbulb,
  Target,
  Users
} from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect("/")
  }

  const stats = [
    {
      title: "Total Ideas Validated",
      value: "0",
      icon: Lightbulb,
      description: "Start validating your first idea"
    },
    {
      title: "Reports Generated",
      value: "0",
      icon: FileText,
      description: "Comprehensive analysis reports"
    },
    {
      title: "Average Score",
      value: "-",
      icon: Target,
      description: "Investor readiness score"
    },
    {
      title: "Market Potential",
      value: "-",
      icon: TrendingUp,
      description: "Based on your ideas"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session.user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Ready to validate your next big idea? Let's get started.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with validating your startup ideas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start h-12" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Validate New Idea
                </Button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Reports
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest validation reports and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by validating your first startup idea to see activity here.
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium">Describe your idea</p>
                      <p className="text-xs text-muted-foreground">Tell us about your startup concept</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium">Get AI analysis</p>
                      <p className="text-xs text-muted-foreground">Receive comprehensive market research</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium">Download reports</p>
                      <p className="text-xs text-muted-foreground">Get pitch deck and business summary</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>• Be specific about your target market</p>
                  <p>• Include unique value propositions</p>
                  <p>• Mention any existing traction</p>
                  <p>• Consider regulatory requirements</p>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}