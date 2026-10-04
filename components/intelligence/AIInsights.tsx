"use client";

import { useEffect, useState } from "react";

type Insight = {
  id: number;
  title: string;
  category: string;
  severity: string;
  score: number;
  description: string;
  recommendation: string;
};

export default function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadInsights() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/ai-insights/priority"
        );

        if (!response.ok) {
          throw new Error("Failed to load AI insights");
        }

        const data = await response.json();
        setInsights(data.insights ?? []);
      } catch (err) {
        console.error("AI insights error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadInsights();
  }, []);

  return (
    <section className="mb-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-900">
              AI Intelligence
            </h2>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              ● Engine Online
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            AI-generated operational insights and recommended actions.
          </p>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Analyzing organizational signals...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            AI Intelligence is temporarily unavailable.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Make sure the SignalOps Python API is running on port 8000.
          </p>
        </div>
      )}

      {!loading && !error && insights.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {insight.category}
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-slate-900">
                    {insight.title}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    insight.severity === "High"
                      ? "bg-red-50 text-red-700"
                      : insight.severity === "Medium"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {insight.severity}
                </span>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Risk Score
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {insight.score}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(insight.score, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {insight.description}
              </p>

              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Recommended Action
                </p>

                <p className="mt-1 text-sm font-medium leading-5 text-slate-800">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && insights.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            No priority insights detected.
          </p>
        </div>
      )}
    </section>
  );
}