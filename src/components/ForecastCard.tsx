"use client";

import { useFinance } from "@/context/FinanceContext";

export default function ForecastCard() {
  const { transactions } = useFinance();

  // 🔹 Get last 2 months expense totals
  const monthlyMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      monthlyMap[key] = (monthlyMap[key] || 0) + t.amount;
    }
  });

  const months = Object.entries(monthlyMap).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  if (months.length < 2) {
    return (
      <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155]">
        <p className="text-sm text-gray-400">
          Not enough data for forecast
        </p>
      </div>
    );
  }

  const last = months[months.length - 1][1];
  const prev = months[months.length - 2][1];

  // 🔹 Simple projection (trend-based)
  const growthRate = prev === 0 ? 0 : (last - prev) / prev;
  const forecast = Math.round(last * (1 + growthRate));

  return (
    <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155] space-y-3">
      <h2 className="text-sm text-gray-400">Forecast</h2>

      <div className="text-2xl font-semibold text-white">
        ₹{forecast.toLocaleString()}
      </div>

      <div className="text-sm text-gray-400">
        Projected expenses next month
      </div>

      <div
        className={`text-sm ${
          growthRate >= 0 ? "text-red-400" : "text-green-400"
        }`}
      >
        {growthRate >= 0 ? "↑" : "↓"}{" "}
        {(growthRate * 100).toFixed(1)}% from last month
      </div>
    </div>
  );
}