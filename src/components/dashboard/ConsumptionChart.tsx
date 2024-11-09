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
    // Ensure we have a valid date from the selectedMonth
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    
    if (!isValid(selectedDate)) {
      console.error('Invalid selected date:', selectedMonth);
      return [];
    }

    // Generate array of last 12 months
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
      
      return {
        mes: isValid(monthDate) 
          ? format(monthDate, "MMM/yy", { locale: ptBR })
          : month,
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
        <CardTitle>Consumo dos Últimos 12 Meses</CardTitle>
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
              name="Ponta"
              label={(props) => {
                const { x, y, value, payload } = props;
                if (!payload) return null;
                const total = (payload.ponta || 0) + (payload.foraPonta || 0);
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
              name="Fora Ponta"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;