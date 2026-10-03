import RiskChart from "@/components/charts/RiskChart";

export default function RiskMapPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Organization Intelligence
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Risk Map
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Monitor operational risk across departments and identify areas that
          require attention.
        </p>
      </section>

      {/* Risk Summary */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Overall Risk
          </p>

          <p className="mt-3 text-3xl font-bold text-red-600">
            High
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Based on current department indicators
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Highest Risk Area
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            Engineering
          </p>

          <p className="mt-2 text-xs text-red-600">
            Requires monitoring
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Departments Monitored
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            5
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Across the organization
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Risk Threshold
          </p>

          <p className="mt-3 text-3xl font-bold text-amber-600">
            60
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Scores above this need review
          </p>
        </div>
      </section>

      {/* Risk Chart */}
      <section className="mb-8">
        <RiskChart />
      </section>

      {/* Risk Breakdown */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Risk Assessment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Department-level operational risk indicators.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="font-medium text-slate-900">
                Engineering
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Elevated workload and operational pressure
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-red-600">
                82
              </p>

              <span className="text-xs text-red-600">
                High Risk
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="font-medium text-slate-900">
                Support
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Increasing support workload
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-amber-600">
                68
              </p>

              <span className="text-xs text-amber-600">
                Medium Risk
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="font-medium text-slate-900">
                HR
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Workforce indicators remain stable
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-amber-600">
                45
              </p>

              <span className="text-xs text-amber-600">
                Moderate
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="font-medium text-slate-900">
                Sales
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Normal operational risk levels
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-emerald-600">
                28
              </p>

              <span className="text-xs text-emerald-600">
                Low Risk
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="font-medium text-slate-900">
                Marketing
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Low current operational exposure
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-emerald-600">
                18
              </p>

              <span className="text-xs text-emerald-600">
                Low Risk
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}