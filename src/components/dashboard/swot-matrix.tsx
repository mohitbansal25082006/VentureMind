// src/components/dashboard/swot-matrix.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Shield
} from 'lucide-react';
import type { SWOTAnalysis } from '@/types/validation';

interface SWOTMatrixProps {
  swotAnalysis: SWOTAnalysis;
}

export function SWOTMatrix({ swotAnalysis }: SWOTMatrixProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sections = [
    {
      title: 'Strengths',
      icon: CheckCircle,
      color: 'border-green-500 bg-green-50',
      headerColor: 'text-green-700',
      data: swotAnalysis.strengths || [],
      emptyMessage: 'No strengths identified'
    },
    {
      title: 'Weaknesses', 
      icon: XCircle,
      color: 'border-red-500 bg-red-50',
      headerColor: 'text-red-700',
      data: swotAnalysis.weaknesses || [],
      emptyMessage: 'No weaknesses identified'
    },
    {
      title: 'Opportunities',
      icon: Eye,
      color: 'border-blue-500 bg-blue-50', 
      headerColor: 'text-blue-700',
      data: swotAnalysis.opportunities || [],
      emptyMessage: 'No opportunities identified'
    },
    {
      title: 'Threats',
      icon: Shield,
      color: 'border-orange-500 bg-orange-50',
      headerColor: 'text-orange-700', 
      data: swotAnalysis.threats || [],
      emptyMessage: 'No threats identified'
    }
  ];

  return (
    <div className="space-y-6">
      {/* SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          
          return (
            <Card key={index} className={`${section.color} border-2`}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center gap-2 ${section.headerColor}`}>
                  <IconComponent className="h-5 w-5" />
                  {section.title}
                  <Badge variant="secondary" className="ml-auto">
                    {section.data.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.data.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    {section.emptyMessage}
                  </p>
                ) : (
                  section.data.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white/70 p-3 rounded-lg border">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.point}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                        {(item.impact || item.severity || item.potential || item.probability) && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getImpactColor(
                              item.impact || item.severity || item.potential || item.probability || 'low'
                            )}`}
                          >
                            {item.impact || item.severity || item.potential || item.probability}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* SWOT Summary */}
      <Card>
        <CardHeader>
          <CardTitle>SWOT Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {swotAnalysis.strengths?.length || 0}
              </div>
              <div className="text-sm text-green-600">Strengths</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {swotAnalysis.weaknesses?.length || 0}
              </div>
              <div className="text-sm text-red-600">Weaknesses</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {swotAnalysis.opportunities?.length || 0}
              </div>
              <div className="text-sm text-blue-600">Opportunities</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {swotAnalysis.threats?.length || 0}
              </div>
              <div className="text-sm text-orange-600">Threats</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}