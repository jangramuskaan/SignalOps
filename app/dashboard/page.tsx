import HealthScore from "@/components/dashboard/HealthScore";
import KpiCard from "@/components/dashboard/KpiCard";
import AlertFeed from "@/components/dashboard/AlertFeed";
<div className="grid grid-cols-2 gap-6">
  <HealthGauge />
  <RiskChart />
</div>

import HealthGauge from "@/components/charts/HealthGauge";
import RiskChart from "@/components/charts/RiskChart";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Here&apos;s an overview of your organization.
        </p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Company Health */}
        <div className="col-span-1">
          <HealthScore />
        </div>

        {/* KPI Cards */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
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

            <KpiCard
              title="Company Health"
              value="87%"
              valueColor="text-green-600"
            />
          </div>
        </div>
      </div>

      {/* Alert Feed */}
      <AlertFeed />
    </div>
  );
}