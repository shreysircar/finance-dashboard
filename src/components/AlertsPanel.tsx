"use client";

import { AlertTriangle } from "lucide-react";
import { Transaction } from "@/models/Transaction";

type Props = {
  transactions: Transaction[];
  budgets?: Record<string, number>; // optional (from localStorage)
};

export default function AlertsPanel({ transactions, budgets = {} }: Props) {
  const alerts: string[] = [];

  // 1. Budget Overspending
  const categorySpend: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.isExpense()) {
      categorySpend[t.category] =
        (categorySpend[t.category] || 0) + t.amount;
    }
  });

  Object.keys(categorySpend).forEach((cat) => {
    const spent = categorySpend[cat];
    const limit = budgets[cat];

    if (limit && spent > limit) {
      alerts.push(`You exceeded your ${cat} budget`);
    }
  });

  //  2. Spending Increase (this month vs last month)
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  let currentSpend = 0;
  let lastSpend = 0;

  transactions.forEach((t) => {
    if (t.isExpense()) {
      const d = new Date(t.date);
      if (d.getMonth() === currentMonth) currentSpend += t.amount;
      if (d.getMonth() === lastMonth) lastSpend += t.amount;
    }
  });

  if (lastSpend > 0) {
    const increase = ((currentSpend - lastSpend) / lastSpend) * 100;
    if (increase > 10) {
      alerts.push(`Spending increased by ${increase.toFixed(0)}% this month`);
    }
  }

  //  3. Savings Rate Drop
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  if (income > 0) {
    const savingsRate = ((income - expense) / income) * 100;
    if (savingsRate < 20) {
      alerts.push("Savings rate dropped below 20%");
    }
  }

  return (
    <div className="bg-red-500/5 backdrop-blur-md border border-red-500/20 p-5 rounded-2xl space-y-3 shadow-lg">
      <h2 className="text-sm text-red-400 flex items-center gap-2 font-medium">
        <AlertTriangle size={16} />
        Alerts & Warnings
      </h2>

      {alerts.length === 0 ? (
        <p className="text-xs text-gray-400">
          No alerts — you're doing great 👍
        </p>
      ) : (
        alerts.map((alert, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 px-3 py-2 rounded-md border border-red-500/10"
          >
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <span>{alert}</span>
          </div>
        ))
      )}
    </div>
  );
}