"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import ProgressBar from "@/components/quiz/progress-bar";
import SpokePage from "@/components/quiz/spoke-page";
import EmailCapture from "@/components/quiz/email-capture";
import { SPOKE_ORDER } from "@/lib/scoring";
import { ArrowLeft, ArrowRight } from "lucide-react";

// GA4 event helper
function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
}

interface Question {
  id: string;
  questionIndex: number;
  text: string;
}

type QuestionsBySpoke = Record<string, Question[]>;

type QuizPhase = "loading" | "quiz" | "email" | "submitting";

const SESSION_KEY = "wow_quiz_session";

function saveToSession(data: {
  sessionId: string;
  userId: string;
  answers: Record<string, number>;
  currentSpokeIndex: number;
}) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

function loadFromSession(): {
  sessionId: string;
  userId: string;
  answers: Record<string, number>;
  currentSpokeIndex: number;
} | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<QuizPhase>("loading");
  const [sessionId, setSessionId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionsBySpoke>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentSpokeIndex, setCurrentSpokeIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Active spokes (only spokes that have questions)
  const activeSpokes = SPOKE_ORDER.filter(
    (s) => questions[s] && questions[s].length > 0
  );

  const currentSpoke = activeSpokes[currentSpokeIndex];
  const currentQuestions = currentSpoke ? questions[currentSpoke] || [] : [];

  // Check if all questions in current spoke are answered
  const allCurrentAnswered =
    currentQuestions.length > 0 &&
    currentQuestions.every((q) => answers[q.id] != null);

  const isLastSpoke = currentSpokeIndex === activeSpokes.length - 1;

  // Start quiz session
  const startQuiz = useCallback(async () => {
    try {
      const res = await fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start quiz");

      setSessionId(data.sessionId);
      setUserId(data.userId);
      setQuestions(data.questions);
      setPhase("quiz");
      trackEvent("quiz_start");

      saveToSession({
        sessionId: data.sessionId,
        userId: data.userId,
        answers: {},
        currentSpokeIndex: 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start quiz");
    }
  }, []);

  // Initialize
  useEffect(() => {
    const saved = loadFromSession();
    if (saved && saved.sessionId) {
      // Resume from session — but we need to re-fetch questions
      setSessionId(saved.sessionId);
      setUserId(saved.userId);
      setAnswers(saved.answers);
      setCurrentSpokeIndex(saved.currentSpokeIndex);
      // Still need to fetch questions since they aren't in sessionStorage
      fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((r) => r.json())
        .then(() => {
          // For simplicity, just start a new session
          startQuiz();
        })
        .catch(() => startQuiz());
    } else {
      startQuiz();
    }
  }, [startQuiz]);

  // Save answer to API and local state
  const handleAnswer = async (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    saveToSession({
      sessionId,
      userId,
      answers: newAnswers,
      currentSpokeIndex,
    });

    // Fire and forget — save to DB in background
    fetch("/api/quiz/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, questionId, answerValue: value }),
    }).catch(console.error);
  };

  // Navigate to next spoke
  const handleNext = () => {
    // Track spoke completion
    trackEvent("quiz_spoke_complete", {
      spoke_name: currentSpoke,
      spoke_number: currentSpokeIndex + 1,
      spokes_total: activeSpokes.length,
    });

    if (isLastSpoke) {
      trackEvent("quiz_all_spokes_complete");
      setPhase("email");
    } else {
      setDirection(1);
      setCurrentSpokeIndex((i) => i + 1);
      saveToSession({
        sessionId,
        userId,
        answers,
        currentSpokeIndex: currentSpokeIndex + 1,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Navigate to previous spoke
  const handleBack = () => {
    if (phase === "email") {
      setPhase("quiz");
      return;
    }
    if (currentSpokeIndex > 0) {
      setDirection(-1);
      setCurrentSpokeIndex((i) => i - 1);
      saveToSession({
        sessionId,
        userId,
        answers,
        currentSpokeIndex: currentSpokeIndex - 1,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Complete quiz
  const handleComplete = async (data: {
    email: string;
    firstName?: string;
    dateOfBirth: string;
    marketingOptIn: boolean;
  }) => {
    setPhase("submitting");
    try {
      const res = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...data }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to complete quiz");

      // Track completion
      trackEvent("quiz_complete");

      // Clear session storage
      sessionStorage.removeItem(SESSION_KEY);

      // Navigate to results
      router.push(`/results?session=${sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit quiz");
      setPhase("email");
    }
  };

  // Loading state
  if (phase === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <p className="text-spoke-physical font-semibold mb-2">
            Something went wrong
          </p>
          <p className="text-neutral-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              startQuiz();
            }}
            className="px-6 py-2 rounded-xl bg-brand text-white font-semibold text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Email capture phase
  if (phase === "email" || phase === "submitting") {
    return (
      <div className="mt-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to questions
        </button>
        <EmailCapture
          onSubmit={handleComplete}
          isLoading={phase === "submitting"}
        />
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="mt-4">
      <ProgressBar currentSpokeIndex={currentSpokeIndex} />

      <SpokePage
        spoke={currentSpoke}
        questions={currentQuestions}
        answers={answers}
        onAnswer={handleAnswer}
        direction={direction}
      />

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8 pb-20">
        {currentSpokeIndex > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        <motion.button
          whileHover={allCurrentAnswered ? { scale: 1.02 } : undefined}
          whileTap={allCurrentAnswered ? { scale: 0.98 } : undefined}
          onClick={handleNext}
          disabled={!allCurrentAnswered}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          style={{
            backgroundColor: allCurrentAnswered ? "#2A9D8F" : "#d4d4d4",
            boxShadow: allCurrentAnswered
              ? "0px 4px 14px rgba(42, 157, 143, 0.4)"
              : "none",
          }}
        >
          {isLastSpoke ? "See My Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
