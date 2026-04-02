"use client";

import TransactionTable from "@/components/TransactionTable";
import FilterBar from "@/components/FilterBar";

export default function TransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10 relative">

      {/* 🌟 Ambient Glow Background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#4a9eb3]/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* 🔥 Header + Action */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track and manage your financial activity
          </p>
        </div>

        <button
          className="relative px-5 py-2.5 rounded-xl text-white font-medium
          bg-[#4a9eb3]
          shadow-md hover:shadow-[0_0_20px_rgba(74,158,179,0.4)]
          hover:scale-[1.03] active:scale-[0.97]
          transition-all duration-200"
        >
          + Add Transaction
        </button>
      </div>

      {/* 🔥 Filter Section */}
      <div
        className="relative z-10
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl p-4
        shadow-md hover:shadow-xl
        transition-all duration-300"
      >
        <FilterBar />
      </div>

      {/* 🔥 Transactions Section */}
      <div
        className="relative z-10
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl overflow-hidden
        shadow-md hover:shadow-xl
        transition-all duration-300"
      >
        {/* Section Header */}
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <p className="text-sm text-gray-300 font-medium tracking-wide">
            Recent Transactions
          </p>

          <span className="text-xs text-gray-500">
            Updated just now
          </span>
        </div>

        {/* Table/List */}
        <div className="p-4">
          <TransactionTable />
        </div>
      </div>

    </div>
  );
}