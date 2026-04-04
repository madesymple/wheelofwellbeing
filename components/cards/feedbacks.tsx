"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { testimonials } from "@/lib/data";

const Feedbacks = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 md:mt-24 mb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
          What People Are Saying
        </p>
        <h2 className="md:text-4xl text-2xl font-heading font-bold text-foreground">
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
              delay={idx * 0.1}
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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "flex flex-col gap-4 justify-between w-full rounded-2xl border border-neutral-100 p-8 bg-white shadow-sm",
        className
      )}
    >
      <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-neutral-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};
