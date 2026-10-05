import { Activity, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

import { intelligenceMetrics } from "@/data/intelligence";
import AIInsights from "@/components/intelligence/AIInsights";

export default function IntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <section className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
          <span>SignalOps Intelligence</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">Organization Signals</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Intelligence Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Analyze organizational signals, performance indicators, and
              operational trends from a centralized intelligence view.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-slate-600">
              Intelligence Engine Online
            </span>
          </div>
        </div>
      </section>

      {/* Intelligence KPIs */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {intelligenceMetrics.map((metric) => {
          const isPositive = metric.status === "positive";
          const isWarning = metric.status === "warning";

          return (
            <div
              key={metric.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {metric.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {metric.value}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isWarning
                      ? "bg-orange-50 text-orange-600"
                      : isPositive
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {isWarning ? (
                    <AlertTriangle size={19} />
                  ) : isPositive ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <Activity size={19} />
                  )}
                </div>
              </div>

              <div
                className={`mt-4 flex items-center gap-1 text-xs font-medium ${
                  isWarning ? "text-orange-600" : "text-green-600"
                }`}
              >
                {isWarning ? (
                  <TrendingUp size={14} />
                ) : (
                  <CheckCircle2 size={14} />
                )}

                {metric.change}
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {metric.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* AI Intelligence */}
      <section className="mb-8">
        <AIInsights />
      </section>

      {/* Intelligence Overview */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle size={19} className="text-orange-500" />

            <h2 className="text-lg font-semibold text-slate-950">
              Operational Risk
            </h2>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Engineering currently represents the highest operational risk area
            with a score of 82.
          </p>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Risk score
              </span>

              <span className="text-sm font-semibold text-red-600">82</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: "82%" }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={19} className="text-green-500" />

            <h2 className="text-lg font-semibold text-slate-950">
              Workforce Performance
            </h2>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Organization-wide employee performance remains strong and is
            currently above the expected operational target.
          </p>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Performance
              </span>

              <span className="text-sm font-semibold text-green-600">91%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: "91%" }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Activity size={19} className="text-blue-500" />

            <h2 className="text-lg font-semibold text-slate-950">
              Active Signals
            </h2>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            SignalOps is continuously monitoring organizational activity across
            departments, employees, customers, and operations.
          </p>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-950">24</span>
            <span className="mb-1 text-xs text-slate-500">
              signals monitored
            </span>
          </div>
        </div>
      </section>

      {/* Intelligence Status */}
      <section className="mt-6 rounded-xl border bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <CheckCircle2 size={20} className="text-green-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Intelligence monitoring active
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                SignalOps is analyzing current organizational signals and
                generating operational insights.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            AI Engine Online
          </div>
        </div>
      </section>
    </main>
  );
}