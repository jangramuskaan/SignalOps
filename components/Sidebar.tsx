"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Map,
  Settings,
  ShieldAlert,
  Upload,
  Users,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Building2,
  },
  {
    label: "Intelligence",
    href: "/intelligence",
    icon: Activity,
  },
  {
    label: "Recommendations",
    href: "/recommendations",
    icon: Lightbulb,
  },
  {
    label: "Risk Map",
    href: "/risk-map",
    icon: Map,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Upload Center",
    href: "/upload",
    icon: Upload,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <ShieldAlert size={20} />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">SignalOps</p>
            <p className="text-[11px] text-slate-500">
              Company Intelligence
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className={
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-700"
                }
              />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Settings size={18} strokeWidth={1.8} />
          Settings
        </Link>

        <div className="mt-3 rounded-xl bg-slate-900 p-4 text-white">
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 size={16} />
            <span className="text-xs font-semibold">
              Intelligence Status
            </span>
          </div>

          <p className="text-2xl font-bold">87%</p>

          <p className="mt-1 text-[11px] text-slate-400">
            Organization health score
          </p>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: "87%" }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}