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

  // Get data for the last 12 months up to selectedMonth
  const getLast12MonthsData = () => {
    // Validate the selectedMonth format and parsing
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

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        ponta: invoice?.consumoPonta || 0,
        foraPonta: invoice?.consumoForaPonta || 0,
        total: (invoice?.consumoPonta || 0) + (invoice?.consumoForaPonta || 0)
      };
    });
  };

  const chartData = getLast12MonthsData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo (kWh)</CardTitle>
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
                const total = payload.total;
                return (
                  <text x={x} y={y} dy={-10} fill="#666" textAnchor="middle">
                    {total}
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