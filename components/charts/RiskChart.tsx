"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import { departmentRisk } from "@/data/dashboard";

export default function RiskChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Department Risk
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentRisk}>
            <XAxis dataKey="department" />

            <Tooltip />

            <Bar
              dataKey="risk"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}