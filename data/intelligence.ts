export type Team = {
  id: number
  name: string
  department: string
  members: number
  performance: number
  workload: number
  health: number
  status: "Healthy" | "Watch" | "At Risk"
}

export const teams: Team[] = [
  {
    id: 1,
    name: "Engineering",
    department: "Technology",
    members: 42,
    performance: 91,
    workload: 82,
    health: 88,
    status: "Healthy",
  },
  {
    id: 2,
    name: "Product",
    department: "Product & Strategy",
    members: 18,
    performance: 94,
    workload: 68,
    health: 92,
    status: "Healthy",
  },
  {
    id: 3,
    name: "Customer Support",
    department: "Operations",
    members: 31,
    performance: 84,
    workload: 86,
    health: 76,
    status: "Watch",
  },
  {
    id: 4,
    name: "Sales",
    department: "Revenue",
    members: 24,
    performance: 87,
    workload: 72,
    health: 81,
    status: "Healthy",
  },
  {
    id: 5,
    name: "Human Resources",
    department: "People",
    members: 12,
    performance: 89,
    workload: 54,
    health: 94,
    status: "Healthy",
  },
  {
    id: 6,
    name: "Marketing",
    department: "Growth",
    members: 16,
    performance: 79,
    workload: 78,
    health: 71,
    status: "At Risk",
  },
]

export const teamSignals = [
  {
    title: "Engineering workload increasing",
    description:
      "Engineering workload has remained above 80% for the current reporting period.",
    type: "Workload",
    severity: "High",
  },
  {
    title: "Support capacity under pressure",
    description:
      "Customer Support is approaching its workload threshold while ticket volume continues to rise.",
    type: "Capacity",
    severity: "Medium",
  },
  {
    title: "Marketing performance declining",
    description:
      "Marketing performance is below the organization average and requires further review.",
    type: "Performance",
    severity: "Medium",
  },
]