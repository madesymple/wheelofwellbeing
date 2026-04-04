"use client";

import React from "react";
import { motion } from "motion/react";
import { ClipboardList, Target, Map } from "lucide-react";

const steps = [
  {
    title: "Take the Quiz",
    description:
      "Answer 40 questions across 8 areas of your life. It takes just 5 minutes — no sign-up required.",
    icon: <ClipboardList className="h-8 w-8" />,
    number: "01",
  },
  {
    title: "See Your Wheel",
    description:
      "Get your personalized Wheel of Wellbeing — a visual map showing your strengths and growth areas at a glance.",
    icon: <Target className="h-8 w-8" />,
    number: "02",
  },
  {
    title: "Get Your Roadmap",
    description:
      "Unlock a personalized action plan with specific steps, exercises, and a 30-day priority plan designed by a licensed therapist.",
    icon: <Map className="h-8 w-8" />,
    number: "03",
  },
];

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 md:my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
          How It Works
        </p>
        <h2 className="md:text-4xl text-2xl font-heading font-bold text-foreground">
          Three steps to a more balanced life
        </h2>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-3 grid-cols-1 gap-8 px-4">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-5">
              {step.icon}
            </div>
            <span className="text-xs font-bold text-brand/50 uppercase tracking-widest mb-2">
              Step {step.number}
            </span>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">
              {step.title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
