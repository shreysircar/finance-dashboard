"use client";
import { Sector } from "recharts";
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

const getDistinctColor = (index: number) => {
  const hue = (index * 137.508) % 360; // golden angle
  return `hsl(${hue}, 70%, 55%)`;
};

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
      fill={getDistinctColor(index)}
      style={{
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      className="hover:opacity-60"
    />
  ))}
</Pie>

  {/*  Custom Tooltip */}
  <Tooltip
    cursor={{ fill: "transparent" }} // remove hover overlay
    wrapperStyle={{
      outline: "none",
      pointerEvents: "none",
    }}
    content={({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];

    const name = item?.name ?? "Unknown";
    const value =
      typeof item?.value === "number" ? item.value : 0;

    return (
      <div
        className="
          backdrop-blur-md
          bg-[#020617]/80
          border border-white/10
          rounded-xl
          px-3 py-2
          shadow-lg
          text-xs
        "
      >
        <p className="text-gray-400">{name}</p>
        <p className="text-white font-medium">
          ₹ {value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}}
    position={{ x: 20, y: 20 }} //  FIX: keeps tooltip top-left (no overlap)
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