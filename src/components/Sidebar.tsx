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
    <div className="w-64 h-screen bg-gray-950 text-gray-300 p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white mb-10">
        💰 Finance
      </h1>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-sm text-gray-500">
        © 2026
      </div>
    </div>
  );
}