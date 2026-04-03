"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Transaction } from "@/models/Transaction";

type Props = {
  transactions: Transaction[];
};

export default function CategoryBarChart({ transactions }: Props) {
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.isExpense()) {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    category: key,
    amount: categoryMap[key],
  }));

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
      {/* glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition pointer-events-none" />

      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-1">
        Category Spending
      </h2>
      <p className="text-sm text-gray-400 mb-5">
        Where your money is going
      </p>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/*  PATTERN DEF (pencil shading) */}
            <defs>
              <pattern
                id="pencilPattern"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
              >
                <path
                  d="M0 6L6 0"
                  stroke="#4a9eb3"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <CartesianGrid
              stroke="#1f2937"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="category"
              stroke="#64748b"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "#94a3b8" }}
              cursor={{ fill: "rgba(71,85,105,0.2)" }}
            />

            <Bar
              dataKey="amount"
              fill="url(#pencilPattern)" //  default shaded
              radius={[6, 6, 0, 0]}
              activeBar={{
                fill: "#4a9eb3", //  solid on hover
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}