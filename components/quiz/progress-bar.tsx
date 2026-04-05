"use client";

import React from "react";
import { SPOKE_ORDER } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentSpokeIndex: number;
  totalSpokes?: number;
}

const BRAND_COLOR = "#2A9D8F";

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSpokeIndex,
  totalSpokes = SPOKE_ORDER.length,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Step counter */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
          Step {currentSpokeIndex + 1} of {totalSpokes}
        </span>
      </div>

      {/* Progress bar — single color */}
      <div className="flex gap-1.5">
        {SPOKE_ORDER.slice(0, totalSpokes).map((spoke, idx) => {
          const isCompleted = idx < currentSpokeIndex;
          const isCurrent = idx === currentSpokeIndex;

          return (
            <div
              key={spoke}
              className={cn(
                "h-2 flex-1 rounded-full transition-all duration-300",
                !isCompleted && !isCurrent && "bg-neutral-200"
              )}
              style={
                isCompleted || isCurrent
                  ? { backgroundColor: BRAND_COLOR }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
