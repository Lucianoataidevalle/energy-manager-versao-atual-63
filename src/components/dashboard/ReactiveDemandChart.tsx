
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useReactiveDemandChart } from "@/hooks/charts/useReactiveDemandChart";
import { formatNumber } from "@/utils/formatters";

interface ReactiveDemandChartProps {
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

const ReactiveDemandChart = ({ 
  selectedCompany, 
  selectedUnit, 
  selectedMonth,
  chartStyles
}: ReactiveDemandChartProps) => {
  const chartData = useReactiveDemandChart({ selectedCompany, selectedUnit, selectedMonth });

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
              {`${entry.name}: ${formatNumber(entry.value)}`}
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
        <CardTitle className="text-lg">Demanda Reativa (kVAr)</CardTitle>
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
              dataKey="demandaReativaForaPonta" 
              fill="#8884d8" 
              name="Demanda Reativa Fora Ponta"
              barSize={barSize}
            />
            <Bar
              dataKey="demandaReativaPonta"
              fill="#82ca9d"
              name="Demanda Reativa Ponta"
              barSize={barSize}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReactiveDemandChart;
