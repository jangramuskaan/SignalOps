"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";

import RiskTrendChart from "@/components/charts/RiskTrendChart";
import LiveAlerts from "@/components/dashboard/LiveAlerts";

type DepartmentRisk = {
  department: string;
  risk: number;
};

type DashboardData = {
  company: {
    health: number;
    operational_risk: number;
    risk_level: string;
  };

  workforce: {
    total_employees: number;
    performance: number;
    workload: number;
    employees_at_risk: number;
  };

  customers: {
    total_customers: number;
    health: number;
    activity: number;
    customers_at_risk: number;
    portfolio_value: number;
  };

  alerts: {
    total: number;
    critical: number;
    warning: number;
    info: number;
  };

  intelligence: {
    total_insights: number;
    high_priority: number;
  };

  departments: DepartmentRisk[];
};

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  async function loadDashboard() {
    try {
      setError(false);

      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load dashboard intelligence");
      }

      const data = await response.json();

      setDashboard(data);
    } catch (err) {
      console.error("Dashboard API error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    loadDashboard();
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <RefreshCw
                size={20}
                className="animate-spin text-blue-600"
              />

              <div>
                <h2 className="font-semibold text-slate-900">
                  Loading SignalOps Command Center
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Collecting company, workforce, customer, and risk
                  intelligence...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !dashboard) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-center gap-3">
              <AlertTriangle
                size={22}
                className="text-red-600"
              />

              <div>
                <h2 className="font-semibold text-red-800">
                  Dashboard Intelligence Unavailable
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
                SignalOps Command Center
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ● Systems Operational
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Monitor company performance, operational risk, workforce,
              customers, and intelligence signals.
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

            Refresh Intelligence
          </button>
        </div>

        {/* Primary KPI Cards */}
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
              {dashboard.company.health}%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Overall organizational health
            </p>
          </div>

          {/* Operational Risk */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <ShieldAlert
                  size={20}
                  className="text-red-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Operational Risk
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {dashboard.company.operational_risk}
            </p>

            <span className="mt-2 inline-block rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              {dashboard.company.risk_level} Risk
            </span>
          </div>

          {/* Employee Performance */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <TrendingUp
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Workforce
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {dashboard.workforce.performance}%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Average employee performance
            </p>
          </div>

          {/* Intelligence Signals */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <Activity
                  size={20}
                  className="text-purple-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Intelligence
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {dashboard.intelligence.total_insights}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {dashboard.intelligence.high_priority} high-priority signals
            </p>
          </div>
        </div>

        {/* Business Snapshot */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Users
                size={18}
                className="text-blue-600"
              />

              <h2 className="text-sm font-semibold text-slate-900">
                Workforce
              </h2>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {dashboard.workforce.total_employees}
            </p>

            <p className="text-xs text-slate-500">
              Employees monitored
            </p>

            <div className="mt-4 flex justify-between text-xs">
              <span className="text-slate-500">
                Workload
              </span>

              <span className="font-semibold text-slate-700">
                {dashboard.workforce.workload}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${dashboard.workforce.workload}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-red-600">
              {dashboard.workforce.employees_at_risk} employees require
              attention
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Users
                size={18}
                className="text-emerald-600"
              />

              <h2 className="text-sm font-semibold text-slate-900">
                Customers
              </h2>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {dashboard.customers.total_customers}
            </p>

            <p className="text-xs text-slate-500">
              Customer accounts monitored
            </p>

            <div className="mt-4 flex justify-between text-xs">
              <span className="text-slate-500">
                Customer Health
              </span>

              <span className="font-semibold text-slate-700">
                {dashboard.customers.health}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${dashboard.customers.health}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Portfolio value{" "}
              <span className="font-semibold text-slate-700">
                {formatCurrency(
                  dashboard.customers.portfolio_value
                )}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle
                size={18}
                className="text-red-600"
              />

              <h2 className="text-sm font-semibold text-slate-900">
                Alert Center
              </h2>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {dashboard.alerts.total}
            </p>

            <p className="text-xs text-slate-500">
              Active operational alerts
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-red-50 p-2 text-center">
                <p className="text-sm font-bold text-red-700">
                  {dashboard.alerts.critical}
                </p>

                <p className="text-[10px] text-red-600">
                  Critical
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-2 text-center">
                <p className="text-sm font-bold text-amber-700">
                  {dashboard.alerts.warning}
                </p>

                <p className="text-[10px] text-amber-600">
                  Warning
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-2 text-center">
                <p className="text-sm font-bold text-blue-700">
                  {dashboard.alerts.info}
                </p>

                <p className="text-[10px] text-blue-600">
                  Info
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Trend */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Operational Risk Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Department-level risk signals across the organization.
            </p>
          </div>

          <RiskTrendChart />
        </section>

        {/* Department Risk */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Department Risk Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current risk distribution from the operational risk engine.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {dashboard.departments.map((department) => (
              <div
                key={department.department}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">
                    {department.department}
                  </span>

                  <span className="text-sm font-bold text-slate-700">
                    {department.risk}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      department.risk >= 70
                        ? "bg-red-500"
                        : department.risk >= 40
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${department.risk}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Alerts */}
        <LiveAlerts />

        {/* Footer */}
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2
            size={14}
            className="text-emerald-500"
          />

          <span>
            SignalOps dashboard is connected to the unified intelligence
            engine.
          </span>
        </div>
      </div>
    </main>
  );
}