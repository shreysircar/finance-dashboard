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
    <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="pb-3">Date</th>
            <th className="pb-3">Category</th>
            <th className="pb-3">Type</th>
            <th className="pb-3">Amount</th>
            {role === "admin" && <th className="pb-3">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id} className="border-b last:border-none">
              <td className="py-3">{t.date}</td>
              <td className="py-3">{t.category}</td>
              <td className="py-3 capitalize">{t.type}</td>
              <td className="py-3">₹ {t.amount}</td>

              {role === "admin" && (
                <td className="py-3">
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No transactions found
        </p>
      )}
    </div>
  );
}