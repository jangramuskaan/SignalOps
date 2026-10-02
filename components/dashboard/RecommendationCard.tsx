interface RecommendationCardProps {
  title: string;
  description: string;
  priority: string;
}

export default function RecommendationCard({
  title,
  description,
  priority,
}: RecommendationCardProps) {
  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  const badgeClass =
    priorityStyles[priority as keyof typeof priorityStyles] ??
    "bg-gray-100 text-gray-700";

  return (
    <div className="group rounded-xl border bg-background p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          ✦
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}
        >
          {priority}
        </span>
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <button
        type="button"
        className="mt-4 text-sm font-medium text-blue-600 transition hover:text-blue-700"
      >
        Review recommendation →
      </button>
    </div>
  );
}