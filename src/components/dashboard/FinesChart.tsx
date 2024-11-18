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
import { useData } from "@/contexts/DataContext";
import { format, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useChartData } from "@/hooks/useChartData";

interface FinesChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const FinesChart = ({ selectedCompany, selectedUnit, selectedMonth }: FinesChartProps) => {
  const { invoices } = useData();
  const { months } = useChartData(selectedMonth, invoices);

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getChartData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );

      const monthDate = parse(month, 'yyyy-MM', new Date());
      if (!isValid(monthDate)) {
        console.error('Invalid month date:', month);
        return {
          mes: month,
          valor: 0
        };
      }

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        valor: Number(invoice?.multasJuros) || 0
      };
    });
  };

  const chartData = getChartData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="text-sm font-semibold">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: R$ {formatNumber(entry.value)}
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
        <ResponsiveContainer width="100%" height={270}>
          <BarChart data={chartData} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${formatNumber(value)}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="valor"
              fill="#8884d8"
              name="Multas/Juros"
              label={{
                position: "top",
                formatter: (value: number) => `R$ ${formatNumber(value)}`,
                fontSize: 12,
                fontWeight: "bold",
                fill: "#666"
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FinesChart;