import HealthGauge from "@/components/charts/HealthGauge";
import RiskChart from "@/components/charts/RiskChart";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import { recommendations } from "@/data/dashboard";
import KpiCard from "@/components/dashboard/KpiCard";
import AlertFeed from "@/components/dashboard/AlertFeed";
import HealthScore from "@/components/dashboard/HealthScore";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Organization Intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Monitor company health, workforce performance, operational
            risks, and important business signals from one place.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-muted-foreground">
            System operational
          </span>
        </div>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Organization Overview
          </h2>

          <p className="text-sm text-muted-foreground">
            Key indicators from across your organization.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Employees"
            value="182"
            subtitle="Across all teams"
          />

          <KpiCard
            title="Open Tickets"
            value="48"
            subtitle="12 created this week"
          />

          <KpiCard
            title="Overdue Tasks"
            value="23"
            subtitle="Requires attention"
            valueColor="text-red-600"
          />

          <KpiCard
            title="Company Health"
            value="87%"
            subtitle="+4% compared with last week"
            valueColor="text-green-600"
          />
        </div>
      </section>

      {/* Health + Analytics */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <HealthScore />
        </div>

        <div className="xl:col-span-1">
          <HealthGauge />
        </div>

        <div className="xl:col-span-1">
          <RiskChart />
        </div>
      </section>

      {/* Live Alerts */}
      <section>
        <AlertFeed />
      </section>

      {/* AI Recommendations */}
      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium text-blue-600">
            AI Insights
          </p>

          <h2 className="text-2xl font-bold">
            Recommendations
          </h2>

          <p className="text-sm text-muted-foreground">
            Suggested actions based on current organizational signals.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.title}
              title={recommendation.title}
              description={recommendation.description}
              priority={recommendation.priority}
            />
          ))}
        </div>
      </section>
    </div>
  );
}