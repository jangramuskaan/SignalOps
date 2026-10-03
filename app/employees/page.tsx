import { employees } from "@/data/employees";

function getRiskClasses(risk: string) {
  if (risk === "High") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (risk === "Medium") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function getStatusClasses(status: string) {
  if (status === "Active") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  return "bg-slate-100 text-slate-600 border-slate-200";
}

function getWorkloadLabel(workload: number) {
  if (workload >= 85) return "Heavy";
  if (workload >= 65) return "Moderate";
  return "Balanced";
}

function getWorkloadClasses(workload: number) {
  if (workload >= 85) {
    return "bg-red-100 text-red-700";
  }

  if (workload >= 65) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

export default function EmployeesPage() {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const highRiskEmployees = employees.filter(
    (employee) => employee.risk === "High"
  ).length;

  const averagePerformance = Math.round(
    employees.reduce((sum, employee) => sum + employee.performance, 0) /
      totalEmployees
  );

  const averageWorkload = Math.round(
    employees.reduce((sum, employee) => sum + employee.workload, 0) /
      totalEmployees
  );

  const totalTasks = employees.reduce(
    (sum, employee) => sum + employee.tasks,
    0
  );

  const completedTasks = employees.reduce(
    (sum, employee) => sum + employee.completed,
    0
  );

  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              Organization Intelligence
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Employee Intelligence
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Monitor employee performance, workload, operational risk, and
              workforce activity from one centralized view.
            </p>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
            Add Employee
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Employees
          </p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">
              {totalEmployees}
            </p>

            <span className="text-sm font-medium text-blue-600">
              Workforce
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Active Employees
          </p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">
              {activeEmployees}
            </p>

            <span className="text-sm font-medium text-emerald-600">
              Active
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Avg. Performance
          </p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">
              {averagePerformance}%
            </p>

            <span className="text-sm font-medium text-emerald-600">
              Healthy
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            High Risk
          </p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold text-red-600">
              {highRiskEmployees}
            </p>

            <span className="text-sm font-medium text-red-600">
              Attention
            </span>
          </div>
        </div>
      </section>

      {/* Workforce Overview */}
      <section className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Workforce Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current organizational workload distribution.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  Average Workload
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {averageWorkload}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${averageWorkload}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  Task Completion
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {completionRate}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Tasks
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {totalTasks}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Tasks currently assigned across the organization.
          </p>

          <div className="mt-6 rounded-lg bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-700">
              {completedTasks} tasks completed
            </p>

            <p className="mt-1 text-xs text-emerald-600">
              {completionRate}% overall completion rate
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Risk Monitoring
          </p>

          <p className="mt-3 text-3xl font-bold text-red-600">
            {highRiskEmployees}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            employees currently classified as high risk.
          </p>

          <div className="mt-6 rounded-lg bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              Review required
            </p>

            <p className="mt-1 text-xs text-red-600">
              Prioritize workload and performance review for high-risk
              employees.
            </p>
          </div>
        </div>
      </section>

      {/* Employee Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Employee Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Performance and operational status for every employee.
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
              {totalEmployees} employees
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Workload
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Performance
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tasks
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Risk
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Employee */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {employee.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {employee.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {employee.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-5 text-sm text-slate-600">
                    {employee.department}
                  </td>

                  {/* Workload */}
                  <td className="px-6 py-5">
                    <div className="w-36">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                          {employee.workload}%
                        </span>

                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-medium ${getWorkloadClasses(
                            employee.workload
                          )}`}
                        >
                          {getWorkloadLabel(employee.workload)}
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${employee.workload}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Performance */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-900">
                        {employee.performance}%
                      </span>

                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${employee.performance}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Tasks */}
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-900">
                      {employee.completed}/{employee.tasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      completed
                    </p>
                  </td>

                  {/* Risk */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getRiskClasses(
                        employee.risk
                      )}`}
                    >
                      {employee.risk}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}