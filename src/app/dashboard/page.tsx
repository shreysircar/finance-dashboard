"use client";
import { useEffect, useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { useRole } from "@/context/RoleContext";
import AdminOnly from "@/components/AdminOnly";
import CardStack from "@/components/CardStack";
import RecentTransactions from "@/components/RecentTransactions";
import BalanceChart from "@/components/BalanceChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCard from "@/components/SummaryCard";
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
  const [budgets, setBudgets] = useState<Record<string, number>>({});

useEffect(() => {
  const stored = localStorage.getItem("budgets");
  if (stored) setBudgets(JSON.parse(stored));
}, []);
  const balance = calculateBalance(transactions);
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);
  

  // ✅ Greeting logic
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>

          {/* ✅ NEW Greeting */}
          <p className="text-gray-400 text-sm mt-1">
            {greeting} 👋 — here's your financial overview
          </p>
        </div>

        {/* Role Badge */}
        <span className="text-sm px-3 py-1 rounded-full bg-[#1e293b] text-gray-300">
          {role === "admin" ? "Admin Mode" : "Viewer Mode"}
        </span>
      </div>

      {/* ✅ Summary Cards (TOP PRIORITY) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" value={balance} isCurrency />
        <SummaryCard title="Income" value={income} isCurrency />
        <SummaryCard title="Expenses" value={expenses} isCurrency />
      </div>

      {/* 🔥 ADMIN ONLY → Quick Actions */}
      <AdminOnly>
        <QuickActions />
      </AdminOnly>

      {/* ✅ Cards + Recent Transactions (moved here) */}
      <div
        className={`grid gap-5 items-start ${
          role === "viewer" ? "lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* 👤 Viewer Only */}
        {role === "viewer" && (
          <div className="flex items-start justify-center lg:justify-start">
            <CardStack />
          </div>
        )}

        {/* 👥 Both */}
        <div className="w-full">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="min-h-0">
          <BalanceChart transactions={transactions} />
        </div>

        <div className="min-h-0">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>


      {/* 🔥 Budget + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <BudgetWidget transactions={transactions} role={role} />
        </div>

        <div className="col-span-2 h-[220px]">
          <SmartInsights />
        </div>
      </div>


      {/* 🔥 ADMIN ONLY */}
<AdminOnly>
  <AlertsPanel transactions={transactions} budgets={budgets} />
</AdminOnly>

    </div>
  );
}