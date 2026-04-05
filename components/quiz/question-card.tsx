"use client";

import React from "react";
import { LIKERT_LABELS } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

// Circle sizes: largest at extremes, smallest at neutral
// 7 circles: SD, D, SwD, N, SwA, A, SA
const CIRCLE_SIZES = [
  "w-10 h-10 md:w-12 md:h-12", // 1 - Strongly Disagree (large)
  "w-9 h-9 md:w-11 md:h-11",   // 2 - Disagree
  "w-8 h-8 md:w-10 md:h-10",   // 3 - Somewhat Disagree
  "w-6 h-6 md:w-7 md:h-7",     // 4 - Neutral (smallest)
  "w-8 h-8 md:w-10 md:h-10",   // 5 - Somewhat Agree
  "w-9 h-9 md:w-11 md:h-11",   // 6 - Agree
  "w-10 h-10 md:w-12 md:h-12", // 7 - Strongly Agree (large)
];

// Colors: reddish for disagree, grey for neutral, greenish for agree
const CIRCLE_COLORS = {
  disagree: { border: "#D4918E", bg: "#E8B4B1", selected: "#C27370" },
  neutral: { border: "#C4C4C4", bg: "#D9D9D9", selected: "#A0A0A0" },
  agree: { border: "#7BB89A", bg: "#A3D4B8", selected: "#5DA07E" },
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
      <p className="text-foreground font-medium text-sm md:text-base mb-6 leading-relaxed text-center">
        {questionText}
      </p>

      {/* Likert scale */}
      <div className="flex items-center justify-center gap-1">
        <span className="text-xs font-semibold text-[#C27370] w-14 text-center shrink-0 hidden sm:block">
          Agree
        </span>

        <div className="flex items-center gap-1.5 md:gap-2.5">
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
                  "rounded-full border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center",
                  CIRCLE_SIZES[idx]
                )}
                style={{
                  borderColor: isSelected ? colors.selected : colors.border + "80",
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

        <span className="text-xs font-semibold text-[#5DA07E] w-14 text-center shrink-0 hidden sm:block">
          Disagree
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
