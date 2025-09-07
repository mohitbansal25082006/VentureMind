// src/components/dashboard/report-card.tsx (Fixed)
'use client';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Eye, 
  Download, 
  Trash2, 
  Calendar,
  Building2,
  Globe,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getScoreColor, getScoreLabel } from '@/lib/validation';
import { toast } from 'sonner';
import Link from 'next/link';
import type { ReportData } from '@/types/validation';

interface ReportCardProps {
  report: ReportData;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export function ReportCard({ report, onView, onDelete, onDownload }: ReportCardProps) {
  const handleView = () => {
    if (onView) {
      onView(report.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(report.id);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(report.id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{report.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {report.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <Eye className="h-4 w-4 mr-2" />
                View Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Report Metadata */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span className="capitalize">{report.industry}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span className="capitalize">{report.region.replace('-', ' ')}</span>
          </div>
        </div>
        
        {/* Investment Score */}
        {report.investmentScore && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Investment Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getScoreColor(report.investmentScore)}`}>
                {report.investmentScore}
              </span>
              <Badge className={getScoreColor(report.investmentScore)}>
                {getScoreLabel(report.investmentScore)}
              </Badge>
            </div>
          </div>
        )}
        
        {/* Date Created */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              Created {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleView}>
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}