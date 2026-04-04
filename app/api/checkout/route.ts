import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = (await req.json()) as { sessionId: string };

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    // Get the quiz session and user
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!quizSession) {
      return NextResponse.json(
        { error: "Quiz session not found" },
        { status: 404 }
      );
    }

    const baseUrl = "https://wheelofwellbeing.vercel.app";

    // Create Stripe Checkout session
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: quizSession.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wheel of Wellbeing — Personalized Roadmap",
              description:
                "Your personalized wellness roadmap with in-depth analysis, action steps, and a 30-day priority plan.",
            },
            unit_amount: 4700, // $47.00
          },
          quantity: 1,
        },
      ],
      metadata: {
        quizSessionId: sessionId,
        userId: quizSession.user.id,
      },
      success_url: `${baseUrl}/report?session=${sessionId}&success=true`,
      cancel_url: `${baseUrl}/results?session=${sessionId}`,
    });

    // Create a pending purchase record
    await prisma.purchase.create({
      data: {
        userId: quizSession.user.id,
        sessionId,
        stripeCheckoutId: checkoutSession.id,
        amountCents: 4700,
        status: "pending",
      },
    });

    return NextResponse.json({ checkoutUrl: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create checkout session", details: message },
      { status: 500 }
    );
  }
}
