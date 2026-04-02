"use client";

import { useFinance } from "@/context/FinanceContext";
import BalanceChart from "@/components/BalanceChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCard from "@/components/SummaryCard";
import RoleSwitcher from "@/components/RoleSwitcher";
import { useRole } from "@/context/RoleContext";

import {
  calculateBalance,
  calculateIncome,
  calculateExpenses,
} from "@/utils/finance";

export default function DashboardPage() {
  const { transactions } = useFinance();
  const { role } = useRole();
  const balance = calculateBalance(transactions);
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);

  return (
    <div className="space-y-10">

      {/* Header */}

<div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-semibold tracking-tight">
      Dashboard
    </h1>
    <p className="text-gray-400 text-sm mt-1">
      Overview of your financial activity
    </p>
  </div>

  {/* 🔥 Right Controls */}
  <div className="flex items-center gap-4">

    {/* Role Switcher */}
    <RoleSwitcher />


  </div>
</div>
      {/* ✅ Summary Cards (now direct + smarter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <SummaryCard
          title="Total Balance"
          value={balance}
          isCurrency
        />

        <SummaryCard
          title="Income"
          value={income}
          isCurrency
        />

        <SummaryCard
          title="Expenses"
          value={expenses}
          isCurrency
        />

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="min-h-0">
          <BalanceChart transactions={transactions} />
        </div>

        <div className="min-h-0">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

    </div>
  );
}