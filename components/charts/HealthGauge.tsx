"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import { companyHealth } from "@/data/dashboard";

export default function HealthGauge() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Company Health Trend
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={companyHealth}>
            <XAxis dataKey="month" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}