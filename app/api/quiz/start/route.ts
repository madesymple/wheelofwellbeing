import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SPOKE_ORDER } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body as { email?: string };

    // Create or find user — email is optional at quiz start
    // If no email, create a placeholder user (email captured later at completion)
    const placeholderEmail = email || `anon_${Date.now()}@placeholder.local`;

    const user = await prisma.user.upsert({
      where: { email: placeholderEmail },
      update: {},
      create: { email: placeholderEmail },
    });

    // Fetch active questions — one per variantGroup (random selection if variants exist)
    const allActiveQuestions = await prisma.quizQuestion.findMany({
      where: { active: true },
      orderBy: [{ spoke: "asc" }, { questionIndex: "asc" }],
    });

    // Group by variantGroup and pick one randomly from each group
    const byVariant: Record<string, typeof allActiveQuestions> = {};
    for (const q of allActiveQuestions) {
      const key = q.variantGroup || q.id;
      if (!byVariant[key]) byVariant[key] = [];
      byVariant[key].push(q);
    }

    const selectedQuestions = Object.values(byVariant).map((variants) => {
      const idx = Math.floor(Math.random() * variants.length);
      return variants[idx];
    });

    // Sort by spoke order then questionIndex
    const spokeOrderMap = Object.fromEntries(
      SPOKE_ORDER.map((s, i) => [s, i])
    );
    selectedQuestions.sort((a, b) => {
      const spokeA = spokeOrderMap[a.spoke] ?? 99;
      const spokeB = spokeOrderMap[b.spoke] ?? 99;
      if (spokeA !== spokeB) return spokeA - spokeB;
      return a.questionIndex - b.questionIndex;
    });

    // Create quiz session with snapshot of which questions were served
    const session = await prisma.quizSession.create({
      data: {
        userId: user.id,
        status: "in_progress",
        questionsVersion: selectedQuestions.map((q) => q.id),
      },
    });

    // Group questions by spoke for the frontend
    const grouped: Record<
      string,
      Array<{ id: string; questionIndex: number; text: string }>
    > = {};
    for (const q of selectedQuestions) {
      if (!grouped[q.spoke]) grouped[q.spoke] = [];
      grouped[q.spoke].push({
        id: q.id,
        questionIndex: q.questionIndex,
        text: q.text,
      });
    }

    return NextResponse.json({
      sessionId: session.id,
      userId: user.id,
      questions: grouped,
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    return NextResponse.json(
      { error: "Failed to start quiz" },
      { status: 500 }
    );
  }
}
