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
import { format, subMonths, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BillingChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const BillingChart = ({ selectedCompany, selectedUnit, selectedMonth }: BillingChartProps) => {
  const { invoices } = useData();

  // Get data for the last 12 months up to selectedMonth
  const getLast12MonthsData = () => {
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(selectedDate, i);
      return format(date, 'yyyy-MM');
    }).reverse();

    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );

      return {
        mes: format(parse(month, 'yyyy-MM', new Date()), "MMM/yy", { locale: ptBR }),
        valor: invoice?.valorFatura || 0
      };
    });
  };

  const chartData = getLast12MonthsData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valor Total das Faturas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="valor"
              fill="#8884d8"
              name="Valor Total"
              label={{
                position: "top",
                formatter: (value: number) =>
                  `R$ ${value.toLocaleString("pt-BR")}`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BillingChart;