"use client";

import React from "react";
import { motion } from "motion/react";
import { Award, GraduationCap, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 md:my-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-10">
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
            About the Creator
          </p>
          <h2 className="md:text-4xl text-2xl font-heading font-bold text-foreground">
            Built on real clinical expertise
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl border border-neutral-100 p-8 md:p-12 shadow-sm">
          {/* Photo placeholder */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-brand/10 flex items-center justify-center flex-shrink-0">
            <Heart className="w-16 h-16 text-brand/40" />
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Dr. Sadigh
            </h3>
            <p className="text-sm text-brand font-medium">
              Licensed Marriage & Family Therapist
            </p>
            <p className="text-neutral-600 leading-relaxed">
              The Wheel of Wellbeing was developed by Dr. Sadigh, drawing on
              years of clinical experience helping individuals and couples
              achieve greater life balance and fulfillment. This isn&apos;t pop
              psychology — it&apos;s a framework grounded in real therapeutic
              practice.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <GraduationCap className="h-4 w-4 text-brand" />
                <span>Licensed MFT</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Award className="h-4 w-4 text-brand" />
                <span>Clinical Framework</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
