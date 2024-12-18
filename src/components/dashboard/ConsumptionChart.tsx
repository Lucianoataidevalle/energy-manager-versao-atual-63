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
import { useData } from "@/contexts/DataContext";
import { formatMonthYear, parseMonthString, getMonthsByScreenSize } from "@/utils/dateUtils";

interface ConsumptionChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const ConsumptionChart = ({ selectedCompany, selectedUnit, selectedMonth }: ConsumptionChartProps) => {
  const { invoices } = useData();

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getChartData = () => {
    const months = getMonthsByScreenSize(selectedMonth);

    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );

      const ponta = Number(invoice?.consumoPonta || 0);
      const foraPonta = Number(invoice?.consumoForaPonta || 0);
      const total = ponta + foraPonta;

      return {
        mes: formatMonthYear(parseMonthString(month)),
        ponta,
        foraPonta,
        total
      };
    });
  };

  const chartData = getChartData();

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
            {`Consumo Total: ${formatNumber(payload[0].payload.total)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consumo (kWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart 
            data={chartData} 
            barSize={30}
            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
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
              tickFormatter={formatNumber}
              axisLine={{ strokeWidth: 2 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={(value) => {
              if (value === "foraPonta") return "Fora Ponta";
              if (value === "ponta") return "Ponta";
              return value;
            }} />
            <Bar 
              dataKey="foraPonta" 
              stackId="a" 
              fill="#82ca9d" 
              name="foraPonta"
            />
            <Bar 
              dataKey="ponta" 
              stackId="a" 
              fill="#8884d8" 
              name="ponta"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;