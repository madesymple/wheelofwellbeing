import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  // If webhook secret is configured, verify signature
  // If not (during development), skip verification
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  const stripe = getStripe();
  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }
  } else {
    // No webhook secret — parse event directly (dev mode)
    event = JSON.parse(body) as Stripe.Event;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const quizSessionId = session.metadata?.quizSessionId;
    const userId = session.metadata?.userId;

    if (!quizSessionId || !userId) {
      console.error("Missing metadata in checkout session:", session.id);
      return NextResponse.json({ received: true });
    }

    try {
      // Update purchase status
      await prisma.purchase.updateMany({
        where: { stripeCheckoutId: session.id },
        data: {
          status: "completed",
          stripePaymentIntent:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
        },
      });

      console.log(
        `Payment completed for quiz session ${quizSessionId}, user ${userId}`
      );

      // TODO: Trigger AI report generation here
    } catch (err) {
      console.error("Error processing payment webhook:", err);
    }
  }

  return NextResponse.json({ received: true });
}
