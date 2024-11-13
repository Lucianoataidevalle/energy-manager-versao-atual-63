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
import { format, subMonths, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BillingChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const BillingChart = ({ selectedCompany, selectedUnit, selectedMonth }: BillingChartProps) => {
  const { invoices } = useData();

  const getLast12MonthsData = () => {
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    if (!isValid(selectedDate)) {
      console.error('Invalid date:', selectedMonth);
      return [];
    }

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
        valor: invoice?.valorFatura || 0
      };
    });
  };

  const chartData = getLast12MonthsData();
  const currentMonthData = chartData.find(data => 
    data.mes === format(parse(selectedMonth, 'yyyy-MM', new Date()), "MMM/yy", { locale: ptBR })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Custo de Faturas</span>
          <span className="text-xl font-bold">
            {currentMonthData?.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="valor"
              fill="#8884d8"
              label={{
                position: "top",
                formatter: (value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                style: { whiteSpace: "nowrap" }
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BillingChart;