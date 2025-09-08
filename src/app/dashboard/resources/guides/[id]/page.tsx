// src/app/dashboard/resources/guides/[id]/page.tsx
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  Download, 
  Star, 
  Clock, 
  BarChart3,
  Share2,
  Bookmark,
} from 'lucide-react';
import Link from 'next/link';

interface GuidePageProps {
  params: Promise<{ id: string }>; // 👈 params is async in Next.js app router
}

export default async function GuidePage({ params }: GuidePageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }

  // ✅ Await params properly
  const { id } = await params;

  // Mock guide data - in a real app, this would come from a database
  const guide = {
    id: parseInt(id),
    title: "The Ultimate Guide to Startup Validation",
    description: "Learn how to validate your startup ideas effectively with our comprehensive guide.",
    content: `
# Introduction

Startup validation is a critical process that helps entrepreneurs determine whether their business ideas have real potential in the market. This guide will walk you through the essential steps of validating your startup idea effectively.

## What is Startup Validation?

Startup validation is the process of testing your business assumptions against real market conditions to determine if your idea has potential. It involves gathering evidence to support or refute your hypotheses about customer needs, market size, and business model viability.

## Why Validation Matters

- **Reduces Risk**: Validation helps you identify potential failures early, saving time and resources.
- **Builds Confidence**: Evidence from validation gives you and potential investors confidence in your idea.
- **Improves Product-Market Fit**: By understanding customer needs, you can build a product that truly solves their problems.

## The Validation Process

### Step 1: Problem Identification
Clearly define the problem you're solving. A well-defined problem is the foundation of a successful startup.

### Step 2: Market Research
Conduct thorough research to understand your target market, competitors, and industry trends.

### Step 3: Customer Interviews
Talk to potential customers to validate your assumptions about their needs and pain points.

### Step 4: Minimum Viable Product (MVP)
Build a simplified version of your product to test your core value proposition.

### Step 5: Measure and Learn
Collect data from your MVP and use it to refine your product and business model.

## Common Validation Mistakes to Avoid

1. **Falling in Love with Your Idea**: Be objective and willing to pivot based on evidence.
2. **Ignoring Negative Feedback**: Negative feedback is valuable data that can help you improve.
3. **Skipping Customer Research**: Don't assume you know what customers want without talking to them.
4. **Building Too Much Too Soon**: Start with an MVP to test your core assumptions before scaling.

## Conclusion

Startup validation is an iterative process that requires humility, curiosity, and a willingness to learn. By following the steps outlined in this guide, you'll be well on your way to building a successful startup.
    `,
    category: "Guides",
    readTime: "15 min",
    difficulty: "Beginner",
    rating: 4.8,
    downloads: 1242,
    featured: true,
    author: "Alex Johnson",
    publishDate: "2023-06-15",
    tags: ["Startup", "Validation", "Entrepreneurship", "MVP"]
  };

  if (!guide || isNaN(guide.id)) {
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
          <h1 className="text-3xl font-bold mt-2">{guide.title}</h1>
          <p className="text-muted-foreground mt-2">{guide.description}</p>
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
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Guide Info */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{guide.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{guide.readTime} read</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span>{guide.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <span>{guide.rating} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              <span>{guide.downloads} downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <span>By {guide.author}</span>
              <span>•</span>
              <span>{new Date(guide.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {guide.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">{tag}</Badge>
        ))}
      </div>

      {/* Guide Content */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Guide Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: guide.content.replace(/\n/g, '<br />') }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
