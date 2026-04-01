export type TransactionType = "income" | "expense";

export interface TransactionProps {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export class Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;

  constructor(props: TransactionProps) {
    this.id = props.id;
    this.date = props.date;
    this.amount = props.amount;
    this.category = props.category;
    this.type = props.type;
  }

  // 🧠 Derived logic (OOP thinking)
  isExpense() {
    return this.type === "expense";
  }

  isIncome() {
    return this.type === "income";
  }
}