type Props = {
  title: string;
  value: number;
};

export default function SummaryCard({ title, value }: Props) {
  const getColor = () => {
    if (title.toLowerCase().includes("income")) return "text-green-400";
    if (title.toLowerCase().includes("expense")) return "text-red-400";
    return "text-blue-400";
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md border border-[#334155] hover:scale-[1.02] transition-all duration-200">
      
      {/* Title */}
      <p className="text-sm text-gray-400">{title}</p>

      {/* Value */}
      <h2 className={`text-3xl font-bold mt-2 ${getColor()}`}>
        ₹ {value.toLocaleString()}
      </h2>

    </div>
  );
}