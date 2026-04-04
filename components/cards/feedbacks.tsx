"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { testimonials } from "@/lib/data";
import { Star } from "lucide-react";

const Feedbacks = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">
          What People Are Saying
        </p>
        <h2 className="md:text-5xl text-2xl font-heading font-bold text-foreground">
          Lives changed by the Wheel
        </h2>
      </motion.div>

      <div className="w-full mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              quote={t.quote}
              name={t.name}
              role={t.role}
              delay={idx * 0.08}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;

const Card: React.FC<{
  className?: string;
  quote: string;
  name: string;
  role: string;
  delay?: number;
}> = ({ className, quote, name, role, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "flex flex-col gap-5 justify-between w-full rounded-[24px] border border-neutral-100 p-8 bg-white",
        className
      )}
      style={{
        boxShadow:
          "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-accent text-accent"
          />
        ))}
      </div>
      <p className="text-sm md:text-base text-neutral-600 leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-neutral-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/20 to-brand/10 flex items-center justify-center text-brand font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-neutral-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};
