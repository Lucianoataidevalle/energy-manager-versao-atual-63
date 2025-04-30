
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useReactiveEnergyChart } from "@/hooks/charts/useReactiveEnergyChart";
import { formatNumber } from "@/utils/formatters";

interface ReactiveEnergyChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  chartStyles?: {
    height: number;
    barSize: number;
    margin: {
      top: number;
      right: number;
      left: number;
      bottom: number;
    };
  };
}

const ReactiveEnergyChart = ({ 
  selectedCompany, 
  selectedUnit, 
  selectedMonth,
  chartStyles
}: ReactiveEnergyChartProps) => {
  const chartData = useReactiveEnergyChart({ selectedCompany, selectedUnit, selectedMonth });

  // Set chart dimensions based on provided styles
  const height = chartStyles?.height || 280;
  const barSize = chartStyles?.barSize || 40;
  const margin = chartStyles?.margin || { top: 20, right: 30, left: 40, bottom: 20 };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="text-sm font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name === "foraPonta" ? "Fora Ponta" : "Ponta"}: ${formatNumber(entry.value)}`}
            </p>
          ))}
          <p className="text-sm font-semibold mt-1">
            {`Total: ${formatNumber(payload[0].payload.total)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Energia Reativa (kVArh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart 
            data={chartData} 
            barSize={barSize}
            margin={margin}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="mes" 
              interval={0} 
              tickMargin={10}
              axisLine={{ strokeWidth: 2 }}
              padding={{ left: 30, right: 30 }}
            />
            <YAxis 
              axisLine={{ strokeWidth: 2 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={(value) => {
              if (value === "foraPonta") return "Fora Ponta";
              if (value === "ponta") return "Ponta";
              return value;
            }} />
            <Bar 
              dataKey="ponta" 
              stackId="a" 
              fill="#8884d8" 
              name="ponta"
            />
            <Bar
              dataKey="foraPonta"
              stackId="a"
              fill="#82ca9d"
              name="foraPonta"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReactiveEnergyChart;
