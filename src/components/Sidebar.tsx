"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, BarChart3, LucideMonitorCheck } from "lucide-react";
import { useRole } from "@/context/RoleContext";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Insights", href: "/insights", icon: BarChart3 },
  { name: "Budget", href: "/budgets", icon: LucideMonitorCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useRole();

  return (
    <div
      className="
        w-64 h-screen sticky top-0
        bg-[#020617]/95
        backdrop-blur-xl
        border-r border-white/5
        text-gray-300
        px-5 py-6 flex flex-col
      "
    >
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold text-white tracking-tight">
          Finance
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your money
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative flex items-center gap-3
                px-4 py-2.5 rounded-lg text-sm
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {/* Active left bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-[#4a9eb3] rounded-r-full" />
              )}

              <Icon size={18} strokeWidth={2} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 🔥 Translucent Toggle */}
      <div className="mt-8">
        <p className="text-xs text-gray-500 mb-3">Mode</p>

        <div
          className="
            relative w-full h-9 rounded-full
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-1
          "
        >
          {/* Sliding pill */}
          <div
            className={`
              absolute top-1 bottom-1 w-1/2 rounded-full
              bg-[#4a9eb3]/80 backdrop-blur-md
              transition-all duration-300
              ${role === "admin" ? "left-1/2" : "left-1"}
            `}
          />

          {/* Labels */}
          <div className="relative flex h-full text-xs font-medium">
            <button
              onClick={() => setRole("viewer")}
              className={`flex-1 z-10 transition ${
                role === "viewer" ? "text-white" : "text-gray-400"
              }`}
            >
              Viewer
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`flex-1 z-10 transition ${
                role === "admin" ? "text-white" : "text-gray-400"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500 pt-4 border-t border-white/5">
        © 2026 Finance Dashboard By Shrey
      </div>
    </div>
  );
}