"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Users,
  TrendingUp,
  Activity,
  RefreshCw,
} from "lucide-react";

type Employee = {
  id: number;
  name: string;
  department: string;
  role: string;
  performance: number;
  workload: number;
  risk: number;
  status: string;
};

type EmployeeSummary = {
  total_employees: number;
  average_performance: number;
  average_workload: number;
  average_risk: number;
  high_performers: number;
  attention_required: number;
};

type EmployeeInsight = {
  employee_id: number;
  name: string;
  department: string;
  type: string;
  severity: string;
  message: string;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [summary, setSummary] = useState<EmployeeSummary | null>(null);
  const [insights, setInsights] = useState<EmployeeInsight[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadEmployeeData() {
    try {
      setError(false);

      const [employeesResponse, summaryResponse, insightsResponse] =
        await Promise.all([
          fetch("http://127.0.0.1:8000/api/employees", {
            cache: "no-store",
          }),
          fetch("http://127.0.0.1:8000/api/employees/summary", {
            cache: "no-store",
          }),
          fetch("http://127.0.0.1:8000/api/employees/insights", {
            cache: "no-store",
          }),
        ]);

      if (
        !employeesResponse.ok ||
        !summaryResponse.ok ||
        !insightsResponse.ok
      ) {
        throw new Error("Failed to load employee intelligence");
      }

      const employeesData = await employeesResponse.json();
      const summaryData = await summaryResponse.json();
      const insightsData = await insightsResponse.json();

      setEmployees(employeesData.employees ?? []);
      setSummary(summaryData);
      setInsights(insightsData.insights ?? []);
    } catch (err) {
      console.error("Employee intelligence error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadEmployeeData();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    loadEmployeeData();
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
                  Loading Employee Intelligence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Analyzing workforce performance and operational signals...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-center gap-3">
              <AlertTriangle size={22} className="text-red-600" />

              <div>
                <h2 className="font-semibold text-red-800">
                  Employee Intelligence Unavailable
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
                Employee Intelligence
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ● Live
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Workforce performance, workload distribution, and employee
              risk intelligence.
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
            Refresh Data
          </button>
        </div>

        {/* KPI Cards */}
        {summary && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <Users size={20} className="text-blue-600" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Workforce
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.total_employees}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Employees monitored
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <TrendingUp size={20} className="text-emerald-600" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Performance
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.average_performance}%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Average performance
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Activity size={20} className="text-amber-600" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Workload
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.average_workload}%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Average workload
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Attention
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.attention_required}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Employees requiring attention
              </p>
            </div>
          </div>
        )}

        {/* Employee Table */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Workforce Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current employee performance and risk indicators.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {employees.length} Records
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Employee
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Performance
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Workload
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Risk
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {employee.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {employee.role}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {employee.department}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{
                              width: `${employee.performance}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {employee.performance}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${employee.workload}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {employee.workload}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          employee.risk >= 50
                            ? "bg-red-50 text-red-700"
                            : employee.risk >= 35
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {employee.risk}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          employee.status === "High Performer"
                            ? "bg-emerald-50 text-emerald-700"
                            : employee.status === "Needs Attention"
                              ? "bg-red-50 text-red-700"
                              : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Employee Intelligence Insights */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Workforce Intelligence
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Signals generated from employee performance and risk
                indicators.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              AI Analysis
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => {
              const isPositive = insight.severity === "Positive";

              return (
                <div
                  key={`${insight.employee_id}-${index}`}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isPositive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {isPositive ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <AlertTriangle size={18} />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {insight.name}
                        </h3>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            isPositive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {insight.severity}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {insight.department} · {insight.type}
                      </p>

                      <p className="mt-3 text-sm leading-5 text-slate-600">
                        {insight.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {insights.length === 0 && (
            <div className="rounded-lg bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">
                No workforce intelligence signals detected.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}