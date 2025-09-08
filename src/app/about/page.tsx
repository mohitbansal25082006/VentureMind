// src/app/about/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle,
  Lightbulb,
  BarChart3,
  Globe,
  Star,
  ArrowRight,
  Quote
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Mohit Bansal",
      role: "Founder & CEO",
      bio: "Serial entrepreneur with a passion for AI and startup innovation.",
      image: "/team/mohit.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "AI specialist with 10+ years in machine learning and data science.",
      image: "/team/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and market fit.",
      image: "/team/michael.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Marketing",
      bio: "Growth marketer with expertise in B2B SaaS and startups.",
      image: "/team/emily.jpg"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what&apos;s possible with AI technology.",
      icon: Lightbulb
    },
    {
      title: "Integrity",
      description: "We operate with transparency and honesty in all we do.",
      icon: CheckCircle
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every product and interaction.",
      icon: Star
    },
    {
      title: "Impact",
      description: "We measure success by the positive impact we create for entrepreneurs.",
      icon: TrendingUp
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Founded",
      description: "VentureMind was founded with a vision to democratize startup validation."
    },
    {
      year: "2023 Q3",
      title: "Beta Launch",
      description: "Launched our beta platform with 100+ early testers."
    },
    {
      year: "2024 Q1",
      title: "Public Release",
      description: "Official launch with advanced AI validation capabilities."
    },
    {
      year: "2024 Q3",
      title: "10,000 Users",
      description: "Reached a major milestone with 10,000 active users."
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanded to serve entrepreneurs in 50+ countries worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              About VentureMind
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Entrepreneurs with AI-Powered Insights
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              We&apos;re on a mission to help entrepreneurs validate their startup ideas quickly, 
              accurately, and affordably using cutting-edge artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl font-bold mb-6">
                Democratizing Startup Success
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                At VentureMind, we believe that great ideas should succeed based on their merit, 
                not on the resources of their founders. Our mission is to level the playing field 
                by providing every entrepreneur with access to the same powerful insights and 
                validation tools that were once only available to well-funded startups.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                By combining advanced AI with comprehensive market data, we help entrepreneurs 
                identify opportunities, mitigate risks, and build investor-ready businesses from day one.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Entrepreneurs Helped</div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <Brain className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-blue-800">AI-Powered Validation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl font-bold mb-6">
              The Principles That Guide Us
            </h2>
            <p className="text-gray-600 text-lg">
              Our core values shape our culture, products, and the way we serve our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Meet Our Team</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Passionate Experts Building the Future
            </h2>
            <p className="text-gray-600 text-lg">
              Our diverse team brings together expertise in AI, business, and entrepreneurship 
              to create the best possible platform for innovators worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </CardDescription>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl font-bold mb-6">
              From Idea to Impact
            </h2>
            <p className="text-gray-600 text-lg">
              Key milestones in our mission to empower entrepreneurs worldwide.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8">
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-blue-100 text-blue-800">{milestone.year}</Badge>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}