import { intelligenceMetrics } from "@/data/intelligence";

export default function IntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          SignalOps Intelligence
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Intelligence Center
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Analyze organizational signals, performance indicators, and
          operational trends from a centralized intelligence view.
        </p>
      </section>

      {/* Intelligence KPIs */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {intelligenceMetrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {metric.title}
            </p>

            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-bold text-slate-900">
                {metric.value}
              </p>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  metric.status === "positive"
                    ? "bg-emerald-50 text-emerald-700"
                    : metric.status === "warning"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {metric.change}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {metric.description}
            </p>
          </div>
        ))}
      </section>

      {/* Main Intelligence Grid */}
      <section className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Organization Signals */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Organization Signals
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Key signals detected across the organization.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-red-800">
                    Engineering workload pressure
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    Engineering workload is above the organization average.
                    Review task allocation and delivery capacity.
                  </p>
                </div>

                <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                  High
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-amber-800">
                    Support demand increasing
                  </p>

                  <p className="mt-1 text-sm text-amber-700">
                    Support ticket activity has increased and may require
                    additional team capacity.
                  </p>
                </div>

                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  Medium
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-emerald-800">
                    Overall performance remains healthy
                  </p>

                  <p className="mt-1 text-sm text-emerald-700">
                    Organization-wide performance indicators remain within
                    the expected operating range.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Positive
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Score */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Intelligence Score
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current organizational signal quality.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-blue-100">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">
                  87
                </p>

                <p className="text-xs font-medium text-slate-500">
                  / 100
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-lg bg-blue-50 p-4 text-center">
            <p className="text-sm font-semibold text-blue-700">
              Strong organizational visibility
            </p>

            <p className="mt-1 text-xs text-blue-600">
              Most monitored signals are within expected ranges.
            </p>
          </div>
        </div>
      </section>

      {/* Trend Analysis */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Signal Trend Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recent movement across key organizational indicators.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Company Health
              </span>

              <span className="text-sm font-semibold text-emerald-600">
                +4%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: "87%" }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Employee Performance
              </span>

              <span className="text-sm font-semibold text-blue-600">
                +3%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: "91%" }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Operational Risk
              </span>

              <span className="text-sm font-semibold text-red-600">
                +7%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-red-500"
                style={{ width: "68%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                AI-Generated Insights
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Suggested observations based on current organizational data.
              </p>
            </div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
              AI Analysis
            </span>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Workforce
            </p>

            <h3 className="mt-3 font-semibold text-slate-900">
              Review high workload teams
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Several employees are operating near high workload levels.
              Reviewing allocation could improve capacity balance.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
              Operations
            </p>

            <h3 className="mt-3 font-semibold text-slate-900">
              Monitor support activity
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Rising support activity may indicate increasing customer demand
              or capacity constraints.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Performance
            </p>

            <h3 className="mt-3 font-semibold text-slate-900">
              Maintain current performance
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Current performance indicators are healthy. Continue monitoring
              trends for sustained organizational performance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}