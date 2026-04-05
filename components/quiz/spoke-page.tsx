"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import QuestionCard from "./question-card";

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
  direction: number;
}

const SpokePage: React.FC<SpokePageProps> = ({
  spoke,
  questions,
  answers,
  onAnswer,
  direction,
}) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={spoke}
        custom={direction}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {/* Questions card — no spoke heading */}
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
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpokePage;
