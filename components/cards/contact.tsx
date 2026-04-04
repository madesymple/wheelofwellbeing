"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Contact = (): JSX.Element => {
  return (
    <div className="w-full flex items-center justify-center py-20 mt-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center max-w-2xl text-center p-12 md:p-16 rounded-[35px] bg-gradient-to-b from-white to-warm-50 border border-neutral-100 relative overflow-hidden"
        style={{
          boxShadow:
            "0px 8px 30px rgba(0,0,0,0.04), 0px 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight relative z-10">
          Your wheel won&apos;t balance itself.
        </h2>
        <p className="text-neutral-500 md:text-lg mt-5 relative z-10">
          Take the first step toward a more intentional, balanced life. The quiz
          is free and takes just 5 minutes.
        </p>
        <Link href="/quiz" className="relative z-10">
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
        <p className="text-sm text-neutral-400 mt-4 relative z-10">
          Free &middot; 5 minutes &middot; No sign-up required
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
