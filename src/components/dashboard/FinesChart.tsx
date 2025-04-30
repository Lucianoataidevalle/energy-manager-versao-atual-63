
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinesChart } from "@/hooks/charts/useFinesChart";

interface FinesChartProps {
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

const FinesChart = ({ selectedCompany, selectedUnit, selectedMonth, chartStyles }: FinesChartProps) => {
  const chartData = useFinesChart({ selectedCompany, selectedUnit, selectedMonth });

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Set chart dimensions based on provided styles
  const height = chartStyles?.height || 280;
  const barSize = chartStyles?.barSize || 40;
  const margin = chartStyles?.margin || { top: 20, right: 30, left: 40, bottom: 20 };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="text-sm font-semibold">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
              Multas/Juros: R$ {formatNumber(entry.value)}
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
        <CardTitle className="text-lg">Multas/Juros (R$)</CardTitle>
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
              tickFormatter={(value) => `R$ ${formatNumber(value)}`}
              axisLine={{ strokeWidth: 2 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="valor"
              fill="#8884d8"
              name="Multas/Juros"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FinesChart;
