"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { SPOKE_ORDER, SPOKE_META } from "@/lib/scoring";

interface WheelChartProps {
  spokeScores: Record<string, number>;
  size?: number;
}

const WheelChart: React.FC<WheelChartProps> = ({
  spokeScores,
  size = 380,
}) => {
  const center = size / 2;
  const maxRadius = size * 0.36;
  const labelRadius = size * 0.46;
  const numSpokes = SPOKE_ORDER.length;

  // Calculate angle for each spoke (starting from top, going clockwise)
  const getAngle = (index: number) =>
    (index * 2 * Math.PI) / numSpokes - Math.PI / 2;

  // Convert polar to cartesian
  const polarToCartesian = (angle: number, radius: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  });

  // Build the score polygon points
  const scorePoints = useMemo(() => {
    return SPOKE_ORDER.map((spoke, i) => {
      const score = spokeScores[spoke] || 0;
      const radius = (score / 10) * maxRadius;
      const angle = getAngle(i);
      return polarToCartesian(angle, radius);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spokeScores, maxRadius, center]);

  const polygonPath = scorePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  // Grid circles (2, 4, 6, 8, 10)
  const gridLevels = [2, 4, 6, 8, 10];

  // Find lowest spoke for pulse effect
  const lowestSpoke = SPOKE_ORDER.reduce((low, spoke) =>
    (spokeScores[spoke] || 0) < (spokeScores[low] || 0) ? spoke : low
  );

  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[380px] h-auto"
      >
        {/* Grid circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 10) * maxRadius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={level === 10 ? 1.5 : 0.5}
            strokeDasharray={level === 10 ? "none" : "3 3"}
          />
        ))}

        {/* Spoke lines */}
        {SPOKE_ORDER.map((spoke, i) => {
          const angle = getAngle(i);
          const end = polarToCartesian(angle, maxRadius);
          const meta = SPOKE_META[spoke];

          return (
            <line
              key={spoke}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke={meta.color}
              strokeWidth={1.5}
              strokeOpacity={0.3}
            />
          );
        })}

        {/* Animated score polygon */}
        <motion.path
          d={polygonPath}
          fill="url(#wheelGradient)"
          fillOpacity={0.25}
          stroke="url(#wheelStroke)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Score dots on each spoke */}
        {SPOKE_ORDER.map((spoke, i) => {
          const score = spokeScores[spoke] || 0;
          const radius = (score / 10) * maxRadius;
          const angle = getAngle(i);
          const point = polarToCartesian(angle, radius);
          const meta = SPOKE_META[spoke];
          const isLowest = spoke === lowestSpoke;

          return (
            <g key={`dot-${spoke}`}>
              {/* Pulse ring on lowest spoke */}
              {isLowest && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={8}
                  fill="none"
                  stroke={meta.color}
                  strokeWidth={1.5}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0.6, 0],
                    scale: [1, 2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                  style={{
                    transformOrigin: `${point.x}px ${point.y}px`,
                  }}
                />
              )}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={5}
                fill={meta.color}
                stroke="white"
                strokeWidth={2}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
              />
            </g>
          );
        })}

        {/* Spoke labels + scores */}
        {SPOKE_ORDER.map((spoke, i) => {
          const angle = getAngle(i);
          const labelPos = polarToCartesian(angle, labelRadius);
          const meta = SPOKE_META[spoke];
          const score = spokeScores[spoke] || 0;

          // Adjust text anchor based on position
          let textAnchor: "start" | "middle" | "end" = "middle";
          if (labelPos.x < center - 10) textAnchor = "end";
          else if (labelPos.x > center + 10) textAnchor = "start";

          return (
            <motion.g
              key={`label-${spoke}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.08 }}
            >
              <text
                x={labelPos.x}
                y={labelPos.y - 6}
                textAnchor={textAnchor}
                className="text-[11px] font-bold"
                fill={meta.color}
              >
                {meta.label}
              </text>
              <text
                x={labelPos.x}
                y={labelPos.y + 10}
                textAnchor={textAnchor}
                className="text-[13px] font-extrabold"
                fill="#1A1A2E"
              >
                {score}/10
              </text>
            </motion.g>
          );
        })}

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A9D8F" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#E9A23B" stopOpacity={0.1} />
          </radialGradient>
          <linearGradient
            id="wheelStroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2A9D8F" />
            <stop offset="50%" stopColor="#E9A23B" />
            <stop offset="100%" stopColor="#9575CD" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WheelChart;
