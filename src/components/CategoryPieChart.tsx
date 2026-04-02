"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/models/Transaction";

type Props = {
  transactions: Transaction[];
};

const COLORS = ["#4a9eb3", "#22c55e", "#f59e0b", "#ef4444", "#a78bfa"];

export default function CategoryPieChart({ transactions }: Props) {
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.isExpense()) {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="
        relative p-6 rounded-2xl
        bg-gradient-to-br from-[#1e293b] to-[#0f172a]
        border border-[#334155]
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition pointer-events-none" />

      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-1">
        Spending Breakdown
      </h2>
      <p className="text-sm text-gray-400 mb-5">
        Where your money is going
      </p>

      {/* Chart */}
      <div className="relative w-full h-[260px]">

        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No expense data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#94a3b8" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-2xl font-semibold text-white tracking-tight">
            ₹ {total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}