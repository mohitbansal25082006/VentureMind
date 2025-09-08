// src/app/careers/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Users,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  Building,
  Coffee,
  Wifi,
  Bus,
  Laptop,
  Star,
  Send,
  Car
} from "lucide-react";

export default function CareersPage() {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "5+ years",
      salary: "$160,000 - $200,000",
      description: "We&apos;re looking for an experienced ML Engineer to help build and scale our AI-powered validation models.",
      responsibilities: [
        "Design and implement machine learning models for startup validation",
        "Optimize algorithms for performance and accuracy",
        "Collaborate with product team to define requirements",
        "Mentor junior engineers on best practices"
      ],
      requirements: [
        "5+ years of experience in machine learning",
        "Strong Python skills and familiarity with ML frameworks",
        "Experience with NLP and predictive modeling",
        "PhD in relevant field or equivalent experience"
      ],
      niceToHave: [
        "Experience with startup ecosystem",
        "Published research in relevant fields",
        "Experience with cloud platforms (AWS, GCP, Azure)"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$120,000 - $150,000",
      description: "Join our design team to create intuitive and beautiful experiences for entrepreneurs worldwide.",
      responsibilities: [
        "Design user interfaces and experiences for web and mobile",
        "Conduct user research and usability testing",
        "Collaborate with product managers and engineers",
        "Maintain and evolve our design system"
      ],
      requirements: [
        "3+ years of product design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Strong portfolio showcasing product design work",
        "Experience with user research methodologies"
      ],
      niceToHave: [
        "Experience designing data visualizations",
        "Familiarity with startup or B2B SaaS products",
        "Basic HTML/CSS knowledge"
      ],
      featured: false
    },
    {
      id: 3,
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      experience: "4+ years",
      salary: "$130,000 - $160,000",
      description: "Lead our growth marketing initiatives to reach and acquire entrepreneurs worldwide.",
      responsibilities: [
        "Develop and execute multi-channel marketing campaigns",
        "Analyze campaign performance and optimize for ROI",
        "Manage content marketing and SEO strategies",
        "Collaborate with sales team on lead generation"
      ],
      requirements: [
        "4+ years of growth marketing experience",
        "Proven track record of scaling user acquisition",
        "Experience with marketing analytics tools",
        "Strong analytical and problem-solving skills"
      ],
      niceToHave: [
        "Experience in B2B SaaS marketing",
        "Familiarity with startup ecosystem",
        "Experience managing a team"
      ],
      featured: false
    },
    {
      id: 4,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$130,000 - $160,000",
      description: "Build and maintain our web application used by thousands of entrepreneurs.",
      responsibilities: [
        "Develop new features and improvements to our platform",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable, and well-tested code",
        "Participate in code reviews and architectural decisions"
      ],
      requirements: [
        "3+ years of full stack development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with relational databases",
        "Familiarity with cloud platforms and deployment"
      ],
      niceToHave: [
        "Experience with Next.js",
        "Knowledge of AI/ML concepts",
        "Experience with Docker and Kubernetes"
      ],
      featured: false
    }
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description: "We offer top-tier compensation packages that recognize your skills and experience.",
      icon: DollarSign
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance for you and your family.",
      icon: Heart
    },
    {
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and work-from-anywhere options.",
      icon: Laptop
    },
    {
      title: "Unlimited PTO",
      description: "Take the time you need to recharge and pursue your passions.",
      icon: Clock
    },
    {
      title: "Equity",
      description: "Own a piece of the company and share in our success.",
      icon: Award
    },
    {
      title: "Learning Budget",
      description: "Annual stipend for courses, conferences, and professional development.",
      icon: Briefcase
    }
  ];

  const perks = [
    {
      title: "Modern Office",
      description: "Beautiful workspace in the heart of the city with panoramic views.",
      icon: Building
    },
    {
      title: "Free Meals",
      description: "Daily catered lunches and fully stocked kitchen with snacks and beverages.",
      icon: Coffee
    },
    {
      title: "Transportation",
      description: "Commuter benefits and convenient public transportation access.",
      icon: Bus
    },
    {
      title: "Parking",
      description: "Free parking available for all employees.",
      icon: Car
    },
    {
      title: "Wellness",
      description: "On-site gym, yoga classes, and meditation sessions.",
      icon: Heart
    },
    {
      title: "Events",
      description: "Regular team outings, hackathons, and company-wide celebrations.",
      icon: Users
    }
  ];

  const departments = ["All", "Engineering", "Design", "Marketing", "Sales", "Operations"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build the Future of Entrepreneurship
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              We&apos;re looking for passionate individuals who want to make a difference 
              in the lives of entrepreneurs worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="culture" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Culture</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Why You&apos;ll Love Working Here
            </h2>
            <p className="text-gray-600 text-lg">
              We&apos;ve built a culture that values innovation, collaboration, and personal growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Perks & Benefits</Badge>
            <h2 className="text-3xl font-bold mb-6">
              More Than Just a Job
            </h2>
            <p className="text-gray-600 text-lg">
              We believe in taking care of our team so they can focus on doing their best work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <perk.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{perk.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-gray-600">
                    {perk.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Open Positions</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Join Our Team
            </h2>
            <p className="text-gray-600 text-lg">
              We&apos;re always looking for talented individuals to join our mission.
            </p>
          </div>
          
          <Tabs defaultValue="All" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {departments.map((department) => (
                <TabsTrigger key={department} value={department} className="text-sm">
                  {department}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {departments.map((department) => (
              <TabsContent key={department} value={department} className="mt-6">
                <div className="space-y-6">
                  {(department === "All" ? jobOpenings : jobOpenings.filter(job => job.department === department)).map((job) => (
                    <Card key={job.id} className={`border-0 shadow-md overflow-hidden ${job.featured ? 'ring-2 ring-blue-500' : ''}`}>
                      {job.featured && (
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 text-sm font-medium">
                          <Star className="inline-block h-4 w-4 mr-1" />
                          Featured Position
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-blue-600">
                              {job.salary}
                            </div>
                            <Button size="sm">
                              Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-6">
                          {job.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">What You&apos;ll Do</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">What You&apos;ll Need</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {requirement}
                                </li>
                              ))}
                            </ul>
                            
                            {job.niceToHave.length > 0 && (
                              <>
                                <h4 className="font-semibold mt-4 mb-3">Nice to Have</h4>
                                <ul className="space-y-2">
                                  {job.niceToHave.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold mb-4">Don&apos;t see your perfect role?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We&apos;re always looking for talented individuals. Send us your resume and 
              let us know how you can contribute to our mission.
            </p>
            <Button variant="outline" size="lg">
              Send Open Application <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}