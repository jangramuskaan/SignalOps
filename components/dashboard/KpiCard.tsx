interface KpiCardProps {
  title: string;
  value: string;
  valueColor?: string;
}

export default function KpiCard({
  title,
  value,
  valueColor = "text-gray-900",
}: KpiCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className={`mt-3 text-3xl font-bold ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}