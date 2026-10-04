"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileText,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

import RiskTrendChart from "@/components/charts/RiskTrendChart";

const departmentRisk = [
  { name: "Engineering", risk: 82 },
  { name: "Support", risk: 68 },
  { name: "HR", risk: 45 },
  { name: "Sales", risk: 28 },
  { name: "Marketing", risk: 18 },
];

const alerts = [
  {
    title: "Engineering workload elevated",
    description:
      "Several teams are operating above their recommended workload capacity.",
    severity: "High",
    time: "18 min ago",
  },
  {
    title: "Support ticket volume increasing",
    description:
      "Customer support activity has increased compared with the previous period.",
    severity: "Medium",
    time: "42 min ago",
  },
  {
    title: "Employee performance improved",
    description:
      "Organization-wide performance indicators increased by 3% this period.",
    severity: "Low",
    time: "1 hr ago",
  },
];

const recommendations = [
  {
    title: "Review overdue engineering tasks",
    description:
      "23 overdue tasks may be contributing to elevated operational risk.",
  },
  {
    title: "Monitor support capacity",
    description:
      "Support activity is trending upward and may require additional capacity.",
  },
  {
    title: "Balance team workloads",
    description:
      "Redistribute selected tasks across teams with available capacity.",
  },
];

function HealthBar({
  value,
  className = "bg-slate-900",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${className}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Workspace</span>
            <ChevronRight size={13} />
            <span className="text-slate-900">Overview</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Command Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            A real-time overview of organizational health, operational risk,
            workforce performance, and emerging signals.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-slate-600">
            Intelligence updated recently
          </span>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Company Health
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">87%</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <ShieldCheck size={20} />
            </div>
          </div>

          <div className="mt-4">
            <HealthBar value={87} className="bg-green-500" />
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600">
            <ArrowUpRight size={14} />
            4% from previous period
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Operational Risk
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">68</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <AlertTriangle size={20} />
            </div>
          </div>

          <div className="mt-4">
            <HealthBar value={68} className="bg-orange-500" />
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-orange-600">
            <ArrowUpRight size={14} />
            7% risk increase
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Signals
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">24</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Activity size={20} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
              Monitoring
            </span>

            <span className="text-xs text-slate-500">Across 6 areas</span>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Signals requiring continuous observation
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Employee Performance
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">91%</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Users size={20} />
            </div>
          </div>

          <div className="mt-4">
            <HealthBar value={91} className="bg-purple-500" />
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600">
            <ArrowUpRight size={14} />
            3% improvement
          </div>
        </div>
      </section>

      {/* Risk Analytics */}
      <section className="grid gap-6 xl:grid-cols-2">
        <RiskTrendChart />

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Department Risk
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current operational risk across business functions.
              </p>
            </div>

            <Link
              href="/risk-map"
              className="text-xs font-medium text-slate-600 hover:text-slate-950"
            >
              View risk map →
            </Link>
          </div>

          <div className="mt-7 space-y-5">
            {departmentRisk.map((department) => (
              <div key={department.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {department.name}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      department.risk >= 70
                        ? "text-red-600"
                        : department.risk >= 40
                          ? "text-orange-600"
                          : "text-green-600"
                    }`}
                  >
                    {department.risk}
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      department.risk >= 70
                        ? "bg-red-500"
                        : department.risk >= 40
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${department.risk}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Summary */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <Activity size={19} />
            <h2 className="text-lg font-semibold">Intelligence Summary</h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            SignalOps has identified several operational patterns that deserve
            attention during the current reporting period.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <CircleAlert size={16} className="text-orange-400" />

              <p className="mt-3 text-sm font-medium">
                Engineering workload
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Highest operational risk area with a score of 82.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <CheckCircle2 size={16} className="text-green-400" />

              <p className="mt-3 text-sm font-medium">
                Workforce performance
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Overall performance remains strong at 91%.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <Activity size={16} className="text-blue-400" />

              <p className="mt-3 text-sm font-medium">
                Active monitoring
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                24 signals are currently being monitored.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Portfolio Snapshot</h2>

              <p className="mt-1 text-sm text-slate-500">
                Current organizational coverage.
              </p>
            </div>

            <BarChart3 size={20} className="text-slate-400" />
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-slate-400" />
                <span className="text-sm">Employees monitored</span>
              </div>

              <span className="font-semibold">1,526</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 size={18} className="text-slate-400" />
                <span className="text-sm">Customer accounts</span>
              </div>

              <span className="font-semibold">6</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-slate-400" />
                <span className="text-sm">High-risk areas</span>
              </div>

              <span className="font-semibold text-red-600">2</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-slate-400" />
                <span className="text-sm">Active signals</span>
              </div>

              <span className="font-semibold">24</span>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-orange-500" />
                <h2 className="text-lg font-semibold">Recent Alerts</h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Latest signals detected by the intelligence engine.
              </p>
            </div>

            <Link
              href="/intelligence"
              className="text-xs font-medium text-slate-600 hover:text-slate-950"
            >
              View all →
            </Link>
          </div>

          <div className="mt-5 divide-y">
            {alerts.map((alert) => (
              <div key={alert.title} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                        alert.severity === "High"
                          ? "bg-red-500"
                          : alert.severity === "Medium"
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {alert.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {alert.description}
                      </p>
                    </div>
                  </div>

                  <span className="whitespace-nowrap text-[11px] text-slate-400">
                    {alert.time}
                  </span>
                </div>

                <div className="ml-5 mt-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      alert.severity === "High"
                        ? "bg-red-50 text-red-700"
                        : alert.severity === "Medium"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-green-50 text-green-700"
                    }`}
                  >
                    {alert.severity} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-500" />
                <h2 className="text-lg font-semibold">
                  Recommended Actions
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Suggested actions based on current organizational signals.
              </p>
            </div>

            <Link
              href="/recommendations"
              className="text-xs font-medium text-slate-600 hover:text-slate-950"
            >
              View all →
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {recommendations.map((recommendation, index) => (
              <div
                key={recommendation.title}
                className="rounded-lg border bg-slate-50 p-4"
              >
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-slate-700 shadow-sm">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {recommendation.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {recommendation.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Shortcuts */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/employees"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Users size={20} className="text-slate-500" />

          <p className="mt-4 text-sm font-semibold">
            Employee Intelligence
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Review workforce performance and risk.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore <ChevronRight size={13} />
          </span>
        </Link>

        <Link
          href="/customers"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Building2 size={20} className="text-slate-500" />

          <p className="mt-4 text-sm font-semibold">
            Customer Intelligence
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Monitor customer health and account risk.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore <ChevronRight size={13} />
          </span>
        </Link>

        <Link
          href="/reports"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <FileText size={20} className="text-slate-500" />

          <p className="mt-4 text-sm font-semibold">
            Analytics & Reports
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Review trends and organizational reports.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore <ChevronRight size={13} />
          </span>
        </Link>

        <Link
          href="/risk-map"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <BarChart3 size={20} className="text-slate-500" />

          <p className="mt-4 text-sm font-semibold">
            Risk Intelligence
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Explore operational risk across departments.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore <ChevronRight size={13} />
          </span>
        </Link>
      </section>

      {/* Footer Status */}
      <section className="flex flex-col gap-3 rounded-xl border bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={17} className="text-green-600" />
          </div>

          <div>
            <p className="text-sm font-medium">
              SignalOps systems operational
            </p>

            <p className="text-xs text-slate-500">
              All intelligence modules are currently available.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ArrowDownRight size={14} />
          Data refreshed for current reporting period
        </div>
      </section>
    </main>
  );
}