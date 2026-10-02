import { teams, teamSignals } from "@/data/intelligence"

function getStatusClasses(status: string) {
  if (status === "At Risk") {
    return "border-red-200 bg-red-50 text-red-700"
  }

  if (status === "Watch") {
    return "border-amber-200 bg-amber-50 text-amber-700"
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700"
}

function getHealthBarClasses(health: number) {
  if (health < 75) {
    return "bg-red-500"
  }

  if (health < 85) {
    return "bg-amber-500"
  }

  return "bg-emerald-500"
}

export default function IntelligencePage() {
  const totalMembers = teams.reduce(
    (total, team) => total + team.members,
    0
  )

  const averagePerformance = Math.round(
    teams.reduce((total, team) => total + team.performance, 0) /
      teams.length
  )

  const averageWorkload = Math.round(
    teams.reduce((total, team) => total + team.workload, 0) /
      teams.length
  )

  const teamsNeedingAttention = teams.filter(
    (team) => team.status !== "Healthy"
  ).length

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          Organization Intelligence
        </p>

        <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Team Intelligence
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Understand team health, workload distribution, performance
              trends, and operational signals across the organization.
            </p>
          </div>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
            Export Intelligence
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Teams</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {teams.length}
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            Across all departments
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Team Members</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalMembers}
          </p>

          <p className="mt-1 text-xs text-blue-600">
            Active organization capacity
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Avg. Performance</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {averagePerformance}%
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            Organization average
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Teams to Watch</p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {teamsNeedingAttention}
          </p>

          <p className="mt-1 text-xs text-red-600">
            Require management review
          </p>
        </div>
      </div>

      {/* Organization Health */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Team Health Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current health and operational capacity by team.
            </p>
          </div>

          <div className="space-y-6">
            {teams.map((team) => (
              <div key={team.id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {team.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {team.members} members · {team.department}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      team.status
                    )}`}
                  >
                    {team.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${getHealthBarClasses(
                        team.health
                      )}`}
                      style={{
                        width: `${team.health}%`,
                      }}
                    />
                  </div>

                  <span className="w-10 text-right text-sm font-semibold text-slate-700">
                    {team.health}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capacity Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Capacity Signal
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Organization-wide workload level.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-blue-100">
              <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-blue-600 border-r-blue-600" />

              <div className="text-center">
                <p className="text-4xl font-bold text-slate-900">
                  {averageWorkload}%
                </p>

                <p className="text-xs text-slate-500">
                  Avg. workload
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Healthy range</span>
              <span className="font-medium text-emerald-600">
                60–80%
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Current signal</span>
              <span className="font-medium text-amber-600">
                Elevated
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Comparison */}
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Team Performance Matrix
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare performance and workload across organizational teams.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Team</th>
                <th className="px-6 py-4">Members</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4">Workload</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {team.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {team.department}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {team.members}
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {team.performance}%
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${team.workload}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm text-slate-600">
                        {team.workload}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {team.health}%
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                        team.status
                      )}`}
                    >
                      {team.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intelligence Signals */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Intelligence Signals
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Important organizational signals requiring attention.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {teamSignals.map((signal) => (
            <div
              key={signal.title}
              className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex gap-4">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  !
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">
                    {signal.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {signal.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-13 md:pl-0">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {signal.type}
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                    signal.severity === "High"
                      ? "At Risk"
                      : "Watch"
                  )}`}
                >
                  {signal.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}