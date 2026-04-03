"use client";

const budgets = [
  { category: "Food", spent: 8000, limit: 10000 },
  { category: "Transport", spent: 3000, limit: 5000 },
  { category: "Entertainment", spent: 4500, limit: 4000 },
];

export default function BudgetWidget() {
  return (
    <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155] space-y-4">
      <h2 className="text-sm text-gray-400">Budget Overview</h2>

      {budgets.map((b) => {
        const percent = Math.min((b.spent / b.limit) * 100, 100);
        const isOver = b.spent > b.limit;

        return (
          <div key={b.category} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">{b.category}</span>
              <span className={isOver ? "text-red-400" : "text-gray-400"}>
                ₹{b.spent} / ₹{b.limit}
              </span>
            </div>

            <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  isOver ? "bg-red-500" : "bg-[#4a9eb3]"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}