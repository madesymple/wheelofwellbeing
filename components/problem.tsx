"use client";

import React from "react";
import { motion } from "motion/react";

const Problem = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 md:my-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center space-y-6"
      >
        <h2 className="md:text-4xl text-2xl font-heading font-bold text-foreground">
          Too many people are letting life happen to them.
        </h2>
        <p className="md:text-lg text-base text-neutral-600 leading-relaxed">
          We get caught up in the daily grind — work, obligations, routines —
          and lose sight of the big picture. We pour energy into one area while
          others quietly suffer. We feel &ldquo;off&rdquo; but can&apos;t put a
          finger on why.
        </p>
        <p className="md:text-lg text-base text-neutral-600 leading-relaxed">
          The Wheel of Wellbeing gives you clarity. In just 5 minutes,
          you&apos;ll see exactly where your life is thriving and where
          it&apos;s out of balance — so you can start making intentional changes
          that actually matter.
        </p>
      </motion.div>
    </div>
  );
};

export default Problem;
