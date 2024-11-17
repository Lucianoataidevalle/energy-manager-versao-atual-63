import { formatNumber } from "./utils";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="text-sm">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span>{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;