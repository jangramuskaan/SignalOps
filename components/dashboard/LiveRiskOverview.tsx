"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

type Department = {
  department: string;
  risk: number;
};

type RiskData = {
  overall_risk: number;
  company_health: number;
  risk_level: string;
  high_risk_count: number;
  medium_risk_count: number;
  departments: Department[];
};

export default function LiveRiskOverview() {
  const [data, setData] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          throw new Error("Failed to fetch risk data");
        }

        const result: RiskData = await response.json();

        setData(result);
        setError(false);
      } catch (err) {
        console.error("SignalOps API error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRiskData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Loader2 size={18} className="animate-spin text-slate-500" />
          <p className="text-sm font-medium">
            Loading live intelligence...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-600" />

          <p className="text-sm font-semibold text-orange-800">
            Intelligence API unavailable
          </p>
        </div>

        <p className="mt-2 text-xs text-orange-700">
          Make sure the SignalOps FastAPI server is running on port 8000.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Live KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Live Company Health</p>

          <p className="mt-2 text-3xl font-bold">
            {data.company_health}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${data.company_health}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-green-600">
            Calculated by Python risk engine
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Live Operational Risk</p>

          <p className="mt-2 text-3xl font-bold">
            {data.overall_risk}
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: `${data.overall_risk}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-orange-600">
            Risk level: {data.risk_level}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Risk Areas</p>

          <div className="mt-3 flex items-end gap-2">
            <p className="text-3xl font-bold">
              {data.high_risk_count}
            </p>

            <span className="mb-1 text-xs text-red-600">
              high risk
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {data.medium_risk_count} medium-risk departments
          </p>
        </div>
      </div>

      {/* Live Department Risk */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Live Department Risk
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Data received directly from the SignalOps Python intelligence
              engine.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
            <CheckCircle2 size={14} className="text-green-600" />

            <span className="text-xs font-medium text-green-700">
              API Connected
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {data.departments.map((department) => {
            const isHigh = department.risk >= 70;
            const isMedium =
              department.risk >= 40 && department.risk < 70;

            return (
              <div key={department.department}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {department.department}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      isHigh
                        ? "text-red-600"
                        : isMedium
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
                      isHigh
                        ? "bg-red-500"
                        : isMedium
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${department.risk}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}