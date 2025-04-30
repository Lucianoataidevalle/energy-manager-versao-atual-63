
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGenerationChart } from "@/hooks/charts/useGenerationChart";
import { formatNumber } from "@/utils/formatters";

interface GenerationChartProps {
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

const GenerationChart = ({ 
  selectedCompany, 
  selectedUnit, 
  selectedMonth,
  chartStyles
}: GenerationChartProps) => {
  const chartData = useGenerationChart({ selectedCompany, selectedUnit, selectedMonth });

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
              {`${entry.name === 'geracaoTotal' ? 'Geração Total' : 'Estimativa de Geração'}: ${formatNumber(entry.value)} kWh`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Geração de Energia (kWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart 
            data={chartData}
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
            <Legend />
            <Bar
              dataKey="geracaoTotal"
              fill="#82ca9d"
              name="Geração Total"
              barSize={barSize}
            />
            <Line
              type="monotone"
              dataKey="estimativaGeracao"
              stroke="#ff7300"
              name="Estimativa de Geração"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GenerationChart;
