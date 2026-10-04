"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Loader2,
} from "lucide-react";

type Recommendation = {
  id: number;
  title: string;
  category: string;
  severity: string;
  score: number;
  description: string;
  recommendation: string;
};

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/ai-insights/priority",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load recommendations");
        }

        const data = await response.json();

        setRecommendations(data.insights ?? []);
      } catch (err) {
        console.error("Recommendations API error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  const highPriority = recommendations.filter(
    (item) => item.severity === "High"
  ).length;

  const mediumPriority = recommendations.filter(
    (item) => item.severity === "Medium"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">
      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          SignalOps Intelligence
        </p>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Recommendations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Prioritized actions generated from current operational
              intelligence and organizational risk signals.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              AI Engine Connected
            </span>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Recommendations
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {loading ? "—" : recommendations.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Generated from live intelligence
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            High Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {loading ? "—" : highPriority}
          </p>

          <p className="mt-1 text-xs text-red-500">
            Requires immediate attention
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Medium Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-600">
            {loading ? "—" : mediumPriority}
          </p>

          <p className="mt-1 text-xs text-orange-500">
            Requires monitoring
          </p>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Loader2
              size={20}
              className="animate-spin text-blue-600"
            />

            <div>
              <p className="font-medium text-slate-900">
                Generating recommendations...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                SignalOps is analyzing current operational signals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle
              size={20}
              className="text-red-600"
            />

            <div>
              <p className="font-semibold text-red-800">
                Recommendation engine unavailable
              </p>

              <p className="mt-1 text-sm text-red-600">
                Make sure the SignalOps FastAPI server is running on
                port 8000.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {!loading && !error && (
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Recommended Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Actions prioritized according to current operational risk.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {recommendations.map((item) => {
              const isHigh = item.severity === "High";

              return (
                <article
                  key={item.id}
                  className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          isHigh
                            ? "bg-red-50 text-red-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {isHigh ? (
                          <AlertTriangle size={20} />
                        ) : (
                          <Lightbulb size={20} />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {item.category}
                        </p>

                        <h3 className="mt-1 text-base font-semibold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        isHigh
                          ? "bg-red-50 text-red-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-5 rounded-lg border bg-slate-50 p-4">
                    <div className="flex gap-3">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Recommended Action
                        </p>

                        <p className="mt-1 text-sm font-medium leading-5 text-slate-800">
                          {item.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        Signal score
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {item.score}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
                    >
                      Review action
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {recommendations.length === 0 && (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <CheckCircle2
                size={28}
                className="mx-auto text-emerald-500"
              />

              <h3 className="mt-3 font-semibold text-slate-900">
                No priority actions detected
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current organizational signals do not require immediate
                intervention.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Intelligence explanation */}
      <section className="mt-8 rounded-xl border bg-slate-900 p-6 text-white shadow-sm">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <Lightbulb size={20} />
          </div>

          <div>
            <h2 className="font-semibold">
              How SignalOps generates recommendations
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              SignalOps evaluates operational risk indicators, identifies
              departments requiring attention, assigns priority levels,
              and converts those signals into recommended operational
              actions through the Python intelligence engine.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}