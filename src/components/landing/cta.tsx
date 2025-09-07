"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"

const benefits = [
  "Comprehensive market analysis",
  "Competitor benchmarking",
  "Investor-ready pitch deck",
  "Risk assessment & mitigation",
  "Monetization strategies",
  "No credit card required"
]

export function CTA() {
  const { data: session } = useSession()

  return (
    <section className="py-20 sm:py-24">
      <div className="container px-4 md:px-6">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-2xl">
          <div className="absolute inset-0 bg-black/20" />
          <CardContent className="relative p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center space-y-8 text-white">
              <div className="flex items-center space-x-2 rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Start Your Journey</span>
              </div>

              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to Validate Your Next Big Idea?
                </h2>
                <p className="text-lg text-white/90 sm:text-xl">
                  Join thousands of entrepreneurs who have validated their startup ideas with VentureMind. 
                  Get started for free and turn your idea into an investor-ready opportunity.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white/90">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {session ? (
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6"
                    asChild
                  >
                    <Link href="/dashboard">
                      Access Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6"
                    onClick={() => signIn("google")}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-white/70">
                No spam, no credit card required. Start validating in under 2 minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}