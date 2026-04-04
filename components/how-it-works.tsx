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
    color: "#2A9D8F",
  },
  {
    title: "See Your Wheel",
    description:
      "Get your personalized Wheel of Wellbeing — a visual map showing your strengths and growth areas at a glance.",
    icon: <Target className="h-8 w-8" />,
    number: "02",
    color: "#E9A23B",
  },
  {
    title: "Get Your Roadmap",
    description:
      "Unlock a personalized action plan with specific steps, exercises, and a 30-day priority plan designed by a licensed therapist.",
    icon: <Map className="h-8 w-8" />,
    number: "03",
    color: "#9575CD",
  },
];

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 md:my-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">
          How It Works
        </p>
        <h2 className="md:text-5xl text-2xl font-heading font-bold text-foreground">
          Three steps to a more balanced life
        </h2>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-3 grid-cols-1 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="flex flex-col items-center text-center p-10 rounded-[28px] bg-white border border-neutral-100 relative overflow-hidden"
            style={{
              boxShadow:
                "0px 4px 20px rgba(0,0,0,0.04), 0px 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px]"
              style={{ backgroundColor: step.color }}
            />
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: step.color + "15",
                color: step.color,
              }}
            >
              {step.icon}
            </div>
            <span
              className="text-xs font-extrabold uppercase tracking-widest mb-2"
              style={{ color: step.color + "80" }}
            >
              Step {step.number}
            </span>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">
              {step.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
