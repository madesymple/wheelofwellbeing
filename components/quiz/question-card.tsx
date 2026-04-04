"use client";

import React from "react";
import { LIKERT_LABELS } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  spokeColor: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionText,
  selectedValue,
  onSelect,
  spokeColor,
}) => {
  return (
    <div className="py-6 border-b border-neutral-100 last:border-b-0">
      <p className="text-foreground font-medium text-sm md:text-base mb-5 leading-relaxed">
        {questionText}
      </p>

      {/* Likert scale */}
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-wider w-16 text-center shrink-0">
          Disagree
        </span>

        <div className="flex items-center gap-2 md:gap-3">
          {LIKERT_LABELS.map((label, idx) => {
            const value = idx + 1;
            const isSelected = selectedValue === value;
            const isNeutral = value === 4;

            return (
              <button
                key={value}
                onClick={() => onSelect(value)}
                title={label}
                className={cn(
                  "rounded-full border-2 transition-all duration-200 hover:scale-110",
                  isNeutral
                    ? "w-6 h-6 md:w-7 md:h-7"
                    : "w-7 h-7 md:w-9 md:h-9",
                  isSelected
                    ? "border-transparent scale-110"
                    : "border-neutral-300 hover:border-neutral-400 bg-white"
                )}
                style={
                  isSelected
                    ? {
                        backgroundColor: spokeColor,
                        borderColor: spokeColor,
                        boxShadow: `0 0 0 3px ${spokeColor}30`,
                      }
                    : undefined
                }
              />
            );
          })}
        </div>

        <span className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-wider w-16 text-center shrink-0">
          Agree
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
