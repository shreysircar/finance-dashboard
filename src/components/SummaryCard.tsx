type Props = {
  title: string;
  value: number;
};

export default function SummaryCard({ title, value }: Props) {
  const getColor = () => {
    if (title.toLowerCase().includes("income")) return "text-green-400";
    if (title.toLowerCase().includes("expense")) return "text-red-400";
    return "text-[#4a9eb3]";
  };

  return (
    <div
      className="
        relative p-6 rounded-2xl
        bg-gradient-to-br from-[#1e293b] to-[#0f172a]
        border border-[#334155]
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition pointer-events-none" />

      {/* Title */}
      <p className="text-sm text-gray-400 tracking-wide">
        {title}
      </p>

      {/* Value */}
      <h2
        className={`
          text-3xl font-semibold mt-3 tracking-tight
          ${getColor()}
        `}
      >
        ₹ {value.toLocaleString()}
      </h2>
    </div>
  );
}