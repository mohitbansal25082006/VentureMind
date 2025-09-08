// src/app/dashboard/resources/videos/[id]/page.tsx (New)
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Video, 
  Star, 
  Eye, 
  Clock,
  Share2,
  Bookmark,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Award,
  MessageSquare,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Play
} from 'lucide-react';
import Link from 'next/link';

interface VideoPageProps {
  params: { id: string };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }

  // Mock video data - in a real app, this would come from a database
  const video = {
    id: parseInt(params.id),
    title: "How to Validate Your Startup Idea",
    description: "A step-by-step video guide on validating your startup idea effectively.",
    duration: "18:42",
    views: 12456,
    rating: 4.8,
    featured: true,
    author: "Emily Rodriguez",
    publishDate: "2023-08-10",
    tags: ["Startup", "Validation", "Entrepreneurship", "MVP"],
    transcript: `
[0:00] Introduction: Welcome to our comprehensive guide on startup validation.

[0:45] What is startup validation and why it matters for entrepreneurs.

[2:30] Step 1: Problem Identification - How to clearly define the problem you're solving.

[5:15] Step 2: Market Research - Techniques for understanding your target market.

[8:20] Step 3: Customer Interviews - How to conduct effective customer interviews.

[12:10] Step 4: Building an MVP - Creating a minimum viable product to test your assumptions.

[15:30] Step 5: Measuring Results - How to collect and analyze data from your MVP.

[17:20] Conclusion and next steps for your validation journey.
    `
  };

  if (!video || isNaN(video.id)) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mt-2">{video.title}</h1>
          <p className="text-muted-foreground mt-2">{video.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="aspect-video bg-black flex items-center justify-center relative">
            <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors">
              <Play className="h-10 w-10 text-white ml-1" />
            </div>
            <Badge className="absolute bottom-4 right-4 bg-black/70 text-white">
              {video.duration}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Video Info */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span>Video</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{video.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span>{video.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <span>{video.rating} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span>By {video.author}</span>
              <span>•</span>
              <span>{new Date(video.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {video.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">{tag}</Badge>
        ))}
      </div>

      {/* Video Actions */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Dislike
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Video Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {video.transcript.split('\n\n').map((paragraph, index) => (
              <div key={index} className="text-sm">
                {paragraph}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related Resources */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Related Resources</CardTitle>
          <CardDescription>Explore more resources to continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">The Ultimate Guide to Startup Validation</h4>
                <p className="text-sm text-muted-foreground mb-3">Comprehensive guide on validating startup ideas</p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Market Research Techniques</h4>
                <p className="text-sm text-muted-foreground mb-3">Learn effective market research methods</p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Startup Funding Strategies</h4>
                <p className="text-sm text-muted-foreground mb-3">Join our upcoming webinar on funding</p>
                <Button variant="outline" size="sm" className="w-full">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}