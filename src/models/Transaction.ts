export type TransactionType = "income" | "expense";

export interface TransactionProps {
  id: string;
  title: string; 
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export class Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;

  constructor(props: TransactionProps) {
    this.id = props.id;
    this.title = props.title;
    this.date = props.date;
    this.amount = props.amount;
    this.category = props.category;
    this.type = props.type;
  }

  //  Derived logic
  isExpense() {
    return this.type === "expense";
  }

  isIncome() {
    return this.type === "income";
  }
}