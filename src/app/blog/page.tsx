// src/app/blog/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Filter,
  TrendingUp,
  BookOpen,
  Star,
  Tag,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Startup Validation: AI's Role in Reducing Failure Rates",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way entrepreneurs validate their business ideas and reduce the risk of failure.",
      author: "Mohit Bansal",
      date: "May 15, 2025",
      readTime: "8 min read",
      category: "AI & Startups",
      tags: ["AI", "Startup Validation", "Entrepreneurship"],
      featured: true,
      image: "/blog/ai-validation.jpg"
    },
    {
      id: 2,
      title: "10 Common Mistakes Entrepreneurs Make When Validating Their Ideas",
      excerpt: "A comprehensive guide to avoiding the most common pitfalls in the startup validation process and how to steer clear of them.",
      author: "Sarah Johnson",
      date: "May 8, 2025",
      readTime: "6 min read",
      category: "Entrepreneurship",
      tags: ["Mistakes", "Validation", "Tips"],
      featured: false,
      image: "/blog/mistakes.jpg"
    },
    {
      id: 3,
      title: "From Idea to Investment: Creating a Pitch That Wins",
      excerpt: "Learn how to transform your validated startup idea into a compelling pitch that attracts investors and secures funding.",
      author: "Michael Chen",
      date: "May 1, 2025",
      readTime: "10 min read",
      category: "Funding",
      tags: ["Pitch Deck", "Investment", "Funding"],
      featured: false,
      image: "/blog/pitch-deck.jpg"
    },
    {
      id: 4,
      title: "Market Sizing Techniques Every Founder Should Know",
      excerpt: "Master the art of TAM, SAM, and SOM calculations with these proven techniques and methodologies.",
      author: "Emily Rodriguez",
      date: "April 24, 2025",
      readTime: "7 min read",
      category: "Market Research",
      tags: ["Market Sizing", "TAM SAM SOM", "Research"],
      featured: false,
      image: "/blog/market-sizing.jpg"
    },
    {
      id: 5,
      title: "The Psychology of Entrepreneurship: Overcoming Fear of Failure",
      excerpt: "Understanding the mental challenges founders face and strategies to build resilience and confidence in your startup journey.",
      author: "Mohit Bansal",
      date: "April 17, 2025",
      readTime: "9 min read",
      category: "Mindset",
      tags: ["Psychology", "Mindset", "Resilience"],
      featured: false,
      image: "/blog/psychology.jpg"
    },
    {
      id: 6,
      title: "Building a Minimum Viable Product That Actually Works",
      excerpt: "A practical guide to developing an MVP that effectively tests your core assumptions without wasting resources.",
      author: "Sarah Johnson",
      date: "April 10, 2025",
      readTime: "8 min read",
      category: "Product Development",
      tags: ["MVP", "Product", "Development"],
      featured: false,
      image: "/blog/mvp.jpg"
    }
  ];

  const categories = ["All", "AI & Startups", "Entrepreneurship", "Funding", "Market Research", "Mindset", "Product Development"];
  const popularTags = ["AI", "Startup Validation", "Pitch Deck", "Market Sizing", "MVP", "Investment"];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Resources & Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Startup Insights & Entrepreneurship Tips
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Expert advice, industry trends, and practical guides to help you navigate 
              your entrepreneurial journey with confidence.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search articles..." 
                className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-blue-100 focus:bg-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Post */}
              {featuredPost && (
                <Card className="mb-12 overflow-hidden border-0 shadow-lg">
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-indigo-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-white/30" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <Badge className="mb-4 bg-blue-100 text-blue-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                      <Badge className="mb-4 ml-2 bg-indigo-100 text-indigo-800">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {featuredPost.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredPost.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Category Tabs */}
              <Tabs defaultValue="All" className="mb-8">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-sm">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(category === "All" ? regularPosts : regularPosts.filter(post => post.category === category)).map((post) => (
                        <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                          <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-blue-400" />
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold mb-3 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                {post.author}
                              </div>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-auto">
                                Read <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-8">
              {/* Newsletter */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Subscribe to Our Newsletter</CardTitle>
                  <CardDescription>
                    Get the latest insights and updates delivered to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Your email address" />
                  <Button className="w-full">Subscribe</Button>
                  <p className="text-xs text-gray-500">
                    Join 10,000+ subscribers getting weekly insights.
                  </p>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Popular Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
