"use client";

import { useEffect, useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { useRole } from "@/context/RoleContext";

type BudgetMap = Record<string, number>;

export default function BudgetsPage() {
  const { transactions } = useFinance();
  const { role } = useRole();

  const [budgetLimits, setBudgetLimits] = useState<BudgetMap>({});
  const [tempValues, setTempValues] = useState<BudgetMap>({});

  // 🔹 Load budgets
  useEffect(() => {
    const stored = localStorage.getItem("budgets");
    if (stored) {
      const parsed = JSON.parse(stored);
      setBudgetLimits(parsed);
      setTempValues(parsed);
    }
  }, []);

  // 🔹 Save budgets
  const handleSave = () => {
    setBudgetLimits(tempValues);
    localStorage.setItem("budgets", JSON.stringify(tempValues));
  };

  // 🔹 Calculate spending
  const spendingMap: Record<string, number> = {};

  (transactions || []).forEach((t) => {
    if (t.isExpense()) {
      spendingMap[t.category] =
        (spendingMap[t.category] || 0) + t.amount;
    }
  });

  const categories = Object.keys(spendingMap);

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Budgets
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Control and optimize your spending
          </p>
        </div>

        {role === "viewer" && (
          <button
            onClick={handleSave}
            className="
              px-4 py-2 text-sm rounded-xl
              bg-[#4a9eb3] text-black
              hover:opacity-90 transition
              shadow-md hover:shadow-lg
            "
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const spent = spendingMap[cat];
          const limit = budgetLimits[cat] || 0;

          const percent =
            limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

          const isOver = limit > 0 && spent > limit;
          const isNear = percent > 70 && percent <= 100;

          return (
            <div
              key={cat}
              className="
                relative p-5 rounded-2xl
                bg-gradient-to-br from-[#1e293b] to-[#0f172a]
                border border-[#334155]
                shadow-md hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1

                h-[220px] w-full flex flex-col justify-between
              "
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition pointer-events-none" />

              {/* Top Row */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">{cat}</h3>

                {/* Status dot */}
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOver
                      ? "bg-red-500"
                      : isNear
                      ? "bg-yellow-400"
                      : "bg-[#4a9eb3]"
                  }`}
                />
              </div>

              {/* Numbers */}
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-400">Spent</span>
                <span className="text-gray-300">₹{spent}</span>
              </div>

              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-400">Limit</span>

                {role === "viewer" ? (
                  <input
                    type="number"
                    value={tempValues[cat] || ""}
                    onChange={(e) =>
                      setTempValues((prev) => ({
                        ...prev,
                        [cat]: Number(e.target.value),
                      }))
                    }
                    className="
                      w-24 px-2 py-1 text-sm rounded-md
                      bg-[#020617] border border-[#334155]
                      text-white outline-none
                      focus:border-[#4a9eb3]
                    "
                  />
                ) : (
                  <span className="text-gray-300">
                    ₹{limit || "-"}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-[#1e293b] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isOver
                        ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                        : isNear
                        ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                        : "bg-[#4a9eb3] shadow-[0_0_8px_rgba(74,158,179,0.4)]"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>{percent.toFixed(0)}%</span>
                  <span>
                    ₹{limit > 0 ? limit - spent : 0} left
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}