"use client";

type Props = {
  title: string;
  value: string | number;
};

export default function InsightCard({ title, value }: Props) {
  return (
    <div className="p-5 rounded-xl bg-[#0f172a] border border-[#334155]">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-xl font-semibold text-white mt-1">
        {value}
      </h2>
    </div>
  );
}