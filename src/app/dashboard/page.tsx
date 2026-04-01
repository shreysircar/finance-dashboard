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
  <div className="space-y-8">

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-400 text-sm">
        Overview of your financial activity
      </p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard title="Total Balance" value={balance} />
      <SummaryCard title="Income" value={income} />
      <SummaryCard title="Expenses" value={expenses} />
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <BalanceChart transactions={transactions} />

      <CategoryPieChart transactions={transactions} />

    </div>

  </div>
);}