"use client";
import { useFinance } from "@/context/FinanceContext";

export default function Home() {
  const { transactions, role } = useFinance();

  return (
    <div>
      <p>Total Transactions: {transactions.length}</p>
      <p>Role: {role}</p>
    </div>
  );
}