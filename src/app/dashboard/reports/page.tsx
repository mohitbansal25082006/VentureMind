// src/app/dashboard/reports/page.tsx (Fixed)
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, FileText } from 'lucide-react';
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
    router.push('/dashboard/reports');
  };

  if (loading) {
    return (
      <div className="space-y-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
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
        <Button asChild>
          <Link href="/dashboard/validate">
            <Plus className="mr-2 h-4 w-4" />
            New Validation
          </Link>
        </Button>
      </div>

      {/* Search + Filters */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search reports..."
                className="pl-10"
                name="search"
                defaultValue={search}
              />
            </div>
            <Select name="industry" defaultValue={industry || undefined}>
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
            <Select name="region" defaultValue={region || undefined}>
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
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Active filters:</span>
              {search && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  Search: "{search}"
                </span>
              )}
              {industry && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                  Industry:{' '}
                  {industryOptions.find((i) => i.value === industry)?.label}
                </span>
              )}
              {region && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm">
                  Region:{' '}
                  {regionOptions.find((r) => r.value === region)?.label}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports Grid */}
      {reports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-6">
              {search || industry || region
                ? 'No reports match your search. Try a different term or clear your filters.'
                : 'Get started by validating your first startup idea.'}
            </p>
            <Button asChild>
              <Link href="/dashboard/validate">
                <Plus className="mr-2 h-4 w-4" />
                Validate Your Idea
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
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
          
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} reports
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  asChild
                >
                  <Link
                    href={{
                      pathname: '/dashboard/reports',
                      query: {
                        ...(search ? { search } : {}),
                        ...(industry ? { industry } : {}),
                        ...(region ? { region } : {}),
                        page: pageNum,
                      },
                    }}
                  >
                    {pageNum}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}