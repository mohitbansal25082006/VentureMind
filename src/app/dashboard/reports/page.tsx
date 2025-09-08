// src/app/dashboard/reports/page.tsx (Advanced UI)
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  FileText, 
  TrendingUp,
  Target,
  Star,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BarChart3,
  Users,
  Globe,
  Zap,
  Sparkles,
  Crown,
  Award,
  Trophy,
  Lightbulb,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import { ReportCard } from '@/components/dashboard/report-card';
import { industryOptions, regionOptions } from '@/lib/validation';
import { ReportData } from '@/types/validation';
import { toast } from 'sonner';

// Create a component that uses useSearchParams
function ReportsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reports, setReports] = useState<ReportData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get search params
  const industry = searchParams.get('industry') || '';
  const region = searchParams.get('region') || '';
  const pageParam = searchParams.get('page') || '1';
  const page = Number.isNaN(parseInt(pageParam, 10)) ? 1 : parseInt(pageParam, 10);
  
  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  
  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Build query string
        const params = new URLSearchParams();
        if (industry) params.append('industry', industry);
        if (region) params.append('region', region);
        if (page) params.append('page', page.toString());
        
        const response = await fetch(`/api/reports?${params.toString()}`);
        const data = await response.json();
        
        if (response.ok) {
          setReports(data.reports);
          setTotal(data.pagination.total);
        } else {
          toast.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast.error('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [industry, region, page]);
  
  const handleView = (id: string) => {
    router.push(`/dashboard/reports/${id}`);
  };
  
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Report deleted successfully');
        // Refresh the reports list
        setReports(reports.filter(report => report.id !== id));
        setTotal(prev => prev - 1);
      } else {
        toast.error('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('Failed to delete report');
    }
  };
  
  const handleDownload = (id: string) => {
    // For now, we'll just show a toast that download is coming soon
    toast.info('PDF download functionality coming soon!');
  };
  
  const clearFilters = () => {
    router.push('/dashboard/reports');
  };
  
  // Calculate statistics for the reports with proper null checks
  const avgScore = reports.length > 0 
    ? Math.round(reports.reduce((sum, report) => sum + (report.investmentScore || 0), 0) / reports.length)
    : 0;
  
  const highScoreReports = reports.filter(r => (r.investmentScore || 0) >= 80).length;
  const mediumScoreReports = reports.filter(r => (r.investmentScore || 0) >= 60 && (r.investmentScore || 0) < 80).length;
  const lowScoreReports = reports.filter(r => (r.investmentScore || 0) < 60).length;

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Reports
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse and manage your startup validation reports
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/dashboard/validate">
              <Plus className="mr-2 h-4 w-4" />
              New Validation
            </Link>
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-16"></div>
                  </div>
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse border-0 shadow-md">
              <CardContent className="p-6">
                <div className="h-5 bg-muted rounded mb-3"></div>
                <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
                <div className="flex justify-between mb-4">
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-8 bg-muted rounded w-20"></div>
                  <div className="h-8 bg-muted rounded w-8"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Reports
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse and manage your startup validation reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="border-gray-300 hover:bg-gray-100"
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/dashboard/validate">
              <Plus className="mr-2 h-4 w-4" />
              New Validation
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-blue-800">{total}</p>
                <p className="text-xs text-blue-600 mt-1">All time validations</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Avg. Score</p>
                <p className="text-3xl font-bold text-green-800">{avgScore}</p>
                <p className="text-xs text-green-600 mt-1">Overall performance</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">High Performers</p>
                <p className="text-3xl font-bold text-purple-800">{highScoreReports}</p>
                <p className="text-xs text-purple-600 mt-1">Score ≥ 80</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 mb-1">Needs Work</p>
                <p className="text-3xl font-bold text-amber-800">{lowScoreReports}</p>
                <p className="text-xs text-amber-600 mt-1">Score &lt; 60</p>
              </div>
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Filter Reports</h3>
              <p className="text-sm text-muted-foreground">Refine your reports by industry or region</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Select 
                value={industry || undefined}
                onValueChange={(value) => {
                  const params = new URLSearchParams();
                  if (value) params.append('industry', value);
                  if (region) params.append('region', region);
                  router.push(`/dashboard/reports?${params.toString()}`);
                }}
              >
                <SelectTrigger className="w-full md:w-48 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={region || undefined}
                onValueChange={(value) => {
                  const params = new URLSearchParams();
                  if (industry) params.append('industry', industry);
                  if (value) params.append('region', value);
                  router.push(`/dashboard/reports?${params.toString()}`);
                }}
              >
                <SelectTrigger className="w-full md:w-48 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regionOptions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {(industry || region) && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-gray-300 hover:bg-gray-100"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Reports Content */}
      {reports.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100">
          <CardContent className="p-16 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No reports found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
              {industry || region
                ? 'No reports match your filters. Try different criteria or clear your filters.'
                : 'Get started by validating your first startup idea to unlock powerful insights.'}
            </p>
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/dashboard/validate">
                <Rocket className="mr-2 h-5 w-5" />
                Validate Your First Idea
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* View Mode Toggle and Results Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold">{(page - 1) * limit + 1} to {Math.min(page * limit, total)}</span> of <span className="font-semibold">{total}</span> reports
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('grid')}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          {/* Reports Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={handleView}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">Title</th>
                        <th className="text-left p-4 font-semibold">Industry</th>
                        <th className="text-left p-4 font-semibold">Region</th>
                        <th className="text-left p-4 font-semibold">Score</th>
                        <th className="text-left p-4 font-semibold">Created</th>
                        <th className="text-right p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {report.description}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize bg-blue-50 text-blue-700 border-blue-200">
                              {report.industry}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary" className="capitalize bg-gray-100 text-gray-700">
                              {report.region.replace('-', ' ')}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {report.investmentScore !== null && report.investmentScore !== undefined ? (
                              <div className="flex items-center gap-2">
                                <div className={`font-bold text-lg ${
                                  report.investmentScore >= 80 ? 'text-green-600' :
                                  report.investmentScore >= 60 ? 'text-amber-600' :
                                  'text-red-600'
                                }`}>
                                  {report.investmentScore}
                                </div>
                                {report.investmentScore >= 80 && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                            ) : (
                              <div className="text-muted-foreground">N/A</div>
                            )}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleView(report.id)}
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDownload(report.id)}
                                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDelete(report.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
              <div className="text-sm text-muted-foreground">
                Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (industry) params.append('industry', industry);
                    if (region) params.append('region', region);
                    params.set('page', Math.max(1, page - 1).toString());
                    router.push(`/dashboard/reports?${params.toString()}`);
                  }}
                  disabled={page === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? 'default' : 'outline'}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          const params = new URLSearchParams();
                          if (industry) params.append('industry', industry);
                          if (region) params.append('region', region);
                          params.set('page', pageNum.toString());
                          router.push(`/dashboard/reports?${params.toString()}`);
                        }}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (industry) params.append('industry', industry);
                    if (region) params.append('region', region);
                    params.set('page', Math.min(totalPages, page + 1).toString());
                    router.push(`/dashboard/reports?${params.toString()}`);
                  }}
                  disabled={page === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ReportsContent />
    </Suspense>
  );
}