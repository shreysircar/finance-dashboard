"use client";

import { AlertTriangle } from "lucide-react";

const alerts = [
  "You exceeded your Entertainment budget",
  "Spending increased by 18% this month",
  "Savings rate dropped below 20%",
];

export default function AlertsPanel() {
  return (
    <div className="p-5 rounded-xl bg-[#1a0f0f] border border-red-500/30 space-y-3">
      <h2 className="text-sm text-red-400 flex items-center gap-2">
        <AlertTriangle size={16} />
        Alerts & Warnings
      </h2>

      {alerts.map((alert, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 px-3 py-2 rounded-md"
        >
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span>{alert}</span>
        </div>
      ))}
    </div>
  );
}