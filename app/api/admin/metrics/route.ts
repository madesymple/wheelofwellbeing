import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SPOKE_ORDER } from "@/lib/scoring";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30");

    const since = new Date();
    since.setDate(since.getDate() - days);

    // Total counts
    const [totalAllTime, totalPeriod] = await Promise.all([
      prisma.quizSession.count({ where: { status: "completed" } }),
      prisma.quizSession.count({
        where: { status: "completed", completedAt: { gte: since } },
      }),
    ]);

    // Get all results in the period for spoke score aggregation
    const results = await prisma.quizResult.findMany({
      where: {
        session: { status: "completed", completedAt: { gte: since } },
      },
      select: { spokeScores: true, createdAt: true, session: { select: { completedAt: true } } },
    });

    // Aggregate spoke scores
    const spokeStats: Record<
      string,
      { min: number; max: number; sum: number; count: number }
    > = {};

    for (const spoke of SPOKE_ORDER) {
      spokeStats[spoke] = { min: 10, max: 0, sum: 0, count: 0 };
    }

    // Daily counts for chart
    const dailyCounts: Record<string, number> = {};

    for (const r of results) {
      const scores = r.spokeScores as Record<string, number>;
      const date = r.session?.completedAt || r.createdAt;
      const dateKey = date.toISOString().split("T")[0];
      dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;

      for (const [spoke, score] of Object.entries(scores)) {
        if (spokeStats[spoke]) {
          spokeStats[spoke].min = Math.min(spokeStats[spoke].min, score);
          spokeStats[spoke].max = Math.max(spokeStats[spoke].max, score);
          spokeStats[spoke].sum += score;
          spokeStats[spoke].count += 1;
        }
      }
    }

    // Format spoke stats
    const spokeAverages = Object.entries(spokeStats).map(
      ([spoke, stats]) => ({
        spoke,
        min: stats.count > 0 ? stats.min : 0,
        avg:
          stats.count > 0
            ? Math.round((stats.sum / stats.count) * 10) / 10
            : 0,
        max: stats.count > 0 ? stats.max : 0,
        count: stats.count,
      })
    );

    // Format daily data (fill gaps with 0)
    const dailyData: Array<{ date: string; count: number }> = [];
    const current = new Date(since);
    const today = new Date();
    while (current <= today) {
      const key = current.toISOString().split("T")[0];
      dailyData.push({ date: key, count: dailyCounts[key] || 0 });
      current.setDate(current.getDate() + 1);
    }

    return NextResponse.json({
      totalAllTime,
      totalPeriod,
      days,
      spokeAverages,
      dailyData,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
