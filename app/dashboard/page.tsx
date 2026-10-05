"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lightbulb,
  Loader2,
  ShieldCheck,
  Users,
} from "lucide-react";

import RiskTrendChart from "@/components/charts/RiskTrendChart";
import LiveAlerts from "@/components/dashboard/LiveAlerts";

type DepartmentRisk = {
  department: string;
  risk: number;
};

type RiskData = {
  overall_risk: number;
  company_health: number;
  risk_level: string;
  high_risk_count: number;
  medium_risk_count: number;
  departments: DepartmentRisk[];
};

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
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [loadingRisk, setLoadingRisk] = useState(true);
  const [riskError, setRiskError] = useState(false);

  useEffect(() => {
    async function loadRiskData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/risk",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load risk data");
        }

        const data: RiskData = await response.json();

        setRiskData(data);
        setRiskError(false);
      } catch (error) {
        console.error("Dashboard risk API error:", error);
        setRiskError(true);
      } finally {
        setLoadingRisk(false);
      }
    }

    loadRiskData();
  }, []);

  const companyHealth = riskData?.company_health ?? 0;
  const operationalRisk = riskData?.overall_risk ?? 0;

  const highRiskCount = riskData?.high_risk_count ?? 0;
  const mediumRiskCount = riskData?.medium_risk_count ?? 0;

  const activeSignals = highRiskCount + mediumRiskCount;

  const departmentRisk = riskData?.departments ?? [];

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
          <span
            className={`h-2 w-2 rounded-full ${
              riskError ? "bg-red-500" : "bg-green-500"
            }`}
          />

          <span className="text-xs font-medium text-slate-600">
            {riskError
              ? "Intelligence API unavailable"
              : "Intelligence engine connected"}
          </span>
        </div>
      </section>

      {/* Live KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Company Health */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Company Health
              </p>

              <div className="mt-2 flex items-center gap-2">
                {loadingRisk ? (
                  <Loader2
                    size={22}
                    className="animate-spin text-slate-400"
                  />
                ) : (
                  <p className="text-3xl font-bold text-slate-950">
                    {companyHealth}%
                  </p>
                )}
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <ShieldCheck size={20} />
            </div>
          </div>

          <div className="mt-4">
            <HealthBar
              value={companyHealth}
              className="bg-green-500"
            />
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600">
            <CheckCircle2 size={14} />
            Calculated by Python risk engine
          </div>
        </div>

        {/* Operational Risk */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Operational Risk
              </p>

              <div className="mt-2">
                {loadingRisk ? (
                  <Loader2
                    size={22}
                    className="animate-spin text-slate-400"
                  />
                ) : (
                  <p className="text-3xl font-bold text-slate-950">
                    {operationalRisk}
                  </p>
                )}
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <AlertTriangle size={20} />
            </div>
          </div>

          <div className="mt-4">
            <HealthBar
              value={operationalRisk}
              className="bg-orange-500"
            />
          </div>

          <div className="mt-3 text-xs font-medium text-orange-600">
            Risk level: {riskData?.risk_level ?? "Loading..."}
          </div>
        </div>

        {/* Active Signals */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Signals
              </p>

              <div className="mt-2">
                {loadingRisk ? (
                  <Loader2
                    size={22}
                    className="animate-spin text-slate-400"
                  />
                ) : (
                  <p className="text-3xl font-bold text-slate-950">
                    {activeSignals}
                  </p>
                )}
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Activity size={20} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
              Live
            </span>

            <span className="text-xs text-slate-500">
              From risk engine
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {highRiskCount} high-risk · {mediumRiskCount} medium-risk
          </p>
        </div>

        {/* Employee Performance */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Employee Performance
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                91%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Users size={20} />
            </div>
          </div>

          <div className="mt-4">
            <HealthBar
              value={91}
              className="bg-purple-500"
            />
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
                Live operational risk from the Python intelligence engine.
              </p>
            </div>

            <Link
              href="/risk-map"
              className="text-xs font-medium text-slate-600 transition hover:text-slate-950"
            >
              View risk map →
            </Link>
          </div>

          <div className="mt-7 space-y-5">
            {loadingRisk ? (
              <div className="flex items-center gap-2 py-8 text-sm text-slate-500">
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Loading department intelligence...
              </div>
            ) : departmentRisk.length === 0 ? (
              <p className="py-8 text-sm text-slate-500">
                No department risk data available.
              </p>
            ) : (
              departmentRisk.map((department) => (
                <div key={department.department}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {department.department}
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
                      style={{
                        width: `${department.risk}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Intelligence Summary */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <Activity size={19} />

            <h2 className="text-lg font-semibold">
              Intelligence Summary
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            SignalOps has identified several operational patterns that
            deserve attention during the current reporting period.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <AlertTriangle
                size={16}
                className="text-orange-400"
              />

              <p className="mt-3 text-sm font-medium">
                Highest risk
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Engineering currently has the highest operational risk.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <CheckCircle2
                size={16}
                className="text-green-400"
              />

              <p className="mt-3 text-sm font-medium">
                Company health
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Current company health is {companyHealth}%.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <Activity
                size={16}
                className="text-blue-400"
              />

              <p className="mt-3 text-sm font-medium">
                Active monitoring
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                {activeSignals} risk signals are currently active.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Portfolio Snapshot
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current organizational coverage.
              </p>
            </div>

            <BarChart3
              size={20}
              className="text-slate-400"
            />
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-600">
                  Employees monitored
                </span>
              </div>

              <span className="font-semibold">1,526</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-600">
                  Customer accounts
                </span>
              </div>

              <span className="font-semibold">6</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-600">
                  High-risk areas
                </span>
              </div>

              <span className="font-semibold text-red-600">
                {highRiskCount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity
                  size={18}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-600">
                  Active signals
                </span>
              </div>

              <span className="font-semibold">
                {activeSignals}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Alerts */}
      <section>
        <LiveAlerts />
      </section>

      {/* Recommendations */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Lightbulb
                size={18}
                className="text-yellow-500"
              />

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
            className="text-xs font-medium text-slate-600 transition hover:text-slate-950"
          >
            View all →
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
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
      </section>

      {/* Module Shortcuts */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/employees"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Users
            size={20}
            className="text-slate-500"
          />

          <p className="mt-4 text-sm font-semibold">
            Employee Intelligence
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Review workforce performance and risk.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore
            <ArrowRight size={13} />
          </span>
        </Link>

        <Link
          href="/customers"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Building2
            size={20}
            className="text-slate-500"
          />

          <p className="mt-4 text-sm font-semibold">
            Customer Intelligence
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Monitor customer health and account risk.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore
            <ArrowRight size={13} />
          </span>
        </Link>

        <Link
          href="/reports"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <FileText
            size={20}
            className="text-slate-500"
          />

          <p className="mt-4 text-sm font-semibold">
            Analytics & Reports
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Review trends and organizational reports.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore
            <ArrowRight size={13} />
          </span>
        </Link>

        <Link
          href="/risk-map"
          className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <BarChart3
            size={20}
            className="text-slate-500"
          />

          <p className="mt-4 text-sm font-semibold">
            Risk Intelligence
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Explore operational risk across departments.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
            Explore
            <ArrowRight size={13} />
          </span>
        </Link>
      </section>

      {/* Footer */}
      <section className="flex flex-col gap-3 rounded-xl border bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={17}
              className="text-green-600"
            />
          </div>

          <div>
            <p className="text-sm font-medium">
              SignalOps systems operational
            </p>

            <p className="text-xs text-slate-500">
              Risk intelligence is connected to the Python backend.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span
            className={`h-2 w-2 rounded-full ${
              riskError ? "bg-red-500" : "bg-green-500"
            }`}
          />

          {riskError
            ? "Backend connection unavailable"
            : "Live intelligence connected"}
        </div>
      </section>
    </main>
  );
}