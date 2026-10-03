export type IntelligenceMetric = {
  title: string;
  value: string;
  change: string;
  description: string;
  status: "positive" | "warning" | "neutral";
};

export const intelligenceMetrics: IntelligenceMetric[] = [
  {
    title: "Company Health",
    value: "87%",
    change: "+4%",
    description: "Improved from the previous reporting period",
    status: "positive",
  },
  {
    title: "Employee Performance",
    value: "91%",
    change: "+3%",
    description: "Organization-wide performance indicator",
    status: "positive",
  },
  {
    title: "Operational Risk",
    value: "68",
    change: "+7%",
    description: "Current aggregated operational risk",
    status: "warning",
  },
  {
    title: "Active Signals",
    value: "24",
    change: "Stable",
    description: "Signals currently being monitored",
    status: "neutral",
  },
];