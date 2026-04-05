"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SPOKE_META } from "@/lib/scoring";
import { ArrowLeft } from "lucide-react";

interface SubmissionDetail {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string | null;
  marketingOptIn: boolean;
  date: string;
  spokeScores: Record<string, number>;
  answers: Array<{
    spoke: string;
    questionIndex: number;
    questionText: string;
    answerValue: number;
  }>;
}

export default function SubmissionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/submissions/${id}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading...</div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-gray-400">Not found</div>
    );
  }

  // Group answers by spoke
  const answersBySpoke: Record<string, typeof data.answers> = {};
  for (const a of data.answers) {
    if (!answersBySpoke[a.spoke]) answersBySpoke[a.spoke] = [];
    answersBySpoke[a.spoke].push(a);
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to submissions
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">User Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">
                {new Date(data.date).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">DOB</span>
              <span className="font-medium">
                {data.dateOfBirth
                  ? new Date(data.dateOfBirth).toLocaleDateString()
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Marketing</span>
              <span className="font-medium">
                {data.marketingOptIn ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Spoke scores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Spoke Scores</h2>
          <div className="space-y-3">
            {Object.entries(data.spokeScores).map(([spoke, score]) => {
              const meta = SPOKE_META[spoke];
              return (
                <div key={spoke}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: meta?.color }} className="font-medium">
                      {meta?.label || spoke}
                    </span>
                    <span className="font-bold">{score}/10</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(score / 10) * 100}%`,
                        backgroundColor: meta?.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual answers */}
      {data.answers.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Individual Answers</h2>
          {Object.entries(answersBySpoke).map(([spoke, answers]) => {
            const meta = SPOKE_META[spoke];
            return (
              <div key={spoke} className="mb-6 last:mb-0">
                <h3
                  className="text-sm font-bold mb-2"
                  style={{ color: meta?.color }}
                >
                  {meta?.label || spoke}
                </h3>
                <div className="space-y-2">
                  {answers.map((a, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"
                    >
                      <span className="text-gray-600 max-w-lg">
                        {a.questionText}
                      </span>
                      <span className="font-mono font-bold ml-4 flex-shrink-0">
                        {a.answerValue}/7
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
