"use client";

import {
  LineChart,
  Line,
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

export default function BalanceChart({ transactions }: Props) {
  let runningBalance = 0;

  const data = transactions.map((t) => {
    runningBalance += t.isIncome() ? t.amount : -t.amount;

    return {
      date: t.date.slice(5),
      balance: runningBalance,
    };
  });

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
        Balance Trend
      </h2>
      <p className="text-sm text-gray-400 mb-5">
        Track your financial growth over time
      </p>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            {/* Softer grid */}
            <CartesianGrid
              stroke="#1f2937"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="date"
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
              cursor={{ stroke: "#334155", strokeWidth: 1 }}
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#4a9eb3"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#4a9eb3",
                strokeWidth: 2,
                fill: "#020617",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}