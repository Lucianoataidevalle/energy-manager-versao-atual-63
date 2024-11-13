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
import { format, subMonths, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConsumptionChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const ConsumptionChart = ({ selectedCompany, selectedUnit, selectedMonth }: ConsumptionChartProps) => {
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
          ponta: 0,
          foraPonta: 0,
          total: 0
        };
      }

      const ponta = invoice?.consumoPonta || 0;
      const foraPonta = invoice?.consumoForaPonta || 0;
      const total = ponta + foraPonta;

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        ponta,
        foraPonta,
        total
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
          <span>Consumo (kWh)</span>
          <span className="text-xl font-bold">
            {currentMonthData?.total.toLocaleString("pt-BR")} kWh
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
            <Legend />
            <Bar 
              dataKey="ponta" 
              stackId="a" 
              fill="#8884d8" 
              name="Consumo Ponta"
              label={(props) => {
                const { x, y, value, payload } = props;
                if (!payload) return null;
                return (
                  <text x={x} y={y - 10} fill="#666" textAnchor="middle">
                    {payload.total.toLocaleString("pt-BR")}
                  </text>
                );
              }}
            />
            <Bar
              dataKey="foraPonta"
              stackId="a"
              fill="#82ca9d"
              name="Consumo Fora Ponta"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;