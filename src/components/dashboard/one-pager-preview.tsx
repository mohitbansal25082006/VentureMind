// src/components/dashboard/one-pager-preview.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Share, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { ReportData } from '@/types/validation';

interface OnePagerPreviewProps {
  report: ReportData;
}

// Define a type for onePager structure
type OnePager = {
  sections: { title: string; content: string }[];
};

export function OnePagerPreview({ report }: OnePagerPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Safely extract onePager from analysisData
  const initialOnePager: OnePager | null =
    (report.analysisData && (report.analysisData as any).onePager) || null;

  const [onePager, setOnePager] = useState<OnePager | null>(initialOnePager);

  const handleGenerateOnePager = async () => {
    try {
      setIsGenerating(true);
      toast.loading('Generating your one-pager...', { duration: 30000 });

      const response = await fetch('/api/onepager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: report.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate one-pager');
      }

      setOnePager(result.onePager);
      toast.success('One-pager generated successfully!');
    } catch (error) {
      console.error('Error generating one-pager:', error);
      toast.error('Failed to generate one-pager');
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                One-Pager Preview
              </CardTitle>
              <CardDescription>
                {report.title} - Concise Business Summary
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
        </CardHeader>
        <CardContent>
          <div className="bg-white border rounded-lg p-8 shadow-sm">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
                <p className="text-lg text-muted-foreground">{report.description}</p>
              </div>

              <div className="space-y-6">
                {onePager.sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                    <p className="text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
                Generated by VentureMind - AI Startup Idea Validator
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
