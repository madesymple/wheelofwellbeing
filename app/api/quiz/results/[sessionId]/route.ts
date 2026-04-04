import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;

    const result = await prisma.quizResult.findUnique({
      where: { sessionId },
    });

    if (!result) {
      return NextResponse.json(
        { error: "Results not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      spokeScores: result.spokeScores,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
