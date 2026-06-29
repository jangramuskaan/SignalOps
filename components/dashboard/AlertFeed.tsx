import { TriangleAlert } from "lucide-react";

const alerts = [
  "Engineering deadlines missed",
  "Support ticket volume increasing",
  "HR burnout risk detected",
];

export default function AlertFeed() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Live Alerts
      </h2>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert}
            className="flex items-center gap-3 rounded-lg bg-red-50 p-3"
          >
            <TriangleAlert className="h-5 w-5 text-red-500" />

            <p className="text-sm">{alert}</p>
          </div>
        ))}
      </div>
    </div>
  );
}