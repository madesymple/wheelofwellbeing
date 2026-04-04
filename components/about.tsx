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
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">
            About the Creator
          </p>
          <h2 className="md:text-5xl text-2xl font-heading font-bold text-foreground">
            Built on real clinical expertise
          </h2>
        </div>

        <div
          className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-[28px] border border-neutral-100 p-8 md:p-12"
          style={{
            boxShadow:
              "0px 8px 30px rgba(0,0,0,0.04), 0px 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {/* Photo placeholder */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-brand/15 to-brand/5 flex items-center justify-center flex-shrink-0 border border-brand/10">
            <Heart className="w-16 h-16 text-brand/30" />
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Dr. Sadigh
            </h3>
            <p className="text-sm text-brand font-semibold">
              Licensed Marriage & Family Therapist
            </p>
            <p className="text-neutral-600 leading-relaxed">
              The Wheel of Wellbeing was developed by Dr. Sadigh, drawing on
              years of clinical experience helping individuals and couples
              achieve greater life balance and fulfillment. This isn&apos;t pop
              psychology — it&apos;s a framework grounded in real therapeutic
              practice.
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <div className="flex items-center gap-2 text-sm text-neutral-600 bg-warm-50 px-4 py-2 rounded-full border border-neutral-100">
                <GraduationCap className="h-4 w-4 text-brand" />
                <span className="font-medium">Licensed MFT</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 bg-warm-50 px-4 py-2 rounded-full border border-neutral-100">
                <Award className="h-4 w-4 text-brand" />
                <span className="font-medium">Clinical Framework</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
