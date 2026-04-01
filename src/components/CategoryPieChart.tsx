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

// 🎨 Better dark-friendly colors
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
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md border border-[#334155]">
      
      <h2 className="text-lg font-semibold text-white mb-1">
        Spending Breakdown
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Where your money is going
      </p>

      <div className="relative w-full h-[260px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}   // 🍩 donut
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* 🎯 Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-xl font-bold text-white">
            ₹ {total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}