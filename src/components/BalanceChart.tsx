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
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md border border-[#334155]">
      
      <h2 className="text-lg font-semibold text-white mb-1">
        Balance Trend
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Track your financial growth over time
      </p>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          
          {/* Grid */}
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

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

          {/* Line */}
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#4a9eb3"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}