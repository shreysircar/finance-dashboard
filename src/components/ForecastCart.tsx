"use client";

export default function ForecastCard() {
  return (
    <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155] space-y-3">
      <h2 className="text-sm text-gray-400">Forecast</h2>

      <div className="text-2xl font-semibold text-white">
        ₹45,000
      </div>

      <div className="text-sm text-gray-400">
        Projected expenses next month
      </div>

      <div className="text-sm text-red-400">
        ↑ 8% from this month
      </div>
    </div>
  );
}