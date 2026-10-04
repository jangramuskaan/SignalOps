"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const trendData = [
  { month: "May", risk: 54 },
  { month: "Jun", risk: 58 },
  { month: "Jul", risk: 61 },
  { month: "Aug", risk: 64 },
  { month: "Sep", risk: 63 },
  { month: "Oct", risk: 68 },
];

export default function RiskTrendChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Operational Risk Trend
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Organization-wide risk movement over the last six months.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
          68 current
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.25}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [`${value}`, "Risk Score"]}
            />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#f97316"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#ffffff",
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-xs text-slate-500">
          Lower score indicates lower operational risk
        </span>

        <span className="text-xs font-medium text-orange-600">
          +14 points since May
        </span>
      </div>
    </div>
  );
}