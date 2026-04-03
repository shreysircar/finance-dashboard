"use client";

import { useFinance } from "@/context/FinanceContext";
import { Trophy, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";

export default function SmartInsights() {
  const { transactions } = useFinance();

  if (!transactions.length) {
    return (
      <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155]">
        <p className="text-sm text-gray-400">No data for insights</p>
      </div>
    );
  }

  // 🔹 1. Category-wise expense
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 🔹 2. Monthly comparison
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

  let currentExpense = 0;
  let lastExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const date = new Date(t.date);
      if (date.getMonth() === currentMonth) {
        currentExpense += t.amount;
      } else if (date.getMonth() === lastMonth) {
        lastExpense += t.amount;
      }
    }
  });

  const change =
    lastExpense === 0
      ? 0
      : ((currentExpense - lastExpense) / lastExpense) * 100;

  const suggestion =
    topCategory && topCategory[1] > 5000
      ? `Try reducing ${topCategory[0]} spending`
      : "Your spending is well balanced";

  return (
    <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155] space-y-3">
      
      {/* Title */}
      <h2 className="text-sm text-gray-400">Smart Insights</h2>

      {/* 🥇 Top Category */}
      {topCategory && (
        <div className="flex items-start gap-2 text-sm text-gray-300 bg-[#1e293b] px-3 py-2 rounded-md">
          <Trophy size={14} className="mt-0.5 text-yellow-400 shrink-0" />
          <span>
            Highest spending:{" "}
            <span className="text-white font-medium">
              {topCategory[0]}
            </span>{" "}
            (₹{topCategory[1]})
          </span>
        </div>
      )}

      {/* 📈 Monthly Trend */}
      <div className="flex items-start gap-2 text-sm text-gray-300 bg-[#1e293b] px-3 py-2 rounded-md">
        {change >= 0 ? (
          <TrendingUp size={14} className="mt-0.5 text-red-400 shrink-0" />
        ) : (
          <TrendingDown size={14} className="mt-0.5 text-green-400 shrink-0" />
        )}

        <span>
          Expenses {change >= 0 ? "increased" : "decreased"} by{" "}
          <span
            className={
              change >= 0 ? "text-red-400" : "text-green-400"
            }
          >
            {Math.abs(change).toFixed(1)}%
          </span>{" "}
          vs last month
        </span>
      </div>

      {/* 💡 Suggestion */}
      <div className="flex items-start gap-2 text-sm text-gray-300 bg-[#1e293b] px-3 py-2 rounded-md">
        <Lightbulb size={14} className="mt-0.5 text-yellow-400 shrink-0" />
        <span>{suggestion}</span>
      </div>

    </div>
  );
}