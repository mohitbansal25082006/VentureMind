// src/app/dashboard/resources/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Download, 
  Video, 
  Users, 
  Star,
  Search,
  Filter,
  Clock,
  ExternalLink,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Award,
  BarChart3,
  Target,
  Briefcase,
  MessageSquare,
  Calendar,
  ChevronRight,
  Plus,
  Bookmark,
  Share2,
  Play,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default async function ResourcesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }

  // Mock data for resources
  const guides = [
    {
      id: 1,
      title: "The Ultimate Guide to Startup Validation",
      description: "Learn how to validate your startup ideas effectively with our comprehensive guide.",
      category: "Guides",
      readTime: "15 min",
      difficulty: "Beginner",
      rating: 4.8,
      downloads: 1242,
      featured: true,
      author: "Alex Johnson",
      publishDate: "2023-06-15"
    },
    {
      id: 2,
      title: "Market Research Techniques for Startups",
      description: "Discover proven market research methods to validate your target audience.",
      category: "Guides",
      readTime: "20 min",
      difficulty: "Intermediate",
      rating: 4.6,
      downloads: 876,
      featured: false,
      author: "Sarah Williams",
      publishDate: "2023-07-22"
    },
    {
      id: 3,
      title: "Creating a Winning Pitch Deck",
      description: "Step-by-step guide to crafting a compelling pitch deck that investors love.",
      category: "Guides",
      readTime: "25 min",
      difficulty: "Advanced",
      rating: 4.9,
      downloads: 2103,
      featured: true,
      author: "Michael Chen",
      publishDate: "2023-05-30"
    }
  ];

  const templates = [
    {
      id: 1,
      title: "Business Plan Template",
      description: "Comprehensive business plan template for startups and entrepreneurs.",
      category: "Templates",
      downloads: 3421,
      rating: 4.7,
      featured: true,
      fileType: "DOCX"
    },
    {
      id: 2,
      title: "Financial Projection Model",
      description: "Excel template for creating detailed financial projections for your startup.",
      category: "Templates",
      downloads: 2156,
      rating: 4.5,
      featured: false,
      fileType: "XLSX"
    },
    {
      id: 3,
      title: "Pitch Deck Template",
      description: "Professional pitch deck template designed to impress investors.",
      category: "Templates",
      downloads: 4567,
      rating: 4.9,
      featured: true,
      fileType: "PPTX"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "How to Validate Your Startup Idea",
      description: "A step-by-step video guide on validating your startup idea effectively.",
      category: "Videos",
      duration: "18:42",
      views: 12456,
      rating: 4.8,
      featured: true,
      author: "Emily Rodriguez",
      publishDate: "2023-08-10"
    },
    {
      id: 2,
      title: "Market Sizing Techniques",
      description: "Learn how to accurately estimate market size for your startup.",
      category: "Videos",
      duration: "22:15",
      views: 8765,
      rating: 4.6,
      featured: false,
      author: "David Kim",
      publishDate: "2023-07-18"
    },
    {
      id: 3,
      title: "Investor Pitching Masterclass",
      description: "Master the art of pitching to investors with this comprehensive masterclass.",
      category: "Videos",
      duration: "45:30",
      views: 15432,
      rating: 4.9,
      featured: true,
      author: "Jennifer Liu",
      publishDate: "2023-06-05"
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "Startup Funding Strategies",
      description: "Join our webinar on effective funding strategies for early-stage startups.",
      category: "Webinars",
      date: "2023-09-15",
      time: "14:00 GMT",
      registered: 1243,
      capacity: 5000,
      featured: true,
      speaker: "Robert Thompson"
    },
    {
      id: 2,
      title: "Building a Minimum Viable Product",
      description: "Learn how to build and launch an MVP that validates your business idea.",
      category: "Webinars",
      date: "2023-10-05",
      time: "16:00 GMT",
      registered: 876,
      capacity: 3000,
      featured: false,
      speaker: "Lisa Anderson"
    },
    {
      id: 3,
      title: "Scaling Your Startup",
      description: "Discover proven strategies for scaling your startup after product-market fit.",
      category: "Webinars",
      date: "2023-11-12",
      time: "15:00 GMT",
      registered: 2103,
      capacity: 4000,
      featured: true,
      speaker: "James Wilson"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Resources Hub</h1>
            <p className="text-indigo-100">
              Access our curated collection of guides, templates, videos, and webinars to accelerate your entrepreneurial journey.
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-md" asChild>
              <Link href="/dashboard/validate">
                <Target className="mr-2 h-4 w-4" />
                Validate Idea
              </Link>
            </Button>
            <Button
                variant="outline"
                className="border-white text-white bg-white/10 hover:bg-white/20"
                asChild
                >
                <Link href="/dashboard">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Resources Tabs */}
      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="webinars" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Webinars
          </TabsTrigger>
        </TabsList>

        {/* Guides Tab */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className={`shadow-md hover:shadow-lg transition-shadow ${guide.featured ? 'border-l-4 border-l-indigo-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{guide.category}</Badge>
                    {guide.featured && (
                      <Badge className="bg-amber-100 text-amber-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                  <CardDescription className="text-sm">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {guide.difficulty}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-current" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span className="text-sm">{guide.downloads}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      By {guide.author} • {new Date(guide.publishDate).toLocaleDateString()}
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/resources/guides/${guide.id}`}>
                        Read <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className={`shadow-md hover:shadow-lg transition-shadow ${template.featured ? 'border-l-4 border-l-indigo-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{template.category}</Badge>
                    {template.featured && (
                      <Badge className="bg-amber-100 text-amber-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {template.fileType}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{template.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-current" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className={`shadow-md hover:shadow-lg transition-shadow overflow-hidden ${video.featured ? 'border-l-4 border-l-indigo-500' : ''}`}>
                <div className="relative">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {video.featured && (
                    <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge className="absolute bottom-2 left-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{video.category}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                  <CardDescription className="text-sm">{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-current" />
                      <span className="text-sm font-medium">{video.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      By {video.author} • {new Date(video.publishDate).toLocaleDateString()}
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/resources/videos/${video.id}`}>
                        Watch <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Webinars Tab */}
        <TabsContent value="webinars" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className={`shadow-md hover:shadow-lg transition-shadow ${webinar.featured ? 'border-l-4 border-l-indigo-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{webinar.category}</Badge>
                    {webinar.featured && (
                      <Badge className="bg-amber-100 text-amber-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{webinar.title}</CardTitle>
                  <CardDescription className="text-sm">{webinar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(webinar.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{webinar.registered} registered</span>
                      <span>•</span>
                      <span>{webinar.capacity} capacity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Speaker: {webinar.speaker}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(webinar.registered / webinar.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <Button size="sm">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}