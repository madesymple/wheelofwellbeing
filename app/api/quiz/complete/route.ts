import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateAllSpokeScores } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email, firstName, dateOfBirth, marketingOptIn } =
      (await req.json()) as {
        sessionId: string;
        email: string;
        firstName?: string;
        dateOfBirth?: string;
        marketingOptIn?: boolean;
      };

    if (!sessionId || !email) {
      return NextResponse.json(
        { error: "sessionId and email are required" },
        { status: 400 }
      );
    }

    // Get the session
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Check if user with this email already exists (different from anon placeholder)
    const isPlaceholder = session.user.email.endsWith("@placeholder.local");
    let userId = session.user.id;

    if (isPlaceholder) {
      // Check if a real user with this email exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Reassign session to existing user
        userId = existingUser.id;
        await prisma.quizSession.update({
          where: { id: sessionId },
          data: { userId: existingUser.id },
        });
        // Update existing user's info
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            firstName: firstName || existingUser.firstName,
            dateOfBirth: dateOfBirth
              ? new Date(dateOfBirth)
              : existingUser.dateOfBirth,
            marketingOptIn: marketingOptIn ?? existingUser.marketingOptIn,
          },
        });
        // Delete the placeholder user
        await prisma.user.delete({ where: { id: session.user.id } });
      } else {
        // Convert placeholder to real user
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            email,
            firstName: firstName || null,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            marketingOptIn: marketingOptIn ?? false,
          },
        });
      }
    } else {
      // Update user info if they provided new data
      await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName || session.user.firstName,
          dateOfBirth: dateOfBirth
            ? new Date(dateOfBirth)
            : session.user.dateOfBirth,
          marketingOptIn: marketingOptIn ?? session.user.marketingOptIn,
        },
      });
    }

    // Fetch all answers for this session with question weights
    const answers = await prisma.quizAnswer.findMany({
      where: { sessionId },
      include: { question: true },
    });

    if (answers.length === 0) {
      return NextResponse.json(
        { error: "No answers found for this session" },
        { status: 400 }
      );
    }

    // Calculate scores
    const spokeScores = calculateAllSpokeScores(
      answers.map((a) => ({
        spoke: a.question.spoke,
        answerValue: a.answerValue,
        weight: Number(a.question.weight),
      }))
    );

    // Save results (upsert in case of resubmission)
    const result = await prisma.quizResult.upsert({
      where: { sessionId },
      update: { spokeScores, overallScore: 0 },
      create: { sessionId, spokeScores, overallScore: 0 },
    });

    // Mark session as completed
    await prisma.quizSession.update({
      where: { id: sessionId },
      data: { status: "completed", completedAt: new Date() },
    });

    return NextResponse.json({
      resultId: result.id,
      sessionId,
      spokeScores,
    });
  } catch (error) {
    console.error("Error completing quiz:", error);
    return NextResponse.json(
      { error: "Failed to complete quiz" },
      { status: 500 }
    );
  }
}
