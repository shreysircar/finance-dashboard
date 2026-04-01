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