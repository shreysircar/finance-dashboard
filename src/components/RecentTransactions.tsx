"use client";

import { useRouter } from "next/navigation";
import { Transaction } from "@/models/Transaction";

type Props = {
  transactions: Transaction[];
};

export default function RecentTransactions({ transactions }: Props) {
  const router = useRouter();

  const recent = transactions.slice(0, 3);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg w-full">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          Recent Transactions
        </h2>
        <button
          onClick={() => router.push("/transactions")}
          className="text-sm text-[#4a9eb3] hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {recent.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
          >
            <div>
              <p className="text-white text-sm">{tx.title}</p>
              <p className="text-xs text-gray-400">{tx.category}</p>
            </div>

            <p
              className={`text-sm font-semibold ${
                tx.type === "income"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}₹{tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}