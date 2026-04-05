"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SPOKE_ORDER, SPOKE_META } from "@/lib/scoring";

interface Submission {
  id: string;
  email: string;
  name: string;
  date: string;
  spokeScores: Record<string, number>;
}

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const [data, setData] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const pageSize = 25;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search,
        sortDir: "desc",
      });
      const res = await fetch(`/api/admin/submissions?${params}`);
      const json = await res.json();
      setData(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch {
      console.error("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
          <p className="text-sm text-gray-500 mt-1">
            {total.toLocaleString()} total quiz submissions
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
          <button
            type="submit"
            className="h-9 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left font-medium text-gray-500 px-4 py-3">
                  Name
                </th>
                <th className="text-left font-medium text-gray-500 px-4 py-3">
                  Email
                </th>
                <th className="text-left font-medium text-gray-500 px-4 py-3">
                  Date
                </th>
                {SPOKE_ORDER.map((spoke) => (
                  <th
                    key={spoke}
                    className="text-center font-medium px-2 py-3 text-xs"
                    style={{ color: SPOKE_META[spoke]?.color }}
                  >
                    {SPOKE_META[spoke]?.label?.slice(0, 4)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3 + SPOKE_ORDER.length}
                    className="text-center py-12 text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={3 + SPOKE_ORDER.length}
                    className="text-center py-12 text-gray-400"
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() =>
                      router.push(`/admin/submissions/${row.id}`)
                    }
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{row.email}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    {SPOKE_ORDER.map((spoke) => (
                      <td
                        key={spoke}
                        className="px-2 py-3 text-center font-mono text-xs"
                      >
                        {row.spokeScores[spoke] != null
                          ? row.spokeScores[spoke]
                          : "—"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="h-8 px-3 rounded-md border border-gray-200 text-sm disabled:opacity-30 hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="h-8 px-3 rounded-md border border-gray-200 text-sm disabled:opacity-30 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
