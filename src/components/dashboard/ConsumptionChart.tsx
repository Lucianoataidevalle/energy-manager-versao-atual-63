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
  LabelList,
} from "recharts";
import { useData } from "@/contexts/DataContext";
import { getLast3Months, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

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
    const months = getLast3Months(selectedMonth);

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
              {`${entry.name}: ${formatNumber(entry.value)}`}
            </p>
          ))}
          <p className="text-sm font-semibold">
            {`Consumo Total: ${formatNumber(payload[0].payload.total)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ x, y, width, value }: any) => {
    return (
      <text 
        x={x + width / 2} 
        y={y - 10} 
        fill="#666" 
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {formatNumber(Number(value))}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consumo (kWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData} 
            barSize={30}
            margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="foraPonta" 
              stackId="a" 
              fill="#82ca9d" 
              name="Consumo Fora Ponta"
            />
            <Bar 
              dataKey="ponta" 
              stackId="a" 
              fill="#8884d8" 
              name="Consumo Ponta"
            >
              <LabelList 
                dataKey="total" 
                position="top" 
                content={CustomLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;