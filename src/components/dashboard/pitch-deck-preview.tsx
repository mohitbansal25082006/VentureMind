// src/components/dashboard/pitch-deck-preview.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Share, 
  Eye, 
  Loader2,
  ArrowLeft,
  ArrowRight,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import type { ReportData } from '@/types/validation';

interface PitchDeckPreviewProps {
  report: ReportData;
}

interface PitchDeckSlide {
  title: string;
  content: Record<string, string | string[]>;
}

interface PitchDeck {
  slides: PitchDeckSlide[];
}

export function PitchDeckPreview({ report }: PitchDeckPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pitchDeck, setPitchDeck] = useState<PitchDeck | null>(
    (report.analysisData as any)?.pitchDeck || null
  );

  const handleGeneratePitchDeck = async () => {
    try {
      setIsGenerating(true);
      toast.loading('Generating your pitch deck...', { duration: 30000 });
      
      const response = await fetch('/api/pitchdeck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId: report.id }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate pitch deck');
      }
      
      setPitchDeck(result.pitchDeck);
      toast.success('Pitch deck generated successfully!');
    } catch (error) {
      console.error('Error generating pitch deck:', error);
      toast.error('Failed to generate pitch deck');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    // TODO: Implement PDF download
    toast.info('PDF download coming soon!');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    toast.info('Share functionality coming soon!');
  };

  const nextSlide = () => {
    if (pitchDeck && currentSlide < pitchDeck.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (!pitchDeck) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Pitch Deck Generator
          </CardTitle>
          <CardDescription>
            Create a professional pitch deck based on your startup validation report
          </CardDescription>
        </CardHeader>
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Pitch Deck Yet</h3>
          <p className="text-muted-foreground mb-6">
            Generate a professional 10-slide pitch deck based on your startup analysis
          </p>
          <Button 
            onClick={handleGeneratePitchDeck} 
            disabled={isGenerating}
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Generate Pitch Deck
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const slide = pitchDeck.slides[currentSlide];
  const progress = ((currentSlide + 1) / pitchDeck.slides.length) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pitch Deck Preview
              </CardTitle>
              <CardDescription>
                {report.title} - {currentSlide + 1} of {pitchDeck.slides.length} slides
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Slide {currentSlide + 1} of {pitchDeck.slides.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white border rounded-lg p-8 min-h-[500px] shadow-sm">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{slide.title}</h2>
              
              <div className="space-y-4">
                {Object.entries(slide.content).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="text-lg font-semibold capitalize mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    {Array.isArray(value) ? (
                      <ul className="space-y-2 pl-5">
                        {value.map((item, idx) => (
                          <li key={idx} className="list-disc">{item as string}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">{value as string}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button 
              onClick={nextSlide}
              disabled={currentSlide === pitchDeck.slides.length - 1}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Slide Thumbnails */}
      <Card>
        <CardHeader>
          <CardTitle>Slide Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pitchDeck.slides.map((slide: PitchDeckSlide, index: number) => (
              <div 
                key={index}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  currentSlide === index 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="text-sm font-medium truncate">{slide.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Slide {index + 1}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}