// src/components/dashboard/idea-form.tsx
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
import { Loader2, Lightbulb, Target, Globe, Building } from 'lucide-react';
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
      fields: ['title', 'description'],
    },
    {
      id: 2,
      title: 'Market Details',
      description: 'Define your market and industry',
      icon: Target,
      fields: ['industry', 'targetMarket'],
    },
    {
      id: 3,
      title: 'Geographic Focus',
      description: 'Select your target region',
      icon: Globe,
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
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CurrentIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Basic Information</h3>
                <p className="text-sm text-muted-foreground">Tell us about your startup idea</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Startup Idea Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., AI-Powered Personal Finance Assistant"
                  {...register('title')}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your startup idea in detail. What problem does it solve? How does it work? What makes it unique?"
                  rows={6}
                  {...register('description')}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {watchedFields.description?.length || 0}/1000 characters
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrentIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Market Details</h3>
                <p className="text-sm text-muted-foreground">Define your market and industry</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  onValueChange={(value) => setValue('industry', value)}
                  value={watchedFields.industry}
                >
                  <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
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
                  <p className="text-sm text-red-500 mt-1">{errors.industry.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="targetMarket">Target Market *</Label>
                <Textarea
                  id="targetMarket"
                  placeholder="Describe your target customers. Who are they? What are their characteristics, needs, and pain points?"
                  rows={4}
                  {...register('targetMarket')}
                  className={errors.targetMarket ? 'border-red-500' : ''}
                />
                {errors.targetMarket && (
                  <p className="text-sm text-red-500 mt-1">{errors.targetMarket.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CurrentIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Geographic Focus</h3>
                <p className="text-sm text-muted-foreground">Select your target region</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="region">Target Region *</Label>
                <Select
                  onValueChange={(value) => setValue('region', value)}
                  value={watchedFields.region}
                >
                  <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
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
                  <p className="text-sm text-red-500 mt-1">{errors.region.message}</p>
                )}
              </div>

              {watchedFields.region && (
                <Alert>
                  <Globe className="h-4 w-4" />
                  <AlertDescription>
                    We'll analyze market opportunities and competition specific to {
                      regionOptions.find(r => r.value === watchedFields.region)?.label
                    }.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Review Your Information</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Title:</span> {watchedFields.title}</div>
                <div><span className="font-medium">Industry:</span> {
                  industryOptions.find(i => i.value === watchedFields.industry)?.label
                }</div>
                <div><span className="font-medium">Region:</span> {
                  regionOptions.find(r => r.value === watchedFields.region)?.label
                }</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Validate Your Startup Idea</CardTitle>
        <CardDescription className="text-center">
          Get comprehensive AI-powered analysis in minutes
        </CardDescription>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(getCurrentStepProgress())}% complete</span>
          </div>
          <Progress value={getCurrentStepProgress()} className="w-full" />
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderStepContent()}

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                Next Step
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate Report'
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}