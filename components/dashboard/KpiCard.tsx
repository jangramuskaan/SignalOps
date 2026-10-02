interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  valueColor?: string;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  valueColor = "text-foreground",
}: KpiCardProps) {
  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <div className="h-2 w-2 rounded-full bg-blue-500" />
      </div>

      <div className="mt-4">
        <p className={`text-3xl font-bold tracking-tight ${valueColor}`}>
          {value}
        </p>

        {subtitle && (
          <p className="mt-2 text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}