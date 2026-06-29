"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";

import {
  LayoutDashboard,
  ShieldAlert,
  Upload,
  Users,
  User,
  Headphones,
  Brain,
  FileText,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Risk Map",
    href: "/risk-map",
    icon: ShieldAlert,
  },
  {
    title: "Upload Center",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Team Intelligence",
    href: "/intelligence",
    icon: Users,
  },
  {
    title: "Employee Workload",
    href: "/employees",
    icon: User,
  },
  {
    title: "Customer Risk",
    href: "/customers",
    icon: Headphones,
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    icon: Brain,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r bg-white p-6">
      <Logo />

      <nav className="mt-10 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all

              ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }
            `}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}