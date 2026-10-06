"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";

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

type RiskInsight = {
  department: string;
  severity: string;
  message: string;
};

export default function RiskMapPage() {
  const [risk, setRisk] = useState<RiskData | null>(null);
  const [insights, setInsights] = useState<RiskInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  async function loadRiskData() {
    try {
      setError(false);

      const [riskResponse, insightsResponse] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/risk", {
          cache: "no-store",
        }),
        fetch("http://127.0.0.1:8000/api/insights", {
          cache: "no-store",
        }),
      ]);

      if (!riskResponse.ok || !insightsResponse.ok) {
        throw new Error("Failed to load risk intelligence");
      }

      const riskData = await riskResponse.json();
      const insightsData = await insightsResponse.json();

      setRisk(riskData);
      setInsights(insightsData.insights ?? []);
    } catch (err) {
      console.error("Risk intelligence error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadRiskData();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    loadRiskData();
  }

  function getRiskColor(score: number) {
    if (score >= 70) {
      return "bg-red-500";
    }

    if (score >= 40) {
      return "bg-amber-500";
    }

    return "bg-emerald-500";
  }

  function getRiskBadge(score: number) {
    if (score >= 70) {
      return "bg-red-50 text-red-700";
    }

    if (score >= 40) {
      return "bg-amber-50 text-amber-700";
    }

    return "bg-emerald-50 text-emerald-700";
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
                  Loading Risk Intelligence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Analyzing departmental operational risk...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !risk) {
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
                  Risk Intelligence Unavailable
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

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Risk Intelligence Map
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ● Live
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Real-time operational risk across SignalOps departments.
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

            Refresh Risk
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <ShieldAlert
                  size={20}
                  className="text-red-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Overall Risk
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {risk.overall_risk}
            </p>

            <span
              className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getRiskBadge(
                risk.overall_risk
              )}`}
            >
              {risk.risk_level} Risk
            </span>
          </div>

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
              {risk.company_health}%
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Derived from operational risk
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <AlertTriangle
                  size={20}
                  className="text-red-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                High Risk Areas
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {risk.high_risk_count}
            </p>

            <p className="mt-2 text-xs text-red-600">
              Require immediate attention
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <Activity
                  size={20}
                  className="text-amber-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Medium Risk
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {risk.medium_risk_count}
            </p>

            <p className="mt-2 text-xs text-amber-600">
              Requires monitoring
            </p>
          </div>
        </div>

        {/* Department Risk */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Department Risk Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current operational risk scores generated by the SignalOps
              risk engine.
            </p>
          </div>

          <div className="space-y-6">
            {risk.departments.map((department) => (
              <div key={department.department}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {department.department}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRiskBadge(
                      department.risk
                    )}`}
                  >
                    {department.risk}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${getRiskColor(
                      department.risk
                    )}`}
                    style={{
                      width: `${department.risk}%`,
                    }}
                  />
                </div>

                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Insights */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Risk Intelligence
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Automated observations generated from departmental risk
                signals.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Engine Analysis
            </span>
          </div>

          {insights.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((insight, index) => {
                const isHigh = insight.severity === "High";

                return (
                  <div
                    key={`${insight.department}-${index}`}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isHigh
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <AlertTriangle size={18} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {insight.department}
                          </h3>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isHigh
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {insight.severity}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-5 text-slate-600">
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">
                No significant risk signals detected.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <TrendingDown
            size={14}
            className="text-emerald-500"
          />

          <span>
            Risk intelligence is being calculated by the SignalOps
            operational risk engine.
          </span>
        </div>
      </div>
    </main>
  );
}