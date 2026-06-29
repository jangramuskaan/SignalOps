import HealthScore from "@/components/dashboard/HealthScore";
import KpiCard from "@/components/dashboard/KpiCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <HealthScore />

      <div className="grid grid-cols-4 gap-6">
        <KpiCard
          title="Company Health"
          value="87%"
          valueColor="text-green-600"
        />

        <KpiCard
          title="Employees"
          value="182"
        />

        <KpiCard
          title="Open Tickets"
          value="48"
        />

        <KpiCard
          title="Overdue Tasks"
          value="23"
          valueColor="text-red-600"
        />
      </div>

    </div>
  );
}