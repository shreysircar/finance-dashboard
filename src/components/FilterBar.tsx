"use client";

import { useFinance } from "@/context/FinanceContext";

export default function FilterBar() {
  const { filters, setFilters } = useFinance();

  const types = ["all", "income", "expense"];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search category..."
        className="bg-[#111827] text-white px-4 py-2 rounded-xl outline-none border border-gray-700 focus:border-[#4a9eb3] transition w-full md:w-1/3"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      {/* 🔥 Filter Chips */}
      <div className="flex gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() =>
              setFilters({ ...filters, type: type as any })
            }
            className={`px-4 py-2 rounded-xl text-sm capitalize transition
              ${
                filters.type === type
                  ? "bg-[#4a9eb3] text-white"
                  : "bg-[#111827] text-gray-400 hover:bg-[#1f2937]"
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}