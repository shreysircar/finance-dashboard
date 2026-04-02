import { Transaction } from "../models/Transaction";

export const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((acc, t) => {
    return t.isIncome() ? acc + t.amount : acc - t.amount;
  }, 0);
};

export const calculateIncome = (transactions: Transaction[]) => {
  return transactions
    .filter((t) => t.isIncome())
    .reduce((acc, t) => acc + t.amount, 0);
};

export const calculateExpenses = (transactions: Transaction[]) => {
  return transactions
    .filter((t) => t.isExpense())
    .reduce((acc, t) => acc + t.amount, 0);
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.isExpense()) {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return map;
};

export const getTopCategory = (transactions: Transaction[]) => {
  const breakdown = getCategoryBreakdown(transactions);

  let maxCategory = "";
  let maxValue = 0;

  for (const category in breakdown) {
    if (breakdown[category] > maxValue) {
      maxCategory = category;
      maxValue = breakdown[category];
    }
  }

  return { category: maxCategory, amount: maxValue };
};

export const getTotalExpenses = (transactions: Transaction[]) => {
  return transactions
    .filter((t) => t.isExpense())
    .reduce((acc, t) => acc + t.amount, 0);
};

export const getMonthlyComparison = (transactions: Transaction[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

  let currentTotal = 0;
  let lastTotal = 0;

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.getMonth();

    if (t.isExpense()) {
      if (month === currentMonth) currentTotal += t.amount;
      if (month === lastMonth) lastTotal += t.amount;
    }
  });

  const change =
    lastTotal === 0
      ? 0
      : ((currentTotal - lastTotal) / lastTotal) * 100;

  return {
    currentTotal,
    lastTotal,
    change: change.toFixed(1),
  };
};