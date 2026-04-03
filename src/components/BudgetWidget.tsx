"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/models/Transaction";
import { useRouter } from "next/navigation";

type Props = {
  transactions?: Transaction[];
  role: "viewer" | "admin";
};

type BudgetMap = Record<string, number>;

export default function BudgetWidget({ transactions }: Props) {
  const router = useRouter();
  const [budgetLimits, setBudgetLimits] = useState<BudgetMap>({});

  useEffect(() => {
    const stored = localStorage.getItem("budgets");
    if (stored) setBudgetLimits(JSON.parse(stored));
  }, []);

  const safeTransactions = transactions ?? [];

  const spendingMap: Record<string, number> = {};

  safeTransactions.forEach((t) => {
    if (t.isExpense()) {
      spendingMap[t.category] =
        (spendingMap[t.category] || 0) + t.amount;
    }
  });

  const budgets = Object.keys(spendingMap).map((category) => {
    const spent = spendingMap[category];
    const limit = budgetLimits[category] || 0;
    const percent = limit > 0 ? spent / limit : 0;

    return { category, spent, limit, percent };
  });

  const topBudgets = budgets
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  return (
    <div
      className="
      bg-white/5 backdrop-blur-md border border-white/10
      rounded-2xl shadow-lg
      p-5 h-[220px] w-full
      flex flex-col justify-between
      transition-all duration-300 hover:shadow-xl
    "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm text-gray-300 font-medium">
          Budgets
        </h2>
        <button
          onClick={() => router.push("/budgets")}
          className="text-xs text-[#4a9eb3] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 flex-1">
        {topBudgets.length === 0 ? (
          <p className="text-xs text-gray-500">
            No budget data
          </p>
        ) : (
          topBudgets.map((b) => {
            const percent = Math.min(b.percent * 100, 100);
            const isOver = b.limit > 0 && b.spent > b.limit;

            return (
              <div key={b.category} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">
                    {b.category}
                  </span>
                  <span
                    className={
                      isOver
                        ? "text-red-400"
                        : "text-gray-400"
                    }
                  >
                    ₹{b.spent} / ₹{b.limit || "-"}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isOver
                        ? "bg-red-500"
                        : "bg-[#4a9eb3]"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}