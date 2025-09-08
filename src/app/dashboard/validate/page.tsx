// src/app/dashboard/validate/page.tsx (New)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { IdeaForm } from '@/components/dashboard/idea-form';

export default async function ValidatePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
    <div></div>
    <div></div>
      <IdeaForm />
    </div>
  );
}