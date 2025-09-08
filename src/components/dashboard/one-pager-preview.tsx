'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Share, 
  Loader2,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import type { ValidationReport } from '@/types/validation';

interface OnePagerSection {
  title: string;
  content: string;
}

interface OnePager {
  sections: OnePagerSection[];
}

interface OnePagerPreviewProps {
  report: ValidationReport & { onePager?: OnePager };
  reportId: string;
}

export function OnePagerPreview({ report, reportId }: OnePagerPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [onePager, setOnePager] = useState<OnePager | null>(report.onePager || null);

  const handleGenerateOnePager = async () => {
    const toastId = toast.loading('Generating your one-pager...');
    try {
      setIsGenerating(true);

      const response = await fetch('/api/onepager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate one-pager');
      }

      setOnePager(result.onePager);
      toast.dismiss(toastId);
      toast.success('One-pager generated successfully!');
    } catch (error) {
      console.error('Error generating one-pager:', error);
      toast.dismiss(toastId);
      toast.error('Failed to generate one-pager');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!onePager) return;
    let content = `One-Pager Business Summary\n\n`;
    onePager.sections.forEach((section) => {
      content += `${section.title}\n${section.content}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `One-Pager-Summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('One-pager downloaded!');
  };

  const handleShare = () => {
    if (!onePager) return;
    const shareText = `Check out my business summary!`;

    if (navigator.share) {
      navigator.share({ title: 'Business Summary', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Summary link copied to clipboard!');
    }
  };

  if (!onePager) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            One-Pager Generator
          </CardTitle>
          <CardDescription>
            Create a concise one-page business summary based on your startup validation report
          </CardDescription>
        </CardHeader>
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No One-Pager Yet</h3>
          <p className="text-muted-foreground mb-6">
            Generate a concise one-page business summary based on your startup analysis
          </p>
          <Button 
            onClick={handleGenerateOnePager} 
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
                Generate One-Pager
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            One-Pager Summary
          </CardTitle>
          <CardDescription>
            A concise business summary based on your startup validation
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
        {onePager.sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
