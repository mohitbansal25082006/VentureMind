// src/app/api/reports/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          industry: true,
          targetMarket: true,
          region: true,
          investmentScore: true,
          createdAt: true,
          updatedAt: true,
          // ✅ Added missing fields
          tamSize: true,
          samSize: true,
          somSize: true,
        },
      }),
      prisma.report.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    return NextResponse.json({
      reports: reports.map(report => ({
        ...report,
        tamSize: report.tamSize?.toString(),
        samSize: report.samSize?.toString(),
        somSize: report.somSize?.toString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}
