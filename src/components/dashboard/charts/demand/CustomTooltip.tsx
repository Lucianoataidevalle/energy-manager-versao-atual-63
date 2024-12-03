import { formatNumber } from "@/utils/formatters";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        {payload.map((entry: any) => (
          <div key={entry.name} className="text-sm">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span>{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};