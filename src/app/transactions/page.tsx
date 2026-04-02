"use client";

import TransactionTable from "@/components/TransactionTable";
import FilterBar from "@/components/FilterBar";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

      <FilterBar />
      <TransactionTable />
    </div>
  );
}