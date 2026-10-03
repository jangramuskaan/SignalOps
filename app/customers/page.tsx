"use client";

import { useMemo, useState } from "react";

const customers = [
  {
    name: "Acme Corporation",
    industry: "Technology",
    employees: 245,
    health: 92,
    risk: "Low",
    status: "Healthy",
    activity: "High",
  },
  {
    name: "Vertex Solutions",
    industry: "Finance",
    employees: 180,
    health: 84,
    risk: "Medium",
    status: "Stable",
    activity: "High",
  },
  {
    name: "Nova Systems",
    industry: "Healthcare",
    employees: 320,
    health: 76,
    risk: "Medium",
    status: "Monitoring",
    activity: "Medium",
  },
  {
    name: "BrightPath Labs",
    industry: "Education",
    employees: 96,
    health: 68,
    risk: "High",
    status: "Attention",
    activity: "Medium",
  },
  {
    name: "Orbit Technologies",
    industry: "Software",
    employees: 410,
    health: 95,
    risk: "Low",
    status: "Healthy",
    activity: "High",
  },
  {
    name: "GreenCore Industries",
    industry: "Manufacturing",
    employees: 275,
    health: 71,
    risk: "Medium",
    status: "Monitoring",
    activity: "Low",
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.industry.toLowerCase().includes(search.toLowerCase());

      const matchesRisk =
        riskFilter === "All" || customer.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);

  const averageHealth = Math.round(
    customers.reduce((sum, customer) => sum + customer.health, 0) /
      customers.length
  );

  const highRiskCustomers = customers.filter(
    (customer) => customer.risk === "High"
  ).length;

  const totalEmployees = customers.reduce(
    (sum, customer) => sum + customer.employees,
    0
  );

  return (
    <main className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Intelligence
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Monitor customer health, operational activity, and account risk.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="mt-2 text-3xl font-bold">{customers.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Active accounts being monitored
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Average Health</p>
          <p className="mt-2 text-3xl font-bold">{averageHealth}%</p>
          <p className="mt-2 text-xs text-green-600">
            Organization health indicator
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">High Risk</p>
          <p className="mt-2 text-3xl font-bold">{highRiskCustomers}</p>
          <p className="mt-2 text-xs text-red-600">
            Accounts requiring attention
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Employees Covered</p>
          <p className="mt-2 text-3xl font-bold">
            {totalEmployees.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Across monitored customers
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Customer Accounts</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and filter customer intelligence data.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm outline-none transition focus:border-blue-500 sm:w-64"
            />

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-sm">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Industry</th>
                <th className="px-6 py-4 font-semibold">Employees</th>
                <th className="px-6 py-4 font-semibold">Health</th>
                <th className="px-6 py-4 font-semibold">Risk</th>
                <th className="px-6 py-4 font-semibold">Activity</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.name}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Customer account
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {customer.industry}
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {customer.employees}
                  </td>

                  <td className="px-6 py-5">
                    <div className="w-32">
                      <div className="mb-2 flex justify-between text-xs">
                        <span>{customer.health}%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${customer.health}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        customer.risk === "Low"
                          ? "bg-green-100 text-green-700"
                          : customer.risk === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.risk}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {customer.activity}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-10 text-center">
            <p className="font-medium">No customers found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or risk filter.
            </p>
          </div>
        )}
      </div>

      {/* Intelligence Section */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Customer Intelligence</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Key signals detected across the customer portfolio.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Portfolio Health</p>
            <p className="mt-2 text-2xl font-bold">{averageHealth}%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Average customer health score
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Risk Monitoring</p>
            <p className="mt-2 text-2xl font-bold">
              {highRiskCustomers} account
              {highRiskCustomers !== 1 ? "s" : ""}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Currently flagged for attention
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Coverage</p>
            <p className="mt-2 text-2xl font-bold">
              {totalEmployees.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Employees represented across accounts
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}