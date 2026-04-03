"use client";

import { useFinance } from "@/context/FinanceContext";
import { useRole } from "@/context/RoleContext";
import AdminOnly from "@/components/AdminOnly";

import BalanceChart from "@/components/BalanceChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCard from "@/components/SummaryCard";

// 🔥 NEW COMPONENTS
import QuickActions from "@/components/QuickActions";
import BudgetWidget from "@/components/BudgetWidget";
import AlertsPanel from "@/components/AlertsPanel";
import SmartInsights from "@/components/SmartInsights";

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

        {/* Role Badge */}
        <span className="text-sm px-3 py-1 rounded-full bg-[#1e293b] text-gray-300">
          {role === "admin" ? "Admin Mode" : "Viewer Mode"}
        </span>
      </div>

      {/* 🔥 ADMIN ONLY */}
      <AdminOnly>
        <QuickActions />
      </AdminOnly>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" value={balance} isCurrency />
        <SummaryCard title="Income" value={income} isCurrency />
        <SummaryCard title="Expenses" value={expenses} isCurrency />
      </div>

      {/* 🔥 ADMIN ONLY */}
      <AdminOnly>
        <BudgetWidget />
      </AdminOnly>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="min-h-0">
          <BalanceChart transactions={transactions} />
        </div>

        <div className="min-h-0">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

      {/* Smart Insights (ALL users) */}
      <SmartInsights />

      {/* 🔥 ADMIN ONLY */}
      <AdminOnly>
        <AlertsPanel />
      </AdminOnly>

    </div>
  );
}