// src/app/dashboard/reports/page.tsx (Fixed)
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Target,
  Briefcase,
  Globe,
  LayoutGrid,
  RefreshCw,
  FileDown,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { ReportCard } from '@/components/dashboard/report-card';
import { industryOptions, regionOptions } from '@/lib/validation';
import { ReportData } from '@/types/validation';
import { toast } from 'sonner';

export default function ReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reports, setReports] = useState<ReportData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [industryFilter, setIndustryFilter] = useState(searchParams.get('industry') || '');
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || '');
  
  // Get search params
  const search = searchParams.get('search') || '';
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
        if (search) params.append('search', search);
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
  }, [search, industry, region, page]);
  
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
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get('search') as string;
    const industry = formData.get('industry') as string;
    const region = formData.get('region') as string;
    
    // Update URL with search params
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (industry) params.append('industry', industry);
    if (region) params.append('region', region);
    
    router.push(`/dashboard/reports?${params.toString()}`);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setIndustryFilter('');
    setRegionFilter('');
    router.push('/dashboard/reports');
  };
  
  // Calculate statistics for the reports with proper null checks
  const avgScore = reports.length > 0 
    ? Math.round(reports.reduce((sum, report) => sum + (report.investmentScore || 0), 0) / reports.length)
    : 0;
  
  const highScoreReports = reports.filter(r => (r.investmentScore || 0) >= 80).length;
  
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Reports</h1>
            <p className="text-muted-foreground mt-2">
              Browse and manage your startup validation reports
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/validate">
              <Plus className="mr-2 h-4 w-4" />
              New Validation
            </Link>
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
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
        
        {/* Search and Filters */}
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-10 bg-muted rounded mb-4"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-muted rounded flex-1"></div>
              <div className="h-10 bg-muted rounded flex-1"></div>
              <div className="h-10 bg-muted rounded w-32"></div>
            </div>
          </CardContent>
        </Card>
        
        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
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
        <div>
          <h1 className="text-3xl font-bold">Your Reports</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage your startup validation reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Button asChild>
            <Link href="/dashboard/validate">
              <Plus className="mr-2 h-4 w-4" />
              New Validation
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-3xl font-bold text-blue-600">{total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-3xl font-bold text-green-600">{avgScore}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Performers</p>
                <p className="text-3xl font-bold text-purple-600">{highScoreReports}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search + Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search reports..."
                className="pl-10"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              name="industry" 
              value={industryFilter || undefined}
              onValueChange={(value) => setIndustryFilter(value)}
            >
              <SelectTrigger className="w-full md:w-48">
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
              name="region" 
              value={regionFilter || undefined}
              onValueChange={(value) => setRegionFilter(value)}
            >
              <SelectTrigger className="w-full md:w-48">
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
            <Button type="submit" variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Active Filters */}
      {(search || industry || region) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Active filters:</span>
              {search && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Search: "{search}"
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete('search');
                      setSearchTerm('');
                      router.push(`/dashboard/reports?${params.toString()}`);
                    }}
                    className="ml-1 text-blue-800 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {industry && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  Industry: {industryOptions.find((i) => i.value === industry)?.label}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete('industry');
                      setIndustryFilter('');
                      router.push(`/dashboard/reports?${params.toString()}`);
                    }}
                    className="ml-1 text-green-800 hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {region && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  Region: {regionOptions.find((r) => r.value === region)?.label}
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete('region');
                      setRegionFilter('');
                      router.push(`/dashboard/reports?${params.toString()}`);
                    }}
                    className="ml-1 text-purple-800 hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Reports Content */}
      {reports.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {search || industry || region
                ? 'No reports match your search. Try a different term or clear your filters.'
                : 'Get started by validating your first startup idea.'}
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard/validate">
                <Plus className="mr-2 h-4 w-4" />
                Validate Your Idea
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* View Mode Toggle and Results Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} reports
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
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Industry</th>
                        <th className="text-left p-4">Region</th>
                        <th className="text-left p-4">Score</th>
                        <th className="text-left p-4">Created</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {report.description}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize">
                              {report.industry}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary" className="capitalize">
                              {report.region.replace('-', ' ')}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {report.investmentScore !== null && report.investmentScore !== undefined ? (
                              <div className={`font-medium ${
                                report.investmentScore >= 80 ? 'text-green-600' :
                                report.investmentScore >= 60 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {report.investmentScore}
                              </div>
                            ) : (
                              <div className="text-muted-foreground">N/A</div>
                            )}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleView(report.id)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDownload(report.id)}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id)}>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('page', Math.max(1, page - 1).toString());
                    router.push(`/dashboard/reports?${params.toString()}`);
                  }}
                  disabled={page === 1}
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
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
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
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('page', Math.min(totalPages, page + 1).toString());
                    router.push(`/dashboard/reports?${params.toString()}`);
                  }}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}