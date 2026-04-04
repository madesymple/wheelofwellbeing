"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { transition, variants } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const headline = "How Balanced Is Your Life?";

export const Hero = () => {
  const words = headline.split(" ");
  return (
    <motion.div className="md:h-[700px] h-[550px] p-4 relative rounded-[35px] border border-brand/20 mt-5 overflow-hidden bg-gradient-to-b from-cream to-warm-100">
      <div
        className="absolute -z-20 top-0 left-0 w-full h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(42, 157, 143, 0.12) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Floating spoke indicators */}
      <FloatingSpoke
        color="#E57373"
        label="Physical"
        className="absolute -z-10 md:top-20 md:left-20 top-6 left-4 rotate-[-8deg]"
      />
      <FloatingSpoke
        color="#64B5F6"
        label="Mental"
        className="absolute -z-10 md:top-16 md:right-32 top-6 right-4 rotate-[6deg]"
      />
      <FloatingSpoke
        color="#FFB74D"
        label="Emotional"
        className="absolute -z-10 md:bottom-40 md:left-16 bottom-32 left-2 rotate-[10deg] hidden md:block"
      />
      <FloatingSpoke
        color="#81C784"
        label="Financial"
        className="absolute -z-10 md:bottom-36 md:right-20 bottom-28 right-2 rotate-[-5deg] hidden md:block"
      />

      <motion.div className="w-full h-5/6 flex flex-col items-center justify-center">
        <motion.div
          className="md:w-[400px] w-64 md:h-10 h-9 rounded-xl bg-accent/20 flex items-center justify-center md:gap-3 gap-1 border border-accent/30"
          transition={transition}
          variants={variants}
        >
          <span className="text-lg">&#127793;</span>
          <p className="md:text-base text-[10px] font-semibold text-accent-dark">
            Discover your life balance across 8 key areas
          </p>
        </motion.div>

        <h1 className="md:text-6xl text-3xl font-heading font-bold text-center md:w-4/6 w-full mt-8 text-foreground">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <motion.span
                className="inline-block"
                transition={transition}
                variants={variants}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <motion.p
          transition={transition}
          variants={variants}
          className="md:text-lg text-sm font-medium leading-relaxed text-center tracking-tight max-w-2xl mx-auto w-[95%] mt-6 text-neutral-600"
        >
          Take our free 5-minute assessment and see your personalized Wheel of
          Wellbeing — a visual map of your strengths and growth areas across
          Physical, Mental, Emotional, Relational, Financial, Professional,
          Spiritual, and Environmental wellbeing.
        </motion.p>

        <Link href="/quiz">
          <motion.button
            transition={transition}
            variants={variants}
            style={{ boxShadow: "0px 4px 14.8px rgba(0, 0, 0, 0.15)" }}
            className="flex items-center justify-center w-64 h-14 mt-8 rounded-xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-lg font-semibold text-white transition-all hover:opacity-90"
          >
            Take the Free Quiz
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.button>
        </Link>

        <motion.p
          transition={transition}
          variants={variants}
          className="text-sm text-neutral-500 mt-3"
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
    transition={{ duration: 0.6, delay: Math.random() * 0.5 }}
    className={className}
  >
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm"
      style={{ borderColor: color }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-medium text-neutral-700">{label}</span>
    </div>
  </motion.div>
);
