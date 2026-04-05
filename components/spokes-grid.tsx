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
  Palette,
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
  palette: <Palette className="h-7 w-7" />,
};

const SpokesGrid = () => {
  return (
    <div className="py-16 md:py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.02] to-transparent -z-10" />

      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">
            The 8 Spokes
          </p>
          <h2 className="md:text-5xl text-2xl font-heading font-bold text-foreground">
            A complete picture of your wellbeing
          </h2>
          <p className="text-neutral-500 mt-4 max-w-xl mx-auto">
            Your life balance is shaped by 8 interconnected areas. The quiz
            measures each one to reveal your unique Wheel.
          </p>
        </motion.div>

        <div className="w-full max-w-5xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4 md:gap-5">
          {spokes.map((spoke, idx) => (
            <motion.div
              key={spoke.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="flex flex-col items-center text-center p-6 md:p-8 rounded-[24px] bg-white border border-neutral-100 hover:border-neutral-200 transition-all hover:-translate-y-1"
              style={{
                boxShadow:
                  "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: spoke.color + "18",
                  color: spoke.color,
                }}
              >
                {iconMap[spoke.icon]}
              </div>
              <h3
                className="font-heading font-bold mb-1"
                style={{ color: spoke.color }}
              >
                {spoke.name}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {spoke.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpokesGrid;
