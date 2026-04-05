import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "25");
    const search = searchParams.get("search") || "";
    const sortDir = (searchParams.get("sortDir") || "desc") as
      | "asc"
      | "desc";

    const skip = (page - 1) * pageSize;

    // Build where clause
    const where = search
      ? {
          status: "completed" as const,
          user: {
            OR: [
              { email: { contains: search, mode: "insensitive" as const } },
              {
                firstName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          },
        }
      : { status: "completed" as const };

    const [sessions, total] = await Promise.all([
      prisma.quizSession.findMany({
        where,
        include: {
          user: { select: { email: true, firstName: true } },
          result: { select: { spokeScores: true } },
        },
        orderBy: { completedAt: sortDir },
        skip,
        take: pageSize,
      }),
      prisma.quizSession.count({ where }),
    ]);

    const data = sessions.map((s) => ({
      id: s.id,
      email: s.user.email,
      name: s.user.firstName || "—",
      date: s.completedAt || s.createdAt,
      spokeScores: (s.result?.spokeScores as Record<string, number>) || {},
    }));

    return NextResponse.json({
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
