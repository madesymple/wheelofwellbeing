"use client";

import React from "react";
import { SPOKE_ORDER, SPOKE_META } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentSpokeIndex: number;
  totalSpokes?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSpokeIndex,
  totalSpokes = SPOKE_ORDER.length,
}) => {
  const currentSpoke = SPOKE_ORDER[currentSpokeIndex];
  const meta = SPOKE_META[currentSpoke];

  return (
    <div className="w-full mb-8">
      {/* Spoke label */}
      <div className="flex justify-between items-center mb-3">
        <span
          className="text-sm font-bold uppercase tracking-widest"
          style={{ color: meta?.color }}
        >
          {meta?.label}
        </span>
        <span className="text-sm text-neutral-400 font-medium">
          {currentSpokeIndex + 1} of {totalSpokes}
        </span>
      </div>

      {/* Progress segments */}
      <div className="flex gap-1.5">
        {SPOKE_ORDER.slice(0, totalSpokes).map((spoke, idx) => {
          const spokeMeta = SPOKE_META[spoke];
          const isCompleted = idx < currentSpokeIndex;
          const isCurrent = idx === currentSpokeIndex;

          return (
            <div
              key={spoke}
              className={cn(
                "h-2 flex-1 rounded-full transition-all duration-300",
                isCompleted
                  ? "opacity-100"
                  : isCurrent
                    ? "opacity-100"
                    : "bg-neutral-200"
              )}
              style={
                isCompleted || isCurrent
                  ? { backgroundColor: spokeMeta.color }
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
