"use client";

import { Transaction } from "@/models/Transaction";

type Props = {
  transactions: Transaction[];
};

export default function ForecastCard({ transactions }: Props) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  let currentSpend = 0;
  let lastSpend = 0;

  transactions.forEach((t) => {
    if (t.isExpense()) {
      const d = new Date(t.date);

      if (d.getMonth() === currentMonth) {
        currentSpend += t.amount;
      }

      if (d.getMonth() === lastMonth) {
        lastSpend += t.amount;
      }
    }
  });

  //  Simple projection (trend-based)
  let projected = currentSpend;

  if (lastSpend > 0) {
    const growth = (currentSpend - lastSpend) / lastSpend;
    projected = currentSpend * (1 + growth);
  }

  const changePercent =
    lastSpend > 0
      ? ((currentSpend - lastSpend) / lastSpend) * 100
      : 0;

  const isIncrease = changePercent >= 0;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl space-y-3 shadow-lg">
      
      <h2 className="text-sm text-gray-400">Forecast</h2>

      <div className="text-2xl font-semibold text-white">
        ₹{Math.round(projected)}
      </div>

      <div className="text-sm text-gray-400">
        Projected expenses next month
      </div>

      <div
        className={`text-sm ${
          isIncrease ? "text-red-400" : "text-green-400"
        }`}
      >
        {isIncrease ? "↑" : "↓"} {Math.abs(changePercent).toFixed(0)}% from this month
      </div>
    </div>
  );
}