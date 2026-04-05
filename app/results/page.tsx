"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { SPOKE_META, SPOKE_ORDER } from "@/lib/scoring";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Heart } from "lucide-react";
import WheelChart from "@/components/results/wheel-chart";
import Paywall from "@/components/results/paywall";

interface ResultData {
  spokeScores: Record<string, number>;
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session found. Please take the quiz first.");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/quiz/results/${sessionId}`);
        if (!res.ok) throw new Error("Failed to load results");
        const data = await res.json();
        setResult(data);
      } catch {
        setError("Could not load your results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-spoke-physical font-semibold mb-2">Oops</p>
          <p className="text-neutral-500 text-sm mb-4">
            {error || "Something went wrong"}
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm"
          >
            Take the Quiz
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Find highest and lowest spokes
  const activeSpokes = SPOKE_ORDER.filter(
    (s) => result.spokeScores[s] != null
  );
  const sorted = [...activeSpokes].sort(
    (a, b) => result.spokeScores[b] - result.spokeScores[a]
  );
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Your Wheel of Wellbeing
          </h1>
        </motion.div>

        {/* Wheel Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <WheelChart spokeScores={result.spokeScores} />
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-[24px] border border-neutral-100 p-6 md:p-8 mb-8"
          style={{
            boxShadow:
              "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <p className="text-neutral-600 leading-relaxed text-center">
            Your strongest area is{" "}
            <span
              className="font-bold"
              style={{ color: SPOKE_META[highest]?.color }}
            >
              {SPOKE_META[highest]?.label}
            </span>{" "}
            ({result.spokeScores[highest]}/10). Your biggest opportunity for
            growth is{" "}
            <span
              className="font-bold"
              style={{ color: SPOKE_META[lowest]?.color }}
            >
              {SPOKE_META[lowest]?.label}
            </span>{" "}
            ({result.spokeScores[lowest]}/10).
          </p>
        </motion.div>

        {/* Spoke score cards */}
        <div className="space-y-3 mb-4">
          {activeSpokes.map((spoke, idx) => {
            const meta = SPOKE_META[spoke];
            const score = result.spokeScores[spoke];
            const percentage = (score / 10) * 100;

            return (
              <motion.div
                key={spoke}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1 + idx * 0.08 }}
                className="bg-white rounded-2xl border border-neutral-100 p-5"
                style={{
                  boxShadow:
                    "0px 2px 10px rgba(0,0,0,0.02), 0px 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="font-heading font-bold"
                    style={{ color: meta?.color }}
                  >
                    {meta?.label}
                  </span>
                  <span className="font-bold text-foreground">
                    {score}/10
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: meta?.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 1.2 + idx * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Paywall / Upsell */}
        <Paywall
          spokeScores={result.spokeScores}
          sessionId={sessionId || ""}
        />

        {/* Other Ways We Can Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <p className="text-brand font-bold text-sm uppercase tracking-widest mb-6 text-center">
            Other Ways We Can Help
          </p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <a
              href="https://www.amazon.com/Balancing-WHEEL-self-healing-wholistic-fulfillment/dp/1794141278/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-neutral-200 transition-colors"
              style={{
                boxShadow:
                  "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div className="aspect-[3/2] relative bg-warm-50">
                <Image
                  src="/assets/book-cover.jpg"
                  alt="Balancing the Wheel by Dr. Sadigh"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  Read the Book
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Go deeper into the Wheel of Wellbeing methodology with Dr.
                  Sadigh&apos;s complete guide.
                </p>
                <span className="text-sm font-semibold text-brand">
                  Get it on Amazon &rarr;
                </span>
              </div>
            </a>

            <a
              href="https://drsadigh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-neutral-200 transition-colors"
              style={{
                boxShadow:
                  "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div className="aspect-[3/2] relative bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                {/* Replace with actual photo: /assets/dr-sadigh.jpg */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-brand/20" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  Work with Dr. Sadigh
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Ready for personalized guidance? Dr. Sadigh offers therapy
                  sessions to help you strengthen your weakest areas.
                </p>
                <span className="text-sm font-semibold text-brand">
                  Learn more &rarr;
                </span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Retake link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-8 pb-8"
        >
          <Link
            href="/quiz"
            className="text-sm text-neutral-400 hover:text-brand transition-colors"
          >
            Take the quiz again
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
