'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Share, 
  Loader2,
  ArrowLeft,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import type { ValidationReport } from '@/types/validation';

interface PitchDeckSlide {
  title: string;
  content: Record<string, string | string[] | number | boolean>;
}

interface PitchDeck {
  slides: PitchDeckSlide[];
}

interface PitchDeckPreviewProps {
  report: ValidationReport & { pitchDeck?: PitchDeck };
  reportId: string;
}

export function PitchDeckPreview({ report, reportId }: PitchDeckPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pitchDeck, setPitchDeck] = useState<PitchDeck | null>(report.pitchDeck || null);

  const handleGeneratePitchDeck = async () => {
    const toastId = toast.loading('Generating your pitch deck...');
    try {
      setIsGenerating(true);

      const response = await fetch('/api/pitchdeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate pitch deck');
      }

      setPitchDeck(result.pitchDeck);
      toast.dismiss(toastId);
      toast.success('Pitch deck generated successfully!');
    } catch (error) {
      console.error('Error generating pitch deck:', error);
      toast.dismiss(toastId);
      toast.error('Failed to generate pitch deck');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pitchDeck) return;
    let content = `Pitch Deck\n\n`;
    pitchDeck.slides.forEach((slide, index) => {
      content += `Slide ${index + 1}: ${slide.title}\n`;
      Object.entries(slide.content).forEach(([key, value]) => {
        content += `  ${key}: ${Array.isArray(value) ? value.join(', ') : value}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pitch-Deck.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Pitch deck downloaded!');
  };

  const handleShare = () => {
    if (!pitchDeck) return;
    const shareText = `Check out my startup pitch deck!`;

    if (navigator.share) {
      navigator.share({ title: 'Pitch Deck', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Pitch deck link copied to clipboard!');
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
            Create a structured investor pitch deck from your startup validation report
          </CardDescription>
        </CardHeader>
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Pitch Deck Yet</h3>
          <p className="text-muted-foreground mb-6">
            Generate a professional pitch deck based on your startup analysis
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

  const current = pitchDeck.slides[currentSlide];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Pitch Deck
          </CardTitle>
          <CardDescription>
            Slide {currentSlide + 1} of {pitchDeck.slides.length}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">{current.title}</h3>
          <div className="space-y-2">
            {Object.entries(current.content).map(([key, value], index) => (
              <div key={index}>
                <span className="font-medium">{key}: </span>
                {Array.isArray(value) ? value.join(', ') : String(value)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Progress 
            value={(currentSlide + 1) / pitchDeck.slides.length * 100} 
            className="w-1/2" 
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentSlide((prev) => Math.min(pitchDeck.slides.length - 1, prev + 1))}
            disabled={currentSlide === pitchDeck.slides.length - 1}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
