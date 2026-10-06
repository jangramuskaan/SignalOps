"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type MonthlyData = {
  month: string;
  risk: number;
  health: number;
  performance: number;
  alerts: number;
};

type ReportSummary = {
  current_health: number;
  health_change: number;
  current_risk: number;
  risk_change: number;
  current_performance: number;
  performance_change: number;
  active_alerts: number;
  alerts_change: number;
};

type ReportInsight = {
  title: string;
  category: string;
  severity: string;
  message: string;
  recommendation: string;
};

type ReportData = {
  summary: ReportSummary;
  monthly_data: MonthlyData[];
  insights: ReportInsight[];
};

export default function ReportsPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  async function loadReports() {
    try {
      setError(false);

      const response = await fetch(
        "http://127.0.0.1:8000/api/reports",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load reports");
      }

      const data = await response.json();

      setReport(data);
    } catch (err) {
      console.error("Reports API error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    loadReports();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <RefreshCw
                size={20}
                className="animate-spin text-blue-600"
              />

              <div>
                <h2 className="font-semibold text-slate-900">
                  Loading Intelligence Reports
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Preparing operational trends and intelligence...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-center gap-3">
              <AlertTriangle
                size={22}
                className="text-red-600"
              />

              <div>
                <h2 className="font-semibold text-red-800">
                  Reports Engine Unavailable
                </h2>

                <p className="mt-1 text-sm text-red-600">
                  Make sure the SignalOps FastAPI server is running on
                  port 8000.
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  const summary = report.summary;
  const latestMonth =
    report.monthly_data[report.monthly_data.length - 1];

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Intelligence Reports
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ● Live
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Operational trends, company health, workforce performance,
              and risk intelligence.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh Report
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Company Health */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <CheckCircle2
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Company Health
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {summary.current_health}%
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp size={13} />
              {summary.health_change >= 0 ? "+" : ""}
              {summary.health_change}% from previous month
            </div>
          </div>

          {/* Operational Risk */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <BarChart3
                  size={20}
                  className="text-amber-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Operational Risk
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {summary.current_risk}
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingDown size={13} />
              {summary.risk_change} points from previous month
            </div>
          </div>

          {/* Performance */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <TrendingUp
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Performance
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {summary.current_performance}%
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp size={13} />
              +{summary.performance_change}% from previous month
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <AlertTriangle
                  size={20}
                  className="text-red-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Active Alerts
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {summary.active_alerts}
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingDown size={13} />
              {summary.alerts_change} from previous month
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Operational Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly movement across company health, risk, performance,
                and alerts.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Latest: {latestMonth.month}
            </span>
          </div>

          <div className="space-y-6">
            {report.monthly_data.map((month) => (
              <div key={month.month}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="w-20 text-sm font-semibold text-slate-700">
                    {month.month}
                  </span>

                  <div className="flex gap-5 text-xs text-slate-500">
                    <span>
                      Health{" "}
                      <strong className="text-slate-800">
                        {month.health}%
                      </strong>
                    </span>

                    <span>
                      Risk{" "}
                      <strong className="text-slate-800">
                        {month.risk}
                      </strong>
                    </span>

                    <span>
                      Performance{" "}
                      <strong className="text-slate-800">
                        {month.performance}%
                      </strong>
                    </span>

                    <span>
                      Alerts{" "}
                      <strong className="text-slate-800">
                        {month.alerts}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Health */}
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-slate-400">
                      Health
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${month.health}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Risk */}
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-slate-400">
                      Risk
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{
                          width: `${month.risk}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-xs text-slate-400">
                      Performance
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{
                          width: `${month.performance}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Insights */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Report Intelligence
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Automated observations generated from operational trends.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              AI Analysis
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {report.insights.map((insight, index) => (
              <div
                key={`${insight.title}-${index}`}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {insight.title}
                      </h3>

                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        {insight.severity}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {insight.category}
                    </p>

                    <p className="mt-3 text-sm leading-5 text-slate-600">
                      {insight.message}
                    </p>

                    <div className="mt-3 rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Recommended Action
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Status */}
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2
            size={14}
            className="text-emerald-500"
          />

          <span>
            Reports are generated from the SignalOps operational
            intelligence engine.
          </span>
        </div>
      </div>
    </main>
  );
}