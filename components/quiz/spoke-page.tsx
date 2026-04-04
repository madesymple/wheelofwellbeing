"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import QuestionCard from "./question-card";
import { SPOKE_META } from "@/lib/scoring";

interface Question {
  id: string;
  questionIndex: number;
  text: string;
}

interface SpokePageProps {
  spoke: string;
  questions: Question[];
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  direction: number; // -1 = going back, 1 = going forward
}

const SpokePage: React.FC<SpokePageProps> = ({
  spoke,
  questions,
  answers,
  onAnswer,
  direction,
}) => {
  const meta = SPOKE_META[spoke];

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={spoke}
        custom={direction}
        initial={{ opacity: 0, x: direction * 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Spoke heading */}
        <div className="text-center mb-6">
          <h2
            className="text-2xl md:text-3xl font-heading font-bold"
            style={{ color: meta?.color }}
          >
            {meta?.label}
          </h2>
        </div>

        {/* Questions card */}
        <div
          className="bg-white rounded-[24px] border border-neutral-100 p-6 md:p-8"
          style={{
            boxShadow:
              "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              questionText={q.text}
              selectedValue={answers[q.id] ?? null}
              onSelect={(value) => onAnswer(q.id, value)}
              spokeColor={meta?.color || "#2A9D8F"}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpokePage;
