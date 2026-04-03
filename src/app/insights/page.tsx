"use client";

import { useFinance } from "@/context/FinanceContext";
import { useRole } from "@/context/RoleContext";
import AdminOnly from "@/components/AdminOnly";

import SummaryCard from "@/components/SummaryCard";
import CategoryBarChart from "@/components/CategoryBarChart";

// 🔥 NEW COMPONENTS
import TopCategories from "@/components/TopCategories";
import ExportActions from "@/components/ExportActions";
import ForecastCard from "@/components/ForecastCard";

import {
  getTopCategory,
  getTotalExpenses,
  getMonthlyComparison,
} from "@/utils/finance";

export default function InsightsPage() {
  const { transactions } = useFinance();
  const { role } = useRole();

  const topCategory = getTopCategory(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const monthly = getMonthlyComparison(transactions);

  const topPercentage = totalExpenses
    ? ((topCategory.amount / totalExpenses) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Insights
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Understand your financial patterns and trends
          </p>
        </div>

        {/* 🔥 Role Badge */}
        <span className="text-sm px-3 py-1 rounded-full bg-[#1e293b] text-gray-300">
          {role === "admin" ? "Admin Mode" : "Viewer Mode"}
        </span>
      </div>

      {/* 🔥 ADMIN ONLY: Export */}
      <AdminOnly>
        <ExportActions />
      </AdminOnly>

      {/* Existing Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          title="Top Category"
          value={topCategory.category}
          subtitle={`₹ ${topCategory.amount.toLocaleString()}`}
        />

        <SummaryCard
          title="Total Expenses"
          value={totalExpenses}
          isCurrency
        />

        <SummaryCard
          title="Monthly Change"
          value={`${monthly.change}%`}
          subtitle="vs last month"
        />
      </div>

      {/* Chart */}
      <div className="min-h-0">
        <CategoryBarChart transactions={transactions} />
      </div>

      {/* 🔥 NEW: Top Categories */}
      <TopCategories />

      {/* Insight Box */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155] shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-2">
          Key Insight
        </h2>

        <p className="text-gray-400 leading-relaxed">
          You spent <strong className="text-white">{topPercentage}%</strong> of your total
          expenses on <strong className="text-white">{topCategory.category}</strong>, making
          it your highest spending category. Compared to last month,
          your spending has changed by{" "}
          <strong className="text-white">{monthly.change}%</strong>.
        </p>
      </div>

      {/* 🔥 ADMIN ONLY: Forecast */}
      <AdminOnly>
        <ForecastCard />
      </AdminOnly>

    </div>
  );
}