import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, questionId, answerValue } = (await req.json()) as {
      sessionId: string;
      questionId: string;
      answerValue: number;
    };

    if (!sessionId || !questionId || !answerValue) {
      return NextResponse.json(
        { error: "sessionId, questionId, and answerValue are required" },
        { status: 400 }
      );
    }

    if (answerValue < 1 || answerValue > 7) {
      return NextResponse.json(
        { error: "answerValue must be between 1 and 7" },
        { status: 400 }
      );
    }

    // Upsert answer — allows user to change answer by going back
    await prisma.quizAnswer.upsert({
      where: {
        sessionId_questionId: {
          sessionId,
          questionId,
        },
      },
      update: { answerValue },
      create: {
        sessionId,
        questionId,
        answerValue,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving answer:", error);
    return NextResponse.json(
      { error: "Failed to save answer" },
      { status: 500 }
    );
  }
}
