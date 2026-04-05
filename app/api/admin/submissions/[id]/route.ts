import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const session = await prisma.quizSession.findUnique({
      where: { id },
      include: {
        user: true,
        result: true,
        answers: {
          include: { question: true },
          orderBy: [
            { question: { spoke: "asc" } },
            { question: { questionIndex: "asc" } },
          ],
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: session.id,
      email: session.user.email,
      name: session.user.firstName || "—",
      dateOfBirth: session.user.dateOfBirth,
      marketingOptIn: session.user.marketingOptIn,
      date: session.completedAt || session.createdAt,
      spokeScores:
        (session.result?.spokeScores as Record<string, number>) || {},
      answers: session.answers.map((a) => ({
        spoke: a.question.spoke,
        questionIndex: a.question.questionIndex,
        questionText: a.question.text,
        answerValue: a.answerValue,
      })),
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}
