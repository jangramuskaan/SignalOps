const alerts = [
  {
    title: "Engineering deadlines missed",
    description:
      "Several engineering tasks have passed their expected completion date.",
    severity: "Critical",
    time: "12 min ago",
  },
  {
    title: "Support ticket volume increasing",
    description:
      "Customer support requests are trending above the normal weekly average.",
    severity: "Warning",
    time: "28 min ago",
  },
  {
    title: "HR burnout risk detected",
    description:
      "Workload indicators suggest increased pressure across the HR team.",
    severity: "Warning",
    time: "1 hr ago",
  },
];

export default function AlertFeed() {
  return (
    <div className="rounded-xl border bg-background shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">
            Live Alerts
          </h2>

          <p className="text-sm text-muted-foreground">
            Important signals requiring attention
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
          {alerts.length} Active
        </span>
      </div>

      {/* Alerts */}
      <div className="divide-y">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className="flex gap-4 px-6 py-5 transition hover:bg-muted/40"
          >
            {/* Status indicator */}
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">
                  {alert.title}
                </h3>

                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                    alert.severity === "Critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {alert.description}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {alert.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-3">
        <button
          type="button"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          View all alerts →
        </button>
      </div>
    </div>
  );
}