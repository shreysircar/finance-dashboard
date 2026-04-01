"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/models/Transaction";

type Props = {
  transactions: Transaction[];
};

export default function BalanceChart({ transactions }: Props) {
  // 🧠 Prepare cumulative balance data
  let runningBalance = 0;

  const data = transactions.map((t) => {
    runningBalance += t.isIncome() ? t.amount : -t.amount;

    return {
      date: t.date.slice(5), // MM-DD
      balance: runningBalance,
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Balance Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}