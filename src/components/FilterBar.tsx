"use client";

import { useFinance } from "@/context/FinanceContext";

export default function FilterBar() {
  const { filters, setFilters } = useFinance();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search category..."
        className="border p-2 rounded-lg w-full md:w-1/3"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      {/* Type Filter */}
      <select
        className="border p-2 rounded-lg"
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value as any })
        }
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}