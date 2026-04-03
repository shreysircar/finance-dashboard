"use client";

import { useState, useEffect } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction } from "@/models/Transaction";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  existing?: Transaction | null;
};

export default function TransactionModal({
  isOpen,
  onClose,
  existing,
}: Props) {
  const { addTransaction, updateTransaction } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    type: "expense" as "income" | "expense", // ✅ ADD THIS
  });

useEffect(() => {
  if (existing) {
    setForm({
      title: existing.title || "",
      amount: existing.amount?.toString() || "",
      category: existing.category || "",
      date: existing.date || "",
      type: existing.type || "expense",
    });
  } else {
    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      type: "expense",
    });
  }
}, [existing]);

  if (!isOpen) return null;

 const handleSubmit = () => {
  if (!form.title || !form.amount) return;

  const tx = new Transaction({
    id: existing ? existing.id : crypto.randomUUID(),
    title: form.title,
    amount: Number(form.amount),
    category: form.category,
    date: form.date,
    type: form.type,
  });

  if (existing) {
    updateTransaction(tx);
  } else {
    addTransaction(tx);
  }

  onClose();

  onClose();

setForm({
  title: "",
  amount: "",
  category: "",
  date: "",
  type: "expense",
});
};
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-md border border-[#334155] space-y-4">
        <h2 className="text-lg font-semibold text-white">
          {existing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <input
          className="w-full p-2 bg-[#020617] border border-[#334155] rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
<select
  className="w-full p-2 bg-[#020617] border border-[#334155] rounded text-white"
  value={form.type}
  onChange={(e) =>
    setForm({ ...form, type: e.target.value as "income" | "expense" })
  }
>
  <option value="expense">Expense</option>
  <option value="income">Income</option>
</select>
        <input
          type="number"
          className="w-full p-2 bg-[#020617] border border-[#334155] rounded"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          className="w-full p-2 bg-[#020617] border border-[#334155] rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-2 bg-[#020617] border border-[#334155] rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#4a9eb3] px-4 py-2 rounded text-white"
          >
            {existing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}