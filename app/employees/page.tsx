import { employees } from "@/data/employees"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

function getRiskClasses(risk: string) {
  if (risk === "High") {
    return "bg-red-50 text-red-700 border-red-200"
  }

  if (risk === "Medium") {
    return "bg-amber-50 text-amber-700 border-amber-200"
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200"
}

export default function EmployeesPage() {
  const totalEmployees = employees.length

  const averagePerformance = Math.round(
    employees.reduce((sum, employee) => sum + employee.performance, 0) /
      totalEmployees
  )

  const averageWorkload = Math.round(
    employees.reduce((sum, employee) => sum + employee.workload, 0) /
      totalEmployees
  )

  const highRiskEmployees = employees.filter(
    (employee) => employee.risk === "High"
  ).length

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Team Intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Employee Intelligence
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor employee workload, performance, and organizational risk.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          + Add Employee
        </button>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Employees</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">
              {totalEmployees}
            </p>

            <span className="text-sm font-medium text-emerald-600">
              +8.4%
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active Employees</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">
              {activeEmployees}
            </p>

            <span className="text-sm font-medium text-blue-600">
              Active
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Avg. Performance</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-bold text-slate-900">
              {averagePerformance}%
            </p>

            <span className="text-sm font-medium text-emerald-600">
              Healthy
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">High Risk</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-bold text-red-600">
              {highRiskEmployees}
            </p>

            <span className="text-sm font-medium text-red-600">
              Attention
            </span>
          </div>
        </div>
      </div>

      {/* Workload Overview */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Workforce Overview
            </h2>

            <p className="text-sm text-slate-500">
              Current organization-wide workload distribution.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
            Average workload:{" "}
            <span className="font-semibold text-slate-900">
              {averageWorkload}%
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Low Workload</p>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: "28%" }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Employees operating below 60%
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Healthy Workload</p>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: "54%" }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Employees between 60–80%
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Overloaded</p>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: "18%" }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Employees above 80%
            </p>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Employee Directory
              </h2>

              <p className="text-sm text-slate-500">
                Review individual employee intelligence signals.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Workload</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4">Tasks</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {getInitials(employee.name)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {employee.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {employee.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.department}
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-slate-500">
                          Workload
                        </span>

                        <span className="font-medium text-slate-700">
                          {employee.workload}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            employee.workload > 80
                              ? "bg-red-500"
                              : employee.workload > 60
                                ? "bg-blue-500"
                                : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${employee.workload}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {employee.performance}%
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.completed}/{employee.tasks}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getRiskClasses(
                        employee.risk
                      )}`}
                    >
                      {employee.risk}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          employee.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />

                      {employee.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}