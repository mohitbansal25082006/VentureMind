// src/components/dashboard/competitor-table.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import type { CompetitorAnalysis } from '@/types/validation';

interface CompetitorTableProps {
  competitorAnalysis: CompetitorAnalysis;
}

export function CompetitorTable({ competitorAnalysis }: CompetitorTableProps) {
  const [expandedCompetitor, setExpandedCompetitor] = useState<string | null>(null);

  const toggleExpanded = (competitorName: string) => {
    setExpandedCompetitor(
      expandedCompetitor === competitorName ? null : competitorName
    );
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';  
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const allCompetitors = [
    ...competitorAnalysis.directCompetitors.map(comp => ({ ...comp, type: 'direct' })),
    ...competitorAnalysis.indirectCompetitors.map(comp => ({ ...comp, type: 'indirect', strengths: [], weaknesses: [] }))
  ];

  return (
    <div className="space-y-6">
      {/* Competitive Landscape Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Direct Competitors</p>
                <p className="text-2xl font-bold text-blue-600">
                  {competitorAnalysis.directCompetitors.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Indirect Competitors</p>
                <p className="text-2xl font-bold text-purple-600">
                  {competitorAnalysis.indirectCompetitors.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Advantage */}
      {competitorAnalysis.competitiveAdvantage && (
        <Alert className="border-green-200 bg-green-50">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            <strong>Competitive Advantage:</strong> {competitorAnalysis.competitiveAdvantage}
          </AlertDescription>
        </Alert>
      )}

      {/* Market Gap */}
      {competitorAnalysis.marketGap && (
        <Alert className="border-blue-200 bg-blue-50">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Market Gap:</strong> {competitorAnalysis.marketGap}
          </AlertDescription>
        </Alert>
      )}

      {/* Competitor Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Competitor Analysis</CardTitle>
          <CardDescription>
            Comprehensive breakdown of your competitive landscape
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Market Share</TableHead>
                  <TableHead>Funding</TableHead>
                  <TableHead>Threat Level</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCompetitors.map((competitor, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{competitor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {competitor.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={competitor.type === 'direct' ? 'default' : 'secondary'}>
                        {competitor.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {'marketShare' in competitor && competitor.marketShare ? (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {competitor.marketShare}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {'funding' in competitor && competitor.funding ? (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          {competitor.funding}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {'threat' in competitor ? (
                        <Badge className={getThreatColor(competitor.threat)}>
                          {competitor.threat}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {competitor.type === 'direct' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(competitor.name)}
                        >
                          {expandedCompetitor === competitor.name ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Competitor Details */}
      {expandedCompetitor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {expandedCompetitor} - Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const competitor = competitorAnalysis.directCompetitors.find(
                comp => comp.name === expandedCompetitor
              );
              
              if (!competitor) return null;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div>
                    <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Strengths ({competitor.strengths.length})
                    </h4>
                    {competitor.strengths.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic">
                        No strengths identified
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm bg-green-50 p-2 rounded border border-green-200">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" />
                      Weaknesses ({competitor.weaknesses.length})
                    </h4>
                    {competitor.weaknesses.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic">
                        No weaknesses identified
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm bg-red-50 p-2 rounded border border-red-200">
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}