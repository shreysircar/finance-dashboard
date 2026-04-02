type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  isCurrency?: boolean;
};

export default function SummaryCard({
  title,
  value,
  subtitle,
  isCurrency = false,
}: Props) {
  const isPercent =
    typeof value === "string" && value.includes("%");

  const numericPercent = isPercent
    ? parseFloat(value)
    : null;

  const getColor = () => {
    if (isPercent && numericPercent !== null) {
      return numericPercent >= 0
        ? "text-green-400"
        : "text-red-400";
    }

    if (title.toLowerCase().includes("income"))
      return "text-green-400";
    if (title.toLowerCase().includes("expense"))
      return "text-red-400";

    return "text-[#4a9eb3]";
  };

  const formatValue = () => {
    if (isCurrency && typeof value === "number") {
      return `₹ ${value.toLocaleString()}`;
    }
    return value;
  };

  const getArrow = () => {
    if (!isPercent || numericPercent === null) return null;
    return numericPercent >= 0 ? " ↑  " : " ↓  ";
  };

  return (
    <div className="
      relative p-6 rounded-2xl
      bg-gradient-to-br from-[#1e293b] to-[#0f172a]
      border border-[#334155]
      shadow-lg hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    ">
      {/* glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition pointer-events-none" />

      {/* Title */}
      <p className="text-sm text-gray-400 tracking-wide">
        {title}
      </p>

      {/* Value */}
      <h2 className={`
        text-3xl font-semibold mt-3 tracking-tight flex items-center gap-2
        ${getColor()}
      `}>
        {getArrow()}
        {formatValue()}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}