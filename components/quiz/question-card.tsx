"use client";

import React from "react";
import { LIKERT_LABELS } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

// Circle sizes: largest at extremes, smallest at neutral — more variance
const CIRCLE_SIZES = [
  "w-10 h-10 md:w-16 md:h-16", // 1 - Strongly Disagree (largest)
  "w-9 h-9 md:w-14 md:h-14",   // 2 - Disagree
  "w-8 h-8 md:w-11 md:h-11",   // 3 - Somewhat Disagree
  "w-6 h-6 md:w-8 md:h-8",     // 4 - Neutral (smallest)
  "w-8 h-8 md:w-11 md:h-11",   // 5 - Somewhat Agree
  "w-9 h-9 md:w-14 md:h-14",   // 6 - Agree
  "w-10 h-10 md:w-16 md:h-16", // 7 - Strongly Agree (largest)
];

// Colors: orange for disagree, grey for neutral, green for agree
const CIRCLE_COLORS = {
  disagree: { border: "#E8A96C", selected: "#E8A96C" },
  neutral: { border: "#BFBFBF", selected: "#A0A0A0" },
  agree: { border: "#A8E6A0", selected: "#A8E6A0" },
};

function getCircleColor(value: number) {
  if (value <= 3) return CIRCLE_COLORS.disagree;
  if (value === 4) return CIRCLE_COLORS.neutral;
  return CIRCLE_COLORS.agree;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionText,
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="py-7 border-b border-neutral-100 last:border-b-0">
      <p className="text-foreground font-medium text-base md:text-lg mb-6 leading-relaxed text-center">
        {questionText}
      </p>

      {/* Likert scale */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Circles row */}
        <div className="flex items-center justify-center">
          {/* Disagree label — desktop only, beside circles */}
          <span className="text-sm font-semibold text-[#E8A96C] w-24 text-right pr-5 shrink-0 hidden md:block">
            Disagree
          </span>

          <div className="flex items-center gap-2.5 md:gap-4">
            {LIKERT_LABELS.map((label, idx) => {
              const value = idx + 1;
              const isSelected = selectedValue === value;
              const colors = getCircleColor(value);

              return (
                <button
                  key={value}
                  onClick={() => onSelect(value)}
                  title={label}
                  className={cn(
                    "rounded-full border-[2.5px] transition-all duration-200 hover:scale-110 flex items-center justify-center",
                    CIRCLE_SIZES[idx]
                  )}
                  style={{
                    borderColor: isSelected ? colors.selected : colors.border,
                    backgroundColor: isSelected ? colors.selected : "transparent",
                    boxShadow: isSelected
                      ? `0 0 0 3px ${colors.selected}25`
                      : "none",
                  }}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Agree label — desktop only, beside circles */}
          <span className="text-sm font-semibold text-[#A8E6A0] w-24 text-left pl-5 shrink-0 hidden md:block">
            Agree
          </span>
        </div>

        {/* Mobile labels — below circles */}
        <div className="flex justify-between w-full px-2 md:hidden">
          <span className="text-xs font-semibold text-[#E8A96C]">
            Disagree
          </span>
          <span className="text-xs font-semibold text-[#A8E6A0]">
            Agree
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
