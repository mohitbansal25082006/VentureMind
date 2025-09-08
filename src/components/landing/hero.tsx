"use client"

import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react"

export function Hero() {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-24">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="flex items-center space-x-2 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">AI-Powered Validation</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Validate Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Startup Ideas
              </span>{" "}
              with AI
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Get instant AI-powered analysis, market research, and investor-ready reports for your startup ideas. 
              Skip weeks of research and validate faster than ever.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {session ? (
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => signIn("google")}
              >
                Start Validating Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">5 Min</span>
              </div>
              <span className="text-sm text-muted-foreground">Average Analysis Time</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">95%</span>
              </div>
              <span className="text-sm text-muted-foreground">Accuracy Rate</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold">Free</span>
              </div>
              <span className="text-sm text-muted-foreground">To Get Started</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}