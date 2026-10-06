"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Activity,
  Users,
  TrendingUp,
  DollarSign,
  RefreshCw,
} from "lucide-react";

type Customer = {
  id: number;
  name: string;
  industry: string;
  account_value: number;
  health_score: number;
  activity_score: number;
  risk_score: number;
  status: string;
};

type CustomerSummary = {
  total_customers: number;
  average_health: number;
  average_activity: number;
  average_risk: number;
  total_account_value: number;
  healthy_customers: number;
  at_risk_customers: number;
};

type CustomerInsight = {
  customer_id: number;
  name: string;
  industry: string;
  type: string;
  severity: string;
  message: string;
  recommendation: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [summary, setSummary] = useState<CustomerSummary | null>(null);
  const [insights, setInsights] = useState<CustomerInsight[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  async function loadCustomerData() {
    try {
      setError(false);

      const [
        customersResponse,
        summaryResponse,
        insightsResponse,
      ] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/customers", {
          cache: "no-store",
        }),
        fetch("http://127.0.0.1:8000/api/customers/summary", {
          cache: "no-store",
        }),
        fetch("http://127.0.0.1:8000/api/customers/insights", {
          cache: "no-store",
        }),
      ]);

      if (
        !customersResponse.ok ||
        !summaryResponse.ok ||
        !insightsResponse.ok
      ) {
        throw new Error("Failed to load customer intelligence");
      }

      const customersData = await customersResponse.json();
      const summaryData = await summaryResponse.json();
      const insightsData = await insightsResponse.json();

      setCustomers(customersData.customers ?? []);
      setSummary(summaryData);
      setInsights(insightsData.insights ?? []);
    } catch (err) {
      console.error("Customer intelligence error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadCustomerData();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    loadCustomerData();
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
                  Loading Customer Intelligence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Analyzing customer health, activity, and account risk...
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
                  Customer Intelligence Unavailable
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
                Customer Intelligence
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                ● Live
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Customer health, engagement activity, account value, and
              retention risk intelligence.
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

            {/* Customers */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <Users size={20} className="text-blue-600" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Accounts
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.total_customers}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Customers monitored
              </p>
            </div>

            {/* Health */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Health
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.average_health}%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Average customer health
              </p>
            </div>

            {/* Activity */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <Activity size={20} className="text-blue-600" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Engagement
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.average_activity}%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Average activity score
              </p>
            </div>

            {/* At Risk */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <AlertTriangle
                    size={20}
                    className="text-red-600"
                  />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Risk
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-slate-900">
                {summary.at_risk_customers}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Customers at risk
              </p>
            </div>
          </div>
        )}

        {/* Account Value */}
        {summary && (
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <DollarSign
                    size={19}
                    className="text-slate-700"
                  />

                  <h2 className="text-lg font-semibold text-slate-900">
                    Customer Portfolio Value
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Total account value represented across monitored
                  customers.
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(summary.total_account_value)}
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  {summary.healthy_customers} healthy accounts
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Customer Table */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Customer Portfolio
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current health, engagement, account value, and risk
                  indicators.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {customers.length} Accounts
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Account Value
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Health
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Activity
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
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {customer.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {customer.industry}
                        </p>
                      </div>
                    </td>

                    {/* Account Value */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        {formatCurrency(customer.account_value)}
                      </span>
                    </td>

                    {/* Health */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{
                              width: `${customer.health_score}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {customer.health_score}%
                        </span>
                      </div>
                    </td>

                    {/* Activity */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${customer.activity_score}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {customer.activity_score}%
                        </span>
                      </div>
                    </td>

                    {/* Risk */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          customer.risk_score >= 50
                            ? "bg-red-50 text-red-700"
                            : customer.risk_score >= 35
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {customer.risk_score}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          customer.status === "Healthy"
                            ? "bg-emerald-50 text-emerald-700"
                            : customer.status === "At Risk"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Customer Intelligence */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Customer Intelligence
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Signals generated from customer health, engagement, and
                risk indicators.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              AI Analysis
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => {
              const isPositive = insight.severity === "Positive";
              const isHigh = insight.severity === "High";

              return (
                <div
                  key={`${insight.customer_id}-${index}`}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isPositive
                          ? "bg-emerald-50 text-emerald-600"
                          : isHigh
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {isPositive ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <AlertTriangle size={18} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {insight.name}
                        </h3>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            isPositive
                              ? "bg-emerald-50 text-emerald-700"
                              : isHigh
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {insight.severity}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {insight.industry} · {insight.type}
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
              );
            })}
          </div>

          {insights.length === 0 && (
            <div className="rounded-lg bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">
                No customer intelligence signals detected.
              </p>
            </div>
          )}
        </section>

        {/* Footer Status */}
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <TrendingUp size={14} className="text-emerald-500" />

          <span>
            Customer intelligence is connected to the SignalOps
            intelligence engine.
          </span>
        </div>
      </div>
    </main>
  );
}