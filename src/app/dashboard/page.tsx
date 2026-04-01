"use client";

import SummaryCard from "@/components/SummaryCard";
import { useFinance } from "@/context/FinanceContext";
import BalanceChart from "@/components/BalanceChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import {
  calculateBalance,
  calculateIncome,
  calculateExpenses,
} from "@/utils/finance";

export default function DashboardPage() {
  const { transactions } = useFinance();

  const balance = calculateBalance(transactions);
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expenses} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <p className="text-gray-500 mb-2">
  Track your financial trends and spending patterns
</p>
  <BalanceChart transactions={transactions} />
  <CategoryPieChart transactions={transactions} />
</div>
    </div>
  );
}