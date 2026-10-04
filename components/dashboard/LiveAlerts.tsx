"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
  Loader2,
} from "lucide-react";

type AlertItem = {
  id: number;
  title: string;
  category: string;
  severity: string;
  department: string;
  score: number;
  message: string;
  action: string;
};

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/alerts",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load alerts");
        }

        const data = await response.json();

        setAlerts(data.alerts ?? []);
      } catch (err) {
        console.error("Alerts API error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Loader2
            size={18}
            className="animate-spin text-slate-500"
          />
          <span className="text-sm text-slate-500">
            Loading live alerts...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle
            size={18}
            className="text-red-600"
          />

          <p className="text-sm font-semibold text-red-700">
            Alert engine unavailable
          </p>
        </div>

        <p className="mt-1 text-xs text-red-600">
          Make sure the FastAPI server is running on port 8000.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={19} className="text-slate-700" />

            <h2 className="text-lg font-semibold text-slate-900">
              Live Alerts & Signals
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Operational events detected by the SignalOps intelligence
            engine.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {alerts.length} Active
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {alerts.map((alert) => {
          const isCritical = alert.severity === "Critical";
          const isWarning = alert.severity === "Warning";

          return (
            <div
              key={alert.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isCritical
                      ? "bg-red-50 text-red-600"
                      : isWarning
                        ? "bg-amber-50 text-amber-600"
                        : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {isCritical ? (
                    <AlertTriangle size={18} />
                  ) : isWarning ? (
                    <AlertTriangle size={18} />
                  ) : (
                    <Info size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {alert.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {alert.category} · {alert.department}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        isCritical
                          ? "bg-red-50 text-red-700"
                          : isWarning
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-5 text-slate-600">
                    {alert.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Recommended: {alert.action}
                    </p>

                    <span className="shrink-0 text-xs font-semibold text-slate-700">
                      Score {alert.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t pt-4">
        <CheckCircle2
          size={15}
          className="text-emerald-500"
        />

        <span className="text-xs text-slate-500">
          Signals are being monitored by the SignalOps intelligence
          engine.
        </span>
      </div>
    </section>
  );
}