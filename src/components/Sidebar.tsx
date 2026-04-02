"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  { name: "Insights", href: "/insights" },
];

export default function Sidebar() {
  const pathname = usePathname();

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

          return (
<Link
  key={link.href}
  href={link.href}
  className={`
    relative px-4 py-2.5 rounded-xl text-sm
    transition-all duration-200 ease-out
    ${
      isActive
        ? "bg-[#4a9eb3]/15 text-[#4a9eb3]"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }
  `}
>
  {link.name}
</Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500">
        © 2026 Finance App
      </div>
    </div>
  );
}