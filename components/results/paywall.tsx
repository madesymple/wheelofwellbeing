"use client";

import React from "react";
import { motion } from "motion/react";
import { SPOKE_META, SPOKE_ORDER } from "@/lib/scoring";
import {
  ArrowRight,
  Check,
  Lock,
  Shield,
  Mail,
  Brain,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PaywallProps {
  spokeScores: Record<string, number>;
  sessionId: string;
}

const Paywall: React.FC<PaywallProps> = ({ spokeScores, sessionId }) => {
  // Sort spokes by score to find lowest/second lowest
  const sorted = [...SPOKE_ORDER]
    .filter((s) => spokeScores[s] != null)
    .sort((a, b) => (spokeScores[a] || 0) - (spokeScores[b] || 0));

  const lowest = sorted[0];
  const lowestMeta = SPOKE_META[lowest];

  const faq = [
    {
      q: "How is this different from the free results?",
      a: "The free results show you WHERE you are. The roadmap shows you HOW to improve, with specific steps tailored to your exact scores and life stage.",
    },
    {
      q: "Is this just generic AI advice?",
      a: "Every roadmap is generated from your specific answers using a framework developed by a licensed therapist. No two reports are the same.",
    },
    {
      q: "Can I get a refund?",
      a: "Yes, 100% money-back guarantee. If you don't find it valuable, we'll refund you. No questions asked.",
    },
    {
      q: "How long is the report?",
      a: "Your roadmap is a comprehensive personalized guide covering all 8 areas of your life with specific weekly action steps and a 30-day priority plan.",
    },
  ];

  return (
    <div className="mt-16 space-y-12">
      {/* A. Gap Call-Out */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
          You scored{" "}
          <span style={{ color: lowestMeta?.color }}>
            {spokeScores[lowest]}/10
          </span>{" "}
          in{" "}
          <span style={{ color: lowestMeta?.color }}>
            {lowestMeta?.label}
          </span>
          . You can do better.
        </h2>
        <p className="text-neutral-500 mt-4 leading-relaxed">
          Your wheel shows exactly where you&apos;re thriving and where
          there&apos;s room to grow. But knowing the score is just the first
          step — the real question is what to do about it.
        </p>
        <p className="text-neutral-600 mt-3 font-medium">
          Your personalized roadmap gives you a specific action plan for each
          area — starting this week.
        </p>
      </motion.div>

      {/* B. Blurred Report Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-[28px] border border-neutral-100 overflow-hidden"
        style={{
          boxShadow:
            "0px 8px 30px rgba(0,0,0,0.06), 0px 2px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Blurred content */}
        <div className="p-8 md:p-10 blur-[6px] select-none pointer-events-none">
          <h3 className="text-lg font-heading font-bold text-foreground mb-4">
            Deep Dive: {lowestMeta?.label} Wellbeing
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6">
            Based on your responses, your {lowestMeta?.label?.toLowerCase()}{" "}
            wellbeing is being impacted by several interconnected factors. Your
            answers suggest that you may be experiencing challenges with
            maintaining consistent habits in this area, which can create a
            cascading effect on your overall sense of balance and fulfillment.
          </p>
          <h3 className="text-lg font-heading font-bold text-foreground mb-4">
            Your 30-Day Priority Plan
          </h3>
          <div className="space-y-3">
            <div className="bg-warm-50 rounded-xl p-4">
              <p className="font-semibold text-sm">
                Week 1: Foundation Building
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Start with small, sustainable changes that build momentum...
              </p>
            </div>
            <div className="bg-warm-50 rounded-xl p-4">
              <p className="font-semibold text-sm">
                Week 2: Deepening Awareness
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Now that you have the basics in place, explore the connections
                between your...
              </p>
            </div>
            <div className="bg-warm-50 rounded-xl p-4">
              <p className="font-semibold text-sm">
                Week 3: Cross-Area Integration
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                This week focuses on how improving your{" "}
                {lowestMeta?.label?.toLowerCase()} directly impacts your...
              </p>
            </div>
          </div>
          <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-4">
            Cross-Spoke Analysis
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Understanding how each area of your wellbeing connects to the others
            is key to making lasting change. Here is how your scores interact
            and where to focus first for maximum impact...
          </p>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-lg max-w-sm">
            <Lock className="h-8 w-8 text-brand mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-foreground">
              Unlock Your Full Roadmap
            </h3>
            <p className="text-neutral-500 text-sm mt-2 mb-5">
              Get your personalized action plan with specific steps for each
              area of your life.
            </p>
            <a href={`/checkout?session=${sessionId}`}>
              <button
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-base font-bold text-white"
                style={{
                  boxShadow:
                    "0px 4px 14px rgba(42, 157, 143, 0.4), 0px 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                Get My Roadmap — $47
                <ArrowRight className="h-4 w-4" />
              </button>
            </a>
            <p className="text-xs text-neutral-400 mt-3">
              <span className="line-through">$97</span> $47 &middot; 100% money-back guarantee
            </p>
          </div>
        </div>
      </motion.div>

      {/* C. What's Inside */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[28px] border border-neutral-100 p-8 md:p-10"
        style={{
          boxShadow:
            "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <h3 className="text-xl font-heading font-bold text-foreground text-center mb-6">
          What&apos;s in your personalized roadmap
        </h3>
        <div className="space-y-4 max-w-lg mx-auto">
          {[
            `In-depth analysis of all 8 areas — why you scored the way you did`,
            `Your #1 priority area and why fixing it first creates a cascade effect`,
            `Personalized action steps — not generic tips, based on YOUR specific answers`,
            `Weekly exercises designed by a licensed therapist (Dr. Sadigh, MFT)`,
            `Cross-area insights — how each area of your life connects to the others`,
            `Your 30-day roadmap — week by week, exactly what to focus on`,
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-brand" />
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* D. Pricing Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white to-warm-50 rounded-[28px] border border-neutral-100 p-8 md:p-10 text-center"
        style={{
          boxShadow:
            "0px 8px 30px rgba(0,0,0,0.04), 0px 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="inline-block bg-accent/10 text-accent-dark text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Launch Price
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-2xl text-neutral-400 line-through">$97</span>
          <span className="text-5xl font-heading font-bold text-foreground">
            $47
          </span>
        </div>
        <p className="text-neutral-500 text-sm mb-6">
          Less than the cost of one therapy session
        </p>
        <a href={`/checkout?session=${sessionId}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 h-14 rounded-2xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-lg font-bold text-white"
            style={{
              boxShadow:
                "0px 4px 14px rgba(42, 157, 143, 0.4), 0px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Get My Personalized Roadmap
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </a>
      </motion.div>

      {/* E. Trust Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 grid-cols-1 gap-4"
      >
        {[
          {
            icon: <Shield className="h-5 w-5 text-brand" />,
            text: "100% money-back guarantee — if you don't find it valuable, we'll refund you. No questions.",
          },
          {
            icon: <Mail className="h-5 w-5 text-brand" />,
            text: "Instant access — your roadmap is ready the moment you purchase.",
          },
          {
            icon: <Brain className="h-5 w-5 text-brand" />,
            text: "Created using the Wheel of Wellbeing methodology by Dr. Sadigh, Licensed MFT.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-3 items-start bg-white rounded-2xl border border-neutral-100 p-5"
            style={{
              boxShadow:
                "0px 2px 10px rgba(0,0,0,0.02), 0px 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* F. FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[28px] border border-neutral-100 p-6 md:p-10"
        style={{
          boxShadow:
            "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-heading font-semibold text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* G. Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10"
      >
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
          Your wheel won&apos;t balance itself.
        </h2>
        <p className="text-neutral-500 mb-6">
          Get your personalized roadmap for{" "}
          <span className="line-through text-neutral-400">$97</span>{" "}
          <strong className="text-foreground">$47</strong>
        </p>
        <a href={`/checkout?session=${sessionId}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-10 h-14 rounded-2xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-lg font-bold text-white"
            style={{
              boxShadow:
                "0px 4px 14px rgba(42, 157, 143, 0.4), 0px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Get My Personalized Roadmap
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default Paywall;
