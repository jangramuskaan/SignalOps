import { recommendations } from "@/data/employees";

function getPriorityClasses(priority: string) {
  if (priority === "High") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (priority === "Medium") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function RecommendationsPage() {
  const highPriority = recommendations.filter(
    (item) => item.priority === "High"
  ).length;

  const mediumPriority = recommendations.filter(
    (item) => item.priority === "Medium"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <section>
          <p className="text-sm font-medium text-blue-600">
            Organization Intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Recommendations
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            AI-powered recommendations based on current organizational
            signals, employee workload, performance, and operational risk.
          </p>
        </section>

        {/* Summary Cards */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Recommendations</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {recommendations.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Active organizational signals
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-red-700">
              High Priority
            </p>

            <p className="mt-2 text-3xl font-bold text-red-700">
              {highPriority}
            </p>

            <p className="mt-1 text-sm text-red-600">
              Require immediate attention
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-amber-700">
              Medium Priority
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-700">
              {mediumPriority}
            </p>

            <p className="mt-1 text-sm text-amber-600">
              Should be reviewed soon
            </p>
          </div>
        </section>

        {/* Recommendations */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              AI Recommendations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Suggested actions generated from current organizational
              intelligence signals.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((recommendation) => (
              <article
                key={recommendation.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {recommendation.title}
                  </h3>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getPriorityClasses(
                      recommendation.priority
                    )}`}
                  >
                    {recommendation.priority}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {recommendation.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                    Review Action
                  </button>

                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Explanation */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            How Recommendations Work
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            SignalOps analyzes organizational indicators such as workload,
            employee performance, overdue tasks, operational risks, and
            support activity. These signals are converted into actionable
            recommendations that help teams identify areas requiring review.
          </p>
        </section>
      </div>
    </main>
  );
}