"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const headline = "How Balanced Is Your Life?";

export const Hero = () => {
  const words = headline.split(" ");
  return (
    <motion.div className="md:h-[750px] h-[620px] p-4 relative rounded-[35px] border border-brand/20 mt-5 overflow-hidden bg-gradient-to-b from-cream via-warm-100 to-warm-200">
      {/* Dot pattern background */}
      <div
        className="absolute -z-20 top-0 left-0 w-full h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(42, 157, 143, 0.1) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Decorative gradient blobs */}
      <div className="absolute -z-10 top-10 left-10 w-64 h-64 bg-spoke-physical/10 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-20 right-10 w-72 h-72 bg-spoke-mental/10 rounded-full blur-3xl" />
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      {/* Floating spoke pills — hidden on mobile to prevent overflow */}
      <FloatingSpoke
        color="#E57373"
        label="Physical"
        className="absolute md:top-20 md:left-20 top-6 left-3 rotate-[-8deg] hidden sm:block"
      />
      <FloatingSpoke
        color="#64B5F6"
        label="Mental"
        className="absolute md:top-16 md:right-32 top-6 right-3 rotate-[6deg] hidden sm:block"
      />
      <FloatingSpoke
        color="#FFB74D"
        label="Emotional"
        className="absolute md:bottom-48 md:left-16 bottom-36 left-4 rotate-[10deg] hidden md:block"
      />
      <FloatingSpoke
        color="#81C784"
        label="Financial"
        className="absolute md:bottom-44 md:right-20 bottom-32 right-4 rotate-[-5deg] hidden md:block"
      />
      <FloatingSpoke
        color="#F06292"
        label="Relational"
        className="absolute md:top-40 md:left-8 rotate-[14deg] hidden md:block"
      />
      <FloatingSpoke
        color="#9575CD"
        label="Professional"
        className="absolute md:top-36 md:right-10 rotate-[-10deg] hidden md:block"
      />
      <FloatingSpoke
        color="#4DB6AC"
        label="Spiritual"
        className="absolute md:bottom-32 md:left-40 rotate-[4deg] hidden lg:block"
      />
      <FloatingSpoke
        color="#A1887F"
        label="Environmental"
        className="absolute md:bottom-28 md:right-44 rotate-[-7deg] hidden lg:block"
      />

      <motion.div className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-[420px] w-72 md:h-10 h-9 rounded-full bg-accent/20 flex items-center justify-center md:gap-3 gap-1 border border-accent/30 shadow-sm"
        >
          <span className="text-lg">&#127793;</span>
          <p className="md:text-sm text-[10px] font-semibold text-accent-dark">
            Discover your life balance across 8 key areas
          </p>
        </motion.div>

        <h1 className="md:text-7xl text-3xl font-heading font-bold text-center md:w-3/5 w-full mt-8 text-foreground leading-tight">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="md:text-lg text-sm font-medium leading-relaxed text-center tracking-tight max-w-xl mx-auto w-[90%] mt-6 text-neutral-500"
        >
          Take our free 5-minute assessment and see your personalized Wheel —
          a visual map of your strengths and growth areas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                boxShadow:
                  "0px 4px 14px rgba(42, 157, 143, 0.4), 0px 1px 3px rgba(0,0,0,0.1)",
              }}
              className="flex items-center justify-center w-64 h-14 mt-8 rounded-2xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-lg font-bold text-white"
            >
              Take the Free Quiz
              <ArrowRight className="h-5 w-5 ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="text-sm text-neutral-400 mt-4"
        >
          Free &middot; 5 minutes &middot; No sign-up required
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const FloatingSpoke = ({
  color,
  label,
  className,
}: {
  color: string;
  label: string;
  className: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.3 + Math.random() * 0.8 }}
    className={className}
  >
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border bg-white/90 backdrop-blur-sm"
      style={{
        borderColor: color + "40",
        boxShadow: `0 4px 15px ${color}15, 0 1px 3px rgba(0,0,0,0.08)`,
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
    </div>
  </motion.div>
);
