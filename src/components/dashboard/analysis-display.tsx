// src/components/dashboard/analysis-display.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart3, 
  Target, 
  AlertTriangle, 
  Users, 
  Code, 
  TrendingUp,
  Download,
  Share,
  BookOpen,
  FileText
} from 'lucide-react';
import { MarketChart } from './market-chart';
import { SWOTMatrix } from './swot-matrix';
import { RiskMatrix } from './risk-matrix';
import { CompetitorTable } from './competitor-table';
import { InvestmentScore } from './investment-score';
import { PitchDeckPreview } from './pitch-deck-preview';
import { OnePagerPreview } from './one-pager-preview';
import type { ValidationReport } from '@/types/validation';

interface AnalysisDisplayProps {
  report: ValidationReport;
  reportId: string;
  title: string;
  description: string;
  industry: string;
  targetMarket: string;
  region: string;
}

export function AnalysisDisplay({ 
  report, 
  reportId, 
  title, 
  description, 
  industry, 
  targetMarket, 
  region 
}: AnalysisDisplayProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Download report:', reportId);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share report:', reportId);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'market', label: 'Market Analysis', icon: BarChart3 },
    { id: 'competitors', label: 'Competitors', icon: Users },
    { id: 'swot', label: 'SWOT Analysis', icon: Target },
    { id: 'risks', label: 'Risk Assessment', icon: AlertTriangle },
    { id: 'tech', label: 'Tech Stack', icon: Code },
    { id: 'investment', label: 'Investment', icon: TrendingUp },
    { id: 'pitchdeck', label: 'Pitch Deck', icon: FileText },
    { id: 'onepager', label: 'One-Pager', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="mt-2 text-base">
                {description}
              </CardDescription>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">{industry}</Badge>
                <Badge variant="outline">{region.replace('-', ' ')}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2"
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    ${(Number(report.marketAnalysis.tamSize) / 1e9).toFixed(1)}B
                  </div>
                  <div className="text-sm text-muted-foreground">TAM Size</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {report.competitorAnalysis.directCompetitors.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Competitors</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
                    {report.riskAnalysis.risks.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Risks</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {report.investmentAnalysis.score}
                  </div>
                  <div className="text-sm text-muted-foreground">Investment Score</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {report.competitorAnalysis.competitiveAdvantage && (
              <Alert className="border-green-200 bg-green-50">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Competitive Advantage:</strong> {report.competitorAnalysis.competitiveAdvantage}
                </AlertDescription>
              </Alert>
            )}

            {report.competitorAnalysis.marketGap && (
              <Alert className="border-blue-200 bg-blue-50">
                <Target className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  <strong>Market Opportunity:</strong> {report.competitorAnalysis.marketGap}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Target Market */}
          <Card>
            <CardHeader>
              <CardTitle>Target Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{targetMarket}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Analysis Tab */}
        <TabsContent value="market">
          <MarketChart marketAnalysis={report.marketAnalysis} />
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors">
          <CompetitorTable competitorAnalysis={report.competitorAnalysis} />
        </TabsContent>

        {/* SWOT Analysis Tab */}
        <TabsContent value="swot">
          <SWOTMatrix swotAnalysis={report.swotAnalysis} />
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risks">
          <RiskMatrix risks={report.riskAnalysis.risks} />
        </TabsContent>

        {/* Tech Stack Tab */}
        <TabsContent value="tech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Technology Stack</CardTitle>
              <CardDescription>
                Technical recommendations based on your startup requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(report.techAnalysis.recommendedStack).map(([category, technologies]) => (
                  <div key={category}>
                    <h4 className="font-medium capitalize mb-3">{category.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600 capitalize">
                    {report.techAnalysis.complexity}
                  </div>
                  <div className="text-sm text-muted-foreground">Complexity</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">
                    {report.techAnalysis.teamSize}
                  </div>
                  <div className="text-sm text-muted-foreground">Team Size</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-600">
                    {report.techAnalysis.developmentTime}
                  </div>
                  <div className="text-sm text-muted-foreground">Development Time</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Team Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.techAnalysis.roles.map((role, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{role.role}</h4>
                      <Badge className={
                        role.priority === 'high' ? 'bg-red-100 text-red-800' :
                        role.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {role.priority} priority
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Estimates */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Estimates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {report.techAnalysis.budgetEstimate.mvp}
                  </div>
                  <div className="text-sm text-blue-600">MVP Development</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {report.techAnalysis.budgetEstimate.fullProduct}
                  </div>
                  <div className="text-sm text-green-600">Full Product</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {report.techAnalysis.budgetEstimate.monthly}
                  </div>
                  <div className="text-sm text-purple-600">Monthly Costs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Tab */}
        <TabsContent value="investment">
          <InvestmentScore investmentAnalysis={report.investmentAnalysis} />
        </TabsContent>

        {/* Pitch Deck Tab */}
        <TabsContent value="pitchdeck">
          <PitchDeckPreview report={report as any} />
        </TabsContent>

        {/* One-Pager Tab */}
        <TabsContent value="onepager">
          <OnePagerPreview report={report as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
}