"use client";

import { useRole } from "@/context/RoleContext";

export default function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center bg-[#020617] border border-[#334155] rounded-xl p-1">

      {/* Viewer */}
      <button
        onClick={() => setRole("viewer")}
        className={`
          px-3 py-1.5 text-sm rounded-lg transition-all
          ${role === "viewer"
            ? "bg-gray-600/20 text-gray-200"
            : "text-gray-400 hover:text-gray-200"}
        `}
      >
     Viewer
      </button>

      {/* Admin */}
      <button
        onClick={() => setRole("admin")}
        className={`
          px-3 py-1.5 text-sm rounded-lg transition-all
          ${role === "admin"
            ? "bg-[#4a9eb3]/20 text-[#4a9eb3]"
            : "text-gray-400 hover:text-[#4a9eb3]"}
        `}
      >
     Admin
      </button>
    </div>
  );
}