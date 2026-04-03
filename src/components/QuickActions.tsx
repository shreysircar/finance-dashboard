"use client";

import { Plus, Pencil, BarChart3 } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      
      {/* Add Transaction */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#025a6a] hover:bg-[#037387] text-white text-sm font-medium transition">
        <Plus size={16} />
        Add Transaction
      </button>

      {/* Edit */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-gray-200 text-sm transition">
        <Pencil size={16} />
        Edit Recent
      </button>

      {/* Report */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-gray-200 text-sm transition">
        <BarChart3 size={16} />
        Generate Report
      </button>

    </div>
  );
}