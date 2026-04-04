"use client";

import React from "react";
import { motion } from "motion/react";
import { spokes } from "@/lib/data";
import {
  HeartPulse,
  Brain,
  Smile,
  Users,
  Wallet,
  Briefcase,
  Sparkles,
  Leaf,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "heart-pulse": <HeartPulse className="h-7 w-7" />,
  brain: <Brain className="h-7 w-7" />,
  smile: <Smile className="h-7 w-7" />,
  users: <Users className="h-7 w-7" />,
  wallet: <Wallet className="h-7 w-7" />,
  briefcase: <Briefcase className="h-7 w-7" />,
  sparkles: <Sparkles className="h-7 w-7" />,
  leaf: <Leaf className="h-7 w-7" />,
};

const SpokesGrid = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 md:my-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
          The 8 Spokes
        </p>
        <h2 className="md:text-4xl text-2xl font-heading font-bold text-foreground">
          A complete picture of your wellbeing
        </h2>
        <p className="text-neutral-600 mt-3 max-w-xl mx-auto">
          Your life balance is shaped by 8 interconnected areas. The quiz
          measures each one to reveal your unique Wheel.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {spokes.map((spoke, idx) => (
          <motion.div
            key={spoke.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: spoke.color + "1A",
                color: spoke.color,
              }}
            >
              {iconMap[spoke.icon]}
            </div>
            <h3 className="font-heading font-bold text-foreground mb-1">
              {spoke.name}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              {spoke.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpokesGrid;
