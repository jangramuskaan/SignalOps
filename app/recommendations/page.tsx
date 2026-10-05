"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Loader2,
  RefreshCw,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

type AIInsight = {
  id: number;
  title: string;
  category: string;
  severity: string;
  score: number;
  description: string;
  recommendation: string;
};

export default function RecommendationsPage() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadRecommendations() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai-insights/priority",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load AI recommendations");
      }

      const data = await response.json();

      setInsights(data.insights ?? []);
    } catch (err) {
      console.error("Recommendations API error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecommendations();
  }, []);

  const highPriority = insights.filter(
    (item) => item.severity.toLowerCase() === "high"
  ).length;

  const mediumPriority = insights.filter(
    (item) => item.severity.toLowerCase() === "medium"
  ).length;

  const averageScore =
    insights.length > 0
      ? Math.round(
          insights.reduce((total, item) => total + item.score, 0) /
            insights.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <section className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
          <span>SignalOps</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">AI Recommendations</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Recommendations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              AI-generated recommendations based on current organizational
              signals, operational risk, and workforce intelligence.
            </p>
          </div>

          <button
            onClick={loadRecommendations}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}

            Refresh Insights
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                AI Insights
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {loading ? "—" : insights.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Lightbulb size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Current actionable signals
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                High Priority
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {loading ? "—" : highPriority}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <ShieldAlert size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-red-600">
            Requires immediate attention
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Medium Priority
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {loading ? "—" : mediumPriority}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <AlertTriangle size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-orange-600">
            Should be monitored
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Average Risk
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {loading ? "—" : averageScore}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <TrendingUp size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Across prioritized insights
          </p>
        </div>
      </section>

      {/* API Error */}
      {error && (
        <section className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <h2 className="text-sm font-semibold text-red-800">
                AI Recommendations unavailable
              </h2>

              <p className="mt-1 text-sm text-red-700">
                Make sure the FastAPI backend is running on port 8000 and try
                refreshing the insights.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Loading */}
      {loading && (
        <section className="rounded-xl border bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <Loader2
              size={28}
              className="animate-spin text-blue-600"
            />

            <h2 className="mt-4 text-sm font-semibold text-slate-900">
              Generating recommendations
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              SignalOps is analyzing current organizational signals...
            </p>
          </div>
        </section>
      )}

      {/* Recommendations */}
      {!loading && !error && (
        <section className="space-y-4">
          {insights.length === 0 ? (
            <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
              <CheckCircle2
                size={32}
                className="mx-auto text-green-500"
              />

              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                No priority recommendations
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                The intelligence engine currently has no high or medium
                priority recommendations.
              </p>
            </div>
          ) : (
            insights.map((insight) => {
              const isHigh =
                insight.severity.toLowerCase() === "high";

              const isMedium =
                insight.severity.toLowerCase() === "medium";

              return (
                <article
                  key={insight.id}
                  className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                          isHigh
                            ? "bg-red-50 text-red-600"
                            : isMedium
                              ? "bg-orange-50 text-orange-600"
                              : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {isHigh ? (
                          <ShieldAlert size={20} />
                        ) : isMedium ? (
                          <AlertTriangle size={20} />
                        ) : (
                          <Lightbulb size={20} />
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-semibold text-slate-950">
                            {insight.title}
                          </h2>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                              isHigh
                                ? "bg-red-50 text-red-700"
                                : isMedium
                                  ? "bg-orange-50 text-orange-700"
                                  : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {insight.severity}
                          </span>

                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
                            {insight.category}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {insight.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-lg bg-slate-50 px-4 py-3 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Risk Score
                      </p>

                      <p
                        className={`mt-1 text-2xl font-bold ${
                          insight.score >= 70
                            ? "text-red-600"
                            : insight.score >= 40
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      >
                        {insight.score}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                          Recommended Action
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isHigh
                            ? "bg-red-500"
                            : isMedium
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                      />

                      AI-generated organizational insight
                    </div>

                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 transition hover:text-blue-600">
                      Review Action
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      )}

      {/* Intelligence explanation */}
      <section className="mt-8 rounded-xl bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <TrendingUp size={19} className="text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                How SignalOps generates recommendations
              </h2>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-400">
                The intelligence engine evaluates operational risk,
                workforce performance, customer activity, and other
                organizational signals to identify priority areas and suggest
                actions.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            AI Engine Online
          </div>
        </div>
      </section>
    </main>
  );
}