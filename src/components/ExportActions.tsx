"use client";

import { Download, FileText } from "lucide-react";

export default function ExportActions() {
  return (
    <div className="flex flex-wrap gap-3">
      
      {/* Download CSV */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-gray-200 text-sm transition">
        <Download size={16} />
        Download CSV
      </button>

      {/* Generate Report */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#025a6a] hover:bg-[#037387] text-white text-sm font-medium transition">
        <FileText size={16} />
        Generate Report
      </button>

    </div>
  );
}