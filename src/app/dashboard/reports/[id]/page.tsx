// src/app/dashboard/reports/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AnalysisDisplay } from "@/components/dashboard/analysis-display";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share } from "lucide-react";
import Link from "next/link";
import type { ValidationReport } from "@/types/validation"; // ✅ import correct type

// Props from Next.js route
interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const report = await prisma.report.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!report) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Top bar with back + actions */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/reports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Link>
        </Button>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Analysis Display */}
      <AnalysisDisplay
        report={report.analysisData as unknown as ValidationReport} // ✅ use ValidationReport
        reportId={report.id}
        title={report.title}
        description={report.description}
        industry={report.industry}
        targetMarket={report.targetMarket}
        region={report.region}
      />
    </div>
  );
}
