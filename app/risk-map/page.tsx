import RiskChart from "@/components/charts/RiskChart";

const riskAreas = [
  {
    area: "Engineering",
    score: 82,
    level: "High",
    description: "High workload and elevated operational pressure.",
  },
  {
    area: "Support",
    score: 68,
    level: "High",
    description: "Increasing support activity and ticket volume.",
  },
  {
    area: "HR",
    score: 45,
    level: "Medium",
    description: "Moderate organizational workload indicators.",
  },
  {
    area: "Sales",
    score: 28,
    level: "Low",
    description: "Current operational indicators remain stable.",
  },
  {
    area: "Marketing",
    score: 18,
    level: "Low",
    description: "No significant operational risk detected.",
  },
];

function getRiskStyle(level: string) {
  if (level === "High") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (level === "Medium") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function RiskMapPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <section>
          <p className="text-sm font-medium text-red-600">
            Organization Intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Risk Map
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Monitor operational risk across departments and identify areas
            that may require closer attention.
          </p>
        </section>

        {/* Summary cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Overall Risk</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">48%</p>
            <p className="mt-1 text-xs text-slate-500">
              Across all departments
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">High Risk Areas</p>
            <p className="mt-2 text-3xl font-bold text-red-600">2</p>
            <p className="mt-1 text-xs text-slate-500">
              Require monitoring
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Medium Risk Areas</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">1</p>
            <p className="mt-1 text-xs text-slate-500">
              Moderate exposure
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Low Risk Areas</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">2</p>
            <p className="mt-1 text-xs text-slate-500">
              Currently stable
            </p>
          </div>
        </section>

        {/* Chart */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Department Risk Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current operational risk score by department.
            </p>
          </div>

          <RiskChart />
        </section>

        {/* Risk table */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Risk Areas
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Department-level risk indicators and current observations.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {riskAreas.map((risk) => (
              <div
                key={risk.area}
                className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0 md:w-1/3">
                  <h3 className="font-semibold text-slate-900">
                    {risk.area}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {risk.description}
                  </p>
                </div>

                <div className="flex items-center gap-5 md:w-1/3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        risk.level === "High"
                          ? "bg-red-500"
                          : risk.level === "Medium"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${risk.score}%` }}
                    />
                  </div>

                  <span className="w-12 text-right text-sm font-semibold text-slate-700">
                    {risk.score}%
                  </span>
                </div>

                <div className="md:w-32 md:text-right">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getRiskStyle(
                      risk.level
                    )}`}
                  >
                    {risk.level} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insight */}
        <section className="rounded-xl border border-red-100 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-800">
            Risk Intelligence
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-red-700">
            Engineering and Support currently show the highest recorded
            operational risk scores. Review workload, active tasks, and
            capacity indicators in these departments for additional context.
          </p>
        </section>
      </div>
    </main>
  );
}