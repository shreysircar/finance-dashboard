"use client";

import { useFinance } from "@/context/FinanceContext";

export default function TransactionTable() {
  const { transactions, deleteTransaction, role, filters } = useFinance();

  const filteredTransactions = transactions.filter((t) => {
    const matchesType =
      filters.type === "all" || t.type === filters.type;

    const matchesSearch = t.category
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-3">
      {filteredTransactions.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between bg-[#111827] p-4 rounded-xl hover:bg-[#1f2937] transition"
        >
          {/* Left Section */}
          <div className="flex flex-col">
            <span className="text-white font-medium">
              {t.category}
            </span>
            <span className="text-sm text-gray-400">
              {t.date}
            </span>
          </div>

          {/* Middle Section */}
          <div className="text-sm text-gray-400 capitalize">
            {t.type}
          </div>

          {/* Amount */}
          <div
            className={`font-semibold ${
              t.type === "income"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {t.type === "income" ? "+" : "-"} ₹{t.amount}
          </div>

          {/* Actions */}
          {role === "admin" && (
            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No transactions found
        </div>
      )}
    </div>
  );
}