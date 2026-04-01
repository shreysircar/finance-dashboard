"use client";

import { createContext, useContext, useState } from "react";
import { Transaction } from "@/models/Transaction";
import { transactions as initialData } from "@/data/transactions";

// 🔐 Role Type
type Role = "admin" | "viewer";

// 🔍 Filter Type (we'll use this later)
interface Filters {
  type: "all" | "income" | "expense";
  category: string;
  search: string;
}

// 🧠 Context Shape
interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  filters: Filters;

  setRole: (role: Role) => void;
  setFilters: (filters: Filters) => void;

  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

// 📦 Create Context
const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// 🚀 Provider
export const FinanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialData);

  const [role, setRole] = useState<Role>("viewer");

  const [filters, setFilters] = useState<Filters>({
    type: "all",
    category: "",
    search: "",
  });

  // ➕ Add Transaction
  const addTransaction = (t: Transaction) => {
    setTransactions((prev) => [...prev, t]);
  };

  // ❌ Delete Transaction
  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        filters,
        setRole,
        setFilters,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

// 🧩 Custom Hook
export const useFinance = () => {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
};