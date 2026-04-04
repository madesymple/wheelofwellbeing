"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface EmailCaptureProps {
  onSubmit: (data: {
    email: string;
    firstName?: string;
    dateOfBirth: string;
    marketingOptIn: boolean;
  }) => void;
  isLoading: boolean;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const isValid = email.includes("@") && dateOfBirth;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      email,
      firstName: firstName || undefined,
      dateOfBirth,
      marketingOptIn,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Almost there!
        </h2>
        <p className="text-neutral-500 mt-2">
          Enter your details to see your personalized Wheel of Wellbeing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[24px] border border-neutral-100 p-6 md:p-8 space-y-5"
        style={{
          boxShadow:
            "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Email address <span className="text-spoke-physical">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
          />
        </div>

        {/* First name (optional) */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            First name{" "}
            <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
          />
        </div>

        {/* Date of birth */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Date of birth <span className="text-spoke-physical">*</span>
          </label>
          <input
            type="date"
            required
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
          />
        </div>

        {/* Marketing opt-in */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(e) => setMarketingOptIn(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-brand focus:ring-brand/30"
          />
          <span className="text-xs text-neutral-500 leading-relaxed">
            I&apos;d like to receive tips and insights about improving my
            wellbeing. You can unsubscribe anytime.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full h-12 rounded-xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          style={{
            boxShadow:
              "0px 4px 14px rgba(42, 157, 143, 0.4), 0px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {isLoading ? "Calculating your results..." : "See My Results"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </motion.div>
  );
};

export default EmailCapture;
