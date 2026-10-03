"use client";

import { useState } from "react";

const reports = [
  {
    title: "Company Health Report",
    description:
      "Overview of organizational health, performance trends, and operational indicators.",
    type: "Executive",
    status: "Ready",
    updated: "Today",
  },
  {
    title: "Employee Workload Analysis",
    description:
      "Detailed analysis of workload distribution, active employees, and capacity pressure.",
    type: "People",
    status: "Ready",
    updated: "Today",
  },
  {
    title: "Operational Risk Report",
    description:
      "Summary of department-level risks, high-risk areas, and emerging operational concerns.",
    type: "Risk",
    status: "Review",
    updated: "Yesterday",
  },
  {
    title: "Support Performance Report",
    description:
      "Analysis of support activity, ticket volume, response patterns, and team capacity.",
    type: "Operations",
    status: "Ready",
    updated: "Yesterday",
  },
];

const monthlyData = [
  { month: "Jan", health: 72, risk: 38 },
  { month: "Feb", health: 75, risk: 34 },
  { month: "Mar", health: 77, risk: 31 },
  { month: "Apr", health: 81, risk: 27 },
  { month: "May", health: 84, risk: 24 },
  { month: "Jun", health: 87, risk: 21 },
];

function statusClasses(status: string) {
  if (status === "Ready") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("All");

  const filteredReports =
    selectedReport === "All"
      ? reports
      : reports.filter((report) => report.type === selectedReport);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Organization Intelligence
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Reports
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Review company performance, workforce trends, operational risks,
              and generated intelligence reports.
            </p>
          </div>

          <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700">
            Generate Report
          </button>
        </section>

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Reports</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
            <p className="mt-1 text-xs text-emerald-600">
              +4 this month
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Reports Ready</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">19</p>
            <p className="mt-1 text-xs text-slate-500">
              Available for review
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Under Review</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">5</p>
            <p className="mt-1 text-xs text-slate-500">
              Require attention
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Latest Health Score</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">87%</p>
            <p className="mt-1 text-xs text-emerald-600">
              +4% this month
            </p>
          </div>
        </section>

        {/* Trend */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Organizational Trend
              </h2>

              <p className="text-sm text-slate-500">
                Company health and operational risk over the last six months.
              </p>
            </div>

            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Health
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                Risk
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-6 items-end gap-4">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex flex-col items-center">
                <div className="flex h-48 w-full items-end justify-center gap-2">
                  <div
                    className="w-5 rounded-t-md bg-emerald-500 transition hover:opacity-80"
                    style={{ height: `${item.health}%` }}
                    title={`Health: ${item.health}%`}
                  />

                  <div
                    className="w-5 rounded-t-md bg-red-400 transition hover:opacity-80"
                    style={{ height: `${item.risk}%` }}
                    title={`Risk: ${item.risk}%`}
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-500">
                  {item.month}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reports List */}
        <section className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Available Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Generated intelligence reports from across SignalOps.
              </p>
            </div>

            <select
              value={selectedReport}
              onChange={(event) => setSelectedReport(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Reports</option>
              <option value="Executive">Executive</option>
              <option value="People">People</option>
              <option value="Risk">Risk</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredReports.map((report) => (
              <article
                key={report.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {report.type}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {report.title}
                    </h3>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {report.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Updated {report.updated}
                  </span>

                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    View Report
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom Insight */}
        <section className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-blue-800">
            SignalOps Insight
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-700">
            Organizational health has shown a steady upward trend while
            reported operational risk has decreased across the selected
            six-month period. Use the detailed reports above to investigate
            the underlying workforce and operational signals.
          </p>
        </section>
      </div>
    </main>
  );
}