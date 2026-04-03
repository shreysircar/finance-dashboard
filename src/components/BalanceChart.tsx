"use client";

import { useState } from "react";
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

type Mode = "monthly" | "yearly";

type Props = {
  transactions: Transaction[];
};

export default function BalanceChart({ transactions }: Props) {
  const [mode, setMode] = useState<Mode>("monthly");

  //  1. sort transactions
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  //  2. group data
  const grouped: Record<string, number> = {};

  sorted.forEach((t) => {
    const d = new Date(t.date);

    const key =
      mode === "monthly"
        ? `${d.getFullYear()}-${d.getMonth()}`
        : `${d.getFullYear()}`;

    const value = t.isIncome() ? t.amount : -t.amount;
    grouped[key] = (grouped[key] || 0) + value;
  });

  //  3. build final data (with gap filling for monthly)
  const sortedKeys = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b)
  );

  const result: { date: string; balance: number }[] = [];
  let runningBalance = 0;

  if (sortedKeys.length > 0) {
    if (mode === "monthly") {
      let [startYear, startMonth] = sortedKeys[0].split("-").map(Number);
      let [endYear, endMonth] = sortedKeys[sortedKeys.length - 1]
        .split("-")
        .map(Number);

      let currentYear = startYear;
      let currentMonth = startMonth;

      while (
        currentYear < endYear ||
        (currentYear === endYear && currentMonth <= endMonth)
      ) {
        const key = `${currentYear}-${currentMonth}`;

        if (grouped[key]) {
          runningBalance += grouped[key];
        }

        result.push({
          date: key,
          balance: runningBalance,
        });

        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
    } else {
      // yearly mode
      sortedKeys.forEach((key) => {
        runningBalance += grouped[key];

        result.push({
          date: key,
          balance: runningBalance,
        });
      });
    }
  }

  const data = result;

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

      {/* Header + Toggle */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Balance Trend
          </h2>
          <p className="text-sm text-gray-400">
            Track your financial growth over time
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-[#020617] border border-[#334155] rounded-lg overflow-hidden text-sm">
          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 ${
              mode === "monthly"
                ? "bg-[#4a9eb3] text-white"
                : "text-gray-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setMode("yearly")}
            className={`px-3 py-1 ${
              mode === "yearly"
                ? "bg-[#4a9eb3] text-white"
                : "text-gray-400"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
              tickFormatter={(value) => {
                if (mode === "monthly") {
                  const [year, month] = value.split("-");
                  return `${Number(month) + 1}/${year.slice(2)}`;
                }
                return value;
              }}
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