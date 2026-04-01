type Props = {
  title: string;
  value: number;
};

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">
  ₹ {value.toLocaleString()}
</h2>
    </div>
  );
}