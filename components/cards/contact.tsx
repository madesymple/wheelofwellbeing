"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Contact = (): JSX.Element => {
  return (
    <div className="w-full flex items-center justify-center py-16 mt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center max-w-lg space-y-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Your wheel won&apos;t balance itself.
        </h2>
        <p className="text-neutral-600 md:text-lg">
          Take the first step toward a more intentional, balanced life. The quiz
          is free and takes just 5 minutes.
        </p>
        <Link href="/quiz">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ boxShadow: "0px 4px 14.8px rgba(0, 0, 0, 0.15)" }}
            className="flex items-center justify-center w-64 h-14 rounded-xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-lg font-semibold text-white"
          >
            Take the Free Quiz
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.button>
        </Link>
        <p className="text-sm text-neutral-500">
          Free &middot; 5 minutes &middot; No sign-up required
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
