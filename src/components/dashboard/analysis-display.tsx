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
    console.log('Download report:', reportId);
  };
  
  const handleShare = () => {
    console.log('Share report:', reportId);
  };
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen, shortLabel: 'Overview' },
    { id: 'market', label: 'Market', icon: BarChart3, shortLabel: 'Market' },
    { id: 'competitors', label: 'Competitors', icon: Users, shortLabel: 'Compete' },
    { id: 'swot', label: 'SWOT', icon: Target, shortLabel: 'SWOT' },
    { id: 'risks', label: 'Risks', icon: AlertTriangle, shortLabel: 'Risks' },
    { id: 'tech', label: 'Tech', icon: Code, shortLabel: 'Tech' },
    { id: 'investment', label: 'Investment', icon: TrendingUp, shortLabel: 'Invest' },
    { id: 'pitchdeck', label: 'Pitch', icon: FileText, shortLabel: 'Pitch' },
    { id: 'onepager', label: 'One-Pager', icon: FileText, shortLabel: '1-Pager' },
  ];

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
              <CardDescription className="mt-2 text-sm md:text-base">
                {description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="text-xs md:text-sm">{industry}</Badge>
                <Badge variant="outline" className="text-xs md:text-sm">{region.replace('-', ' ')}</Badge>
              </div>
            </div>
            <div className="flex gap-2 self-end">
              <Button variant="outline" size="sm" onClick={handleDownload} className="md:hidden">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="md:hidden">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-1 p-1 h-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex flex-col items-center justify-center h-14 md:h-10 md:flex-row gap-1 md:gap-2 px-1 md:px-3 text-xs md:text-sm"
              >
                <IconComponent className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="hidden sm:inline md:hidden lg:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Card className="col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mx-auto mb-1 md:mb-2" />
                  <div className="text-lg md:text-2xl font-bold text-blue-600">
                    ${(Number(report.marketAnalysis.tamSize) / 1e9).toFixed(1)}B
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">TAM Size</div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600 mx-auto mb-1 md:mb-2" />
                  <div className="text-lg md:text-2xl font-bold text-green-600">
                    {report.competitorAnalysis.directCompetitors.length}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Competitors</div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-orange-600 mx-auto mb-1 md:mb-2" />
                  <div className="text-lg md:text-2xl font-bold text-orange-600">
                    {report.riskAnalysis.risks.length}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Risks</div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mx-auto mb-1 md:mb-2" />
                  <div className="text-lg md:text-2xl font-bold text-purple-600">
                    {report.investmentAnalysis.score}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Investment Score</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {report.competitorAnalysis.competitiveAdvantage && (
              <Alert className="border-green-200 bg-green-50">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 text-sm md:text-base">
                  <strong>Competitive Advantage:</strong> {report.competitorAnalysis.competitiveAdvantage}
                </AlertDescription>
              </Alert>
            )}
            {report.competitorAnalysis.marketGap && (
              <Alert className="border-blue-200 bg-blue-50">
                <Target className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 text-sm md:text-base">
                  <strong>Market Opportunity:</strong> {report.competitorAnalysis.marketGap}
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          {/* Target Market */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Target Market Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <p className="text-muted-foreground text-sm md:text-base">{targetMarket}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs remain the same but with responsive padding */}
        <TabsContent value="market">
          <div className="p-1">
            <MarketChart marketAnalysis={report.marketAnalysis} />
          </div>
        </TabsContent>
        
        <TabsContent value="competitors">
          <div className="p-1">
            <CompetitorTable competitorAnalysis={report.competitorAnalysis} />
          </div>
        </TabsContent>
        
        <TabsContent value="swot">
          <div className="p-1">
            <SWOTMatrix swotAnalysis={report.swotAnalysis} />
          </div>
        </TabsContent>
        
        <TabsContent value="risks">
          <div className="p-1">
            <RiskMatrix risks={report.riskAnalysis.risks} />
          </div>
        </TabsContent>
        
        <TabsContent value="tech" className="space-y-4 md:space-y-6">
          <div className="p-1">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Recommended Technology Stack</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Technical recommendations based on your startup requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {Object.entries(report.techAnalysis.recommendedStack).map(([category, technologies]) => (
                    <div key={category}>
                      <h4 className="font-medium capitalize mb-2 md:mb-3 text-sm md:text-base">{category.replace(/([A-Z])/g, ' $1')}</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs md:text-sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-4 md:mt-6">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <Code className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mx-auto mb-1 md:mb-2" />
                    <div className="text-base md:text-lg font-bold text-blue-600 capitalize">
                      {report.techAnalysis.complexity}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">Complexity</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600 mx-auto mb-1 md:mb-2" />
                    <div className="text-base md:text-lg font-bold text-green-600">
                      {report.techAnalysis.teamSize}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">Team Size</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 md:col-span-1">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mx-auto mb-1 md:mb-2" />
                    <div className="text-base md:text-lg font-bold text-purple-600">
                      {report.techAnalysis.developmentTime}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">Development Time</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Team Recommendations */}
            <Card className="mt-4 md:mt-6">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Recommended Team Structure</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-3 md:space-y-4">
                  {report.techAnalysis.roles.map((role, index) => (
                    <div key={index} className="border rounded-lg p-3 md:p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h4 className="font-medium text-sm md:text-base">{role.role}</h4>
                        <Badge className={
                          role.priority === 'high' ? 'bg-red-100 text-red-800 text-xs' :
                          role.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 text-xs' :
                          'bg-green-100 text-green-800 text-xs'
                        }>
                          {role.priority} priority
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {role.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs md:text-sm">
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
            <Card className="mt-4 md:mt-6">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Budget Estimates</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg">
                    <div className="text-base md:text-lg font-bold text-blue-600">
                      {report.techAnalysis.budgetEstimate.mvp}
                    </div>
                    <div className="text-xs md:text-sm text-blue-600">MVP Development</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
                    <div className="text-base md:text-lg font-bold text-green-600">
                      {report.techAnalysis.budgetEstimate.fullProduct}
                    </div>
                    <div className="text-xs md:text-sm text-green-600">Full Product</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg">
                    <div className="text-base md:text-lg font-bold text-purple-600">
                      {report.techAnalysis.budgetEstimate.monthly}
                    </div>
                    <div className="text-xs md:text-sm text-purple-600">Monthly Costs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="investment">
          <div className="p-1">
            <InvestmentScore investmentAnalysis={report.investmentAnalysis} />
          </div>
        </TabsContent>
        
        <TabsContent value="pitchdeck">
          <div className="p-1">
            <PitchDeckPreview report={report} reportId={reportId} />
          </div>
        </TabsContent>
        
        <TabsContent value="onepager">
          <div className="p-1">
            <OnePagerPreview report={report} reportId={reportId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}