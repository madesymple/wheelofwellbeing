/**
 * Scoring utilities for the Wheel of Wellbeing quiz.
 *
 * Each question is scored 1-7 (Strongly Disagree → Strongly Agree).
 * Spoke score = weighted average of answers, normalized to 1-10 scale.
 * Overall score = average of all spoke scores.
 */

export interface AnswerWithWeight {
  answerValue: number; // 1-7
  weight: number; // default 1.0
}

/**
 * Calculate a single spoke's score from its answers.
 * Returns a value from 1.0 to 10.0.
 */
export function calculateSpokeScore(answers: AnswerWithWeight[]): number {
  if (answers.length === 0) return 0;

  const weightedSum = answers.reduce(
    (sum, a) => sum + a.answerValue * a.weight,
    0
  );
  const totalWeight = answers.reduce((sum, a) => sum + a.weight, 0);

  if (totalWeight === 0) return 0;

  // Raw average on 1-7 scale
  const rawAverage = weightedSum / totalWeight;

  // Normalize to 1-10 scale
  const normalized = ((rawAverage - 1) / 6) * 9 + 1;

  // Round to nearest whole number
  return Math.round(normalized);
}

/**
 * Calculate all spoke scores from a full set of answers.
 * Returns a map of spoke name → score (1-10).
 */
export function calculateAllSpokeScores(
  answers: Array<{
    spoke: string;
    answerValue: number;
    weight: number;
  }>
): Record<string, number> {
  // Group answers by spoke
  const bySpoke: Record<string, AnswerWithWeight[]> = {};
  for (const a of answers) {
    if (!bySpoke[a.spoke]) bySpoke[a.spoke] = [];
    bySpoke[a.spoke].push({ answerValue: a.answerValue, weight: a.weight });
  }

  // Calculate score for each spoke
  const scores: Record<string, number> = {};
  for (const [spoke, spokeAnswers] of Object.entries(bySpoke)) {
    scores[spoke] = calculateSpokeScore(spokeAnswers);
  }

  return scores;
}


/**
 * Likert scale labels (7-point)
 */
export const LIKERT_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neutral",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree",
] as const;

/**
 * Spoke display order and metadata.
 * Confirmed order: Physical, Mental, Emotional, Relational, Recreational, Environmental, Spiritual, Financial
 */
export const SPOKE_ORDER = [
  "physical",
  "mental",
  "emotional",
  "relational",
  "recreational",
  "environmental",
  "spiritual",
  "financial",
] as const;

export const SPOKE_META: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  physical: { label: "Physical", color: "#E57373", icon: "heart-pulse" },
  mental: { label: "Mental", color: "#64B5F6", icon: "brain" },
  emotional: { label: "Emotional", color: "#FFB74D", icon: "smile" },
  relational: { label: "Relational", color: "#F06292", icon: "users" },
  recreational: { label: "Recreational", color: "#9575CD", icon: "palette" },
  environmental: { label: "Environmental", color: "#A1887F", icon: "leaf" },
  spiritual: { label: "Spiritual", color: "#4DB6AC", icon: "sparkles" },
  financial: { label: "Financial", color: "#81C784", icon: "wallet" },
};
