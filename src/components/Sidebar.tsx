"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, BarChart3 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Insights", href: "/insights", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useFinance();

  return (
    <div
      className="
        w-64 h-screen
        bg-gradient-to-b from-[#020617] to-[#020617]/80
        border-r border-[#1f2937]
        text-gray-300
        p-6 flex flex-col
      "
    >
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold text-white tracking-tight">
          💰 Finance
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your money
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3
                px-4 py-2.5 rounded-xl text-sm
                transition-all duration-200 ease-out
                ${
                  isActive
                    ? "bg-[#4a9eb3]/15 text-[#4a9eb3]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon size={18} strokeWidth={2} />

              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

{/* 🔥 Role Toggle */}
<div className="mt-8 mb-4">
  <p className="text-xs text-gray-500 mb-2">Mode</p>

  <div className="flex bg-[#020617] border border-[#334155] rounded-lg p-1">
    <button
      onClick={() => setRole("viewer")}
      className={`flex-1 text-xs py-1 rounded-md transition ${
        role === "viewer"
          ? "bg-[#4a9eb3] text-white"
          : "text-gray-400 hover:text-white"
      }`}
    >
      Viewer
    </button>

    <button
      onClick={() => setRole("admin")}
      className={`flex-1 text-xs py-1 rounded-md transition ${
        role === "admin"
          ? "bg-[#4a9eb3] text-white"
          : "text-gray-400 hover:text-white"
      }`}
    >
      Admin
    </button>
  </div>
</div>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500">
        © 2026 Finance App
      </div>
    </div>
  );
}