// src/components/dashboard/idea-form.tsx (Enhanced)
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  Lightbulb, 
  Target, 
  Globe, 
  Building, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { ideaValidationSchema, type IdeaValidationData, industryOptions, regionOptions } from '@/lib/validation';

interface IdeaFormProps {
  onSuccess?: (reportId: string) => void;
}

export function IdeaForm({ onSuccess }: IdeaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<IdeaValidationData>({
    resolver: zodResolver(ideaValidationSchema),
    defaultValues: {
      title: '',
      description: '',
      industry: '',
      targetMarket: '',
      region: '',
    },
  });
  
  const watchedFields = watch();
  
  const steps = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Tell us about your startup idea',
      icon: Lightbulb,
      color: 'bg-blue-100 text-blue-600',
      completedColor: 'bg-blue-500 text-white',
      fields: ['title', 'description'],
    },
    {
      id: 2,
      title: 'Market Details',
      description: 'Define your market and industry',
      icon: Target,
      color: 'bg-green-100 text-green-600',
      completedColor: 'bg-green-500 text-white',
      fields: ['industry', 'targetMarket'],
    },
    {
      id: 3,
      title: 'Geographic Focus',
      description: 'Select your target region',
      icon: Globe,
      color: 'bg-purple-100 text-purple-600',
      completedColor: 'bg-purple-500 text-white',
      fields: ['region'],
    },
  ];
  
  const getCurrentStepProgress = () => {
    const currentStepData = steps[currentStep - 1];
    const completedFields = currentStepData.fields.filter(
      field => watchedFields[field as keyof IdeaValidationData]?.toString().trim()
    );
    return (completedFields.length / currentStepData.fields.length) * 100;
  };
  
  const isStepValid = async (step: number): Promise<boolean> => {
    const stepFields = steps[step - 1].fields as (keyof IdeaValidationData)[];
    const result = await trigger(stepFields);
    return result;
  };
  
  const nextStep = async () => {
    if (await isStepValid(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep) / steps.length) * 100);
      }
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 2) / steps.length) * 100);
    }
  };
  
  const onSubmit = async (data: IdeaValidationData) => {
    try {
      setIsSubmitting(true);
      setProgress(100);
      toast.loading('Analyzing your startup idea...', { 
        description: 'This may take 30-60 seconds',
        duration: 60000 
      });
      
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Validation failed');
      }
      
      toast.dismiss();
      toast.success('Analysis complete!', {
        description: 'Your startup validation report is ready.',
      });
      
      if (onSuccess) {
        onSuccess(result.reportId);
      } else {
        router.push(`/dashboard/reports/${result.reportId}`);
      }
    } catch (error) {
      console.error('Error validating idea:', error);
      toast.dismiss();
      toast.error('Validation failed', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepContent = () => {
    const CurrentIcon = steps[currentStep - 1].icon;
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${steps[0].color}`}>
                <CurrentIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl">Basic Information</h3>
              <p className="text-muted-foreground max-w-md">
                Tell us about your startup idea. What problem are you solving and how?
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Startup Idea Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., AI-Powered Personal Finance Assistant"
                  {...register('title')}
                  className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.title.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Detailed Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your startup idea in detail. What problem does it solve? How does it work? What makes it unique?"
                  rows={6}
                  {...register('description')}
                  className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.description.message}
                  </p>
                )}
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Description</span>
                  <span>{watchedFields.description?.length || 0}/1000 characters</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Pro Tip</h4>
                  <p className="text-sm text-blue-700">
                    A clear, concise title and detailed description will help our AI provide more accurate analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${steps[1].color}`}>
                <CurrentIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl">Market Details</h3>
              <p className="text-muted-foreground max-w-md">
                Define your target market and industry to help us analyze market potential.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium">
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setValue('industry', value)}
                  value={watchedFields.industry}
                >
                  <SelectTrigger className={errors.industry ? 'border-red-500 focus:border-red-500' : ''}>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {industry.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.industry.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetMarket" className="text-sm font-medium">
                  Target Market <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="targetMarket"
                  placeholder="Describe your target customers. Who are they? What are their characteristics, needs, and pain points?"
                  rows={4}
                  {...register('targetMarket')}
                  className={errors.targetMarket ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.targetMarket && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.targetMarket.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Market Insights</h4>
                  <p className="text-sm text-green-700">
                    Understanding your target market helps identify opportunities and potential challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${steps[2].color}`}>
                <CurrentIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl">Geographic Focus</h3>
              <p className="text-muted-foreground max-w-md">
                Select your target region to help us analyze regional market conditions.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="region" className="text-sm font-medium">
                  Target Region <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setValue('region', value)}
                  value={watchedFields.region}
                >
                  <SelectTrigger className={errors.region ? 'border-red-500 focus:border-red-500' : ''}>
                    <SelectValue placeholder="Select your target region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          {region.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.region.message}
                  </p>
                )}
              </div>
              
              {watchedFields.region && (
                <Alert className="border-purple-200 bg-purple-50">
                  <Globe className="h-4 w-4" />
                  <AlertDescription className="text-purple-800">
                    We'll analyze market opportunities and competition specific to {
                      regionOptions.find(r => r.value === watchedFields.region)?.label
                    }.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="bg-muted/50 p-6 rounded-xl border">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Review Your Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-xs text-muted-foreground mb-1">Title</p>
                  <p className="font-medium truncate">{watchedFields.title || 'Not provided'}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-xs text-muted-foreground mb-1">Industry</p>
                  <p className="font-medium">
                    {industryOptions.find(i => i.value === watchedFields.industry)?.label || 'Not selected'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-xs text-muted-foreground mb-1">Region</p>
                  <p className="font-medium">
                    {regionOptions.find(r => r.value === watchedFields.region)?.label || 'Not selected'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          AI-Powered Validation
        </div>
        <h1 className="text-3xl font-bold mb-2">Validate Your Startup Idea</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get comprehensive AI-powered analysis of your startup idea in minutes. Our advanced algorithms will evaluate market potential, competition, and investment readiness.
        </p>
      </div>
      
      {/* Progress Steps */}
      <Card className="mb-8 shadow-sm border-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Step {currentStep} of {steps.length}</div>
            <div className="text-sm font-medium">{Math.round(getCurrentStepProgress())}% complete</div>
          </div>
          
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index + 1 < currentStep ? step.completedColor : 
                    index + 1 === currentStep ? step.color : 
                    'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className={`text-xs font-medium text-center ${
                  index + 1 === currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Progress value={getCurrentStepProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Form Card */}
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
          <CardTitle className="text-xl text-center">
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription className="text-center">
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < steps.length ? (
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Report
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Info Box */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Our AI will analyze your idea across multiple dimensions including market size, competition, 
          risks, and investment readiness. The process typically takes 30-60 seconds.
        </p>
      </div>
    </div>
  );
}