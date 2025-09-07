// src/lib/validation.ts
import { z } from 'zod';

export const ideaValidationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000, 'Description must be less than 1000 characters'),
  industry: z.string().min(1, 'Industry is required'),
  targetMarket: z.string().min(5, 'Target market must be at least 5 characters'),
  region: z.string().min(1, 'Region is required'),
});

export type IdeaValidationData = z.infer<typeof ideaValidationSchema>;

export const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'entertainment', label: 'Entertainment & Media' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'energy', label: 'Energy' },
  { value: 'other', label: 'Other' },
];

export const regionOptions = [
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'middle-east-africa', label: 'Middle East & Africa' },
  { value: 'global', label: 'Global' },
];

export function formatCurrency(amount: number): string {
  if (amount >= 1e12) {
    return `$${(amount / 1e12).toFixed(1)}T`;
  } else if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  } else if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  } else if (amount >= 1e3) {
    return `$${(amount / 1e3).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Improvement';
}

export function getRiskColor(impact: string, probability: string): string {
  const impactScore = impact === 'high' ? 3 : impact === 'medium' ? 2 : 1;
  const probScore = probability === 'high' ? 3 : probability === 'medium' ? 2 : 1;
  const totalScore = impactScore * probScore;
  
  if (totalScore >= 6) return 'bg-red-100 text-red-800 border-red-200';
  if (totalScore >= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-green-100 text-green-800 border-green-200';
}