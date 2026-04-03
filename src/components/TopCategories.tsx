"use client";

import { useFinance } from "@/context/FinanceContext";

export default function TopCategories() {
  const { transactions } = useFinance();

  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155] space-y-3">
      <h2 className="text-sm text-gray-400">Top Categories</h2>

      {sorted.slice(0, 5).map(([cat, amt]) => (
        <div
          key={cat}
          className="flex justify-between text-sm text-gray-300 bg-[#1e293b] px-3 py-2 rounded-md"
        >
          <span>{cat}</span>
          <span className="text-white">₹{amt}</span>
        </div>
      ))}
    </div>
  );
}