"use client";

import React, { useEffect, useState } from "react";
import { SPOKE_META } from "@/lib/scoring";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MetricsData {
  totalAllTime: number;
  totalPeriod: number;
  days: number;
  spokeAverages: Array<{
    spoke: string;
    min: number;
    avg: number;
    max: number;
    count: number;
  }>;
  dailyData: Array<{ date: string; count: number }>;
}

export default function AdminMetricsPage() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/metrics?days=${days}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading metrics...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Metrics</h1>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`h-8 px-3 rounded-md text-sm font-medium border ${
                days === d
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total (All Time)</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {data.totalAllTime.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Last {days} Days</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {data.totalPeriod.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Daily chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">
          Submissions Per Day
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                labelFormatter={(v) =>
                  new Date(v).toLocaleDateString("en", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2A9D8F"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spoke averages table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="font-bold text-gray-900">
            Spoke Averages (Last {days} Days)
          </h2>
        </div>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left font-medium text-gray-500 px-6 py-3">
                Spoke
              </th>
              <th className="text-center font-medium text-gray-500 px-4 py-3">
                Min
              </th>
              <th className="text-center font-medium text-gray-500 px-4 py-3">
                Avg
              </th>
              <th className="text-center font-medium text-gray-500 px-4 py-3">
                Max
              </th>
              <th className="text-center font-medium text-gray-500 px-4 py-3">
                Responses
              </th>
            </tr>
          </thead>
          <tbody>
            {data.spokeAverages.map((s) => {
              const meta = SPOKE_META[s.spoke];
              return (
                <tr
                  key={s.spoke}
                  className="border-b border-gray-50"
                >
                  <td className="px-6 py-3">
                    <span
                      className="font-medium"
                      style={{ color: meta?.color }}
                    >
                      {meta?.label || s.spoke}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 font-mono">
                    {s.min}
                  </td>
                  <td className="text-center px-4 py-3 font-mono font-bold">
                    {s.avg}
                  </td>
                  <td className="text-center px-4 py-3 font-mono">
                    {s.max}
                  </td>
                  <td className="text-center px-4 py-3 text-gray-400">
                    {s.count.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
