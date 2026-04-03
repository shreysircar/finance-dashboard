"use client";

import { useFinance } from "@/context/FinanceContext";
import { useRole } from "@/context/RoleContext";
import { Transaction } from "@/models/Transaction";

export default function TransactionTable({
  onEdit,
}: {
  onEdit?: (t: Transaction) => void;
}) {
  const { transactions, deleteTransaction, filters } = useFinance();
  const { role } = useRole(); // ✅ FIXED

  const filteredTransactions = transactions.filter((t) => {
    const matchesType =
      filters.type === "all" || t.type === filters.type;

    const matchesSearch = t.category
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-2">

      {/* Header */}
      <div
        className={`grid px-5 py-2 text-xs text-gray-500 uppercase tracking-wide
        ${role === "viewer"
          ? "grid-cols-[1.5fr_1.2fr_1fr_1fr]"
          : "grid-cols-[1.5fr_1fr_1fr_1fr_auto]"
        }`}
      >
        {role === "viewer" && <span>Title</span>}
        <span>Category</span>
        <span>Type</span>
        <span className="text-right">Amount</span>
        {role === "admin" && <span className="text-right">Actions</span>}
      </div>

      {/* Rows */}
      {filteredTransactions.map((t) => (
        <div
          key={t.id}
          className={`group grid items-center
          ${role === "viewer"
            ? "grid-cols-[1.5fr_1.2fr_1fr_1fr]"
            : "grid-cols-[1.5fr_1fr_1fr_1fr_auto]"
          }
          bg-[#0b1220]
          px-5 py-3
          rounded-xl
          border border-transparent
          hover:border-white/10 hover:bg-[#111827]
          transition-all duration-200`}
        >

          {/* Title */}
          {role === "viewer" && (
            <div className="text-sm text-white font-medium truncate">
              {t.title}
            </div>
          )}

          {/* Category + Date */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-white">
              {t.category}
            </span>
            <span className="text-xs text-gray-500">
              {t.date}
            </span>
          </div>

          {/* Type */}
          <div
            className={`text-xs px-2 py-1 rounded-md w-fit capitalize
            ${
              t.type === "income"
                ? "bg-green-400/10 text-green-400"
                : "bg-red-400/10 text-red-400"
            }`}
          >
            {t.type}
          </div>

          {/* Amount */}
          <div
            className={`text-sm font-semibold text-right ${
              t.type === "income"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {t.type === "income" ? "+" : "-"} ₹{t.amount}
          </div>

          {/* Actions */}
          {role === "admin" && (
            <div className="flex justify-end gap-2 text-xs opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => onEdit?.(t)}
                className="px-2 py-1 rounded-md text-blue-400 hover:bg-blue-400/10"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTransaction(t.id)}
                className="px-2 py-1 rounded-md text-red-400 hover:bg-red-400/10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Empty */}
      {filteredTransactions.length === 0 && (
        <div className="text-center text-gray-500 py-12 text-sm">
          No transactions found
        </div>
      )}
    </div>
  );
}