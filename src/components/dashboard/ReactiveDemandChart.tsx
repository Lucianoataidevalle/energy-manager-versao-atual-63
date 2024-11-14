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
import { useData } from "@/contexts/DataContext";
import { format, subMonths, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReactiveDemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const ReactiveDemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: ReactiveDemandChartProps) => {
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
          demandaReativaPonta: 0,
          demandaReativaForaPonta: 0
        };
      }

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        demandaReativaPonta: Number(invoice?.demandaReativaPonta) || 0,
        demandaReativaForaPonta: Number(invoice?.demandaReativaForaPonta) || 0
      };
    });
  };

  const chartData = getLast12MonthsData();

  const getYAxisDomain = () => {
    const maxValue = Math.max(
      ...chartData.map(d => Math.max(
        d.demandaReativaPonta,
        d.demandaReativaForaPonta
      ))
    );
    return [0, maxValue * 1.1];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demanda Reativa (kVAr)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis domain={getYAxisDomain()} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="demandaReativaForaPonta" 
              fill="#8884d8" 
              name="Demanda Reativa Fora Ponta"
              barSize={20}
            />
            <Bar
              dataKey="demandaReativaPonta"
              fill="#82ca9d"
              name="Demanda Reativa Ponta"
              barSize={20}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReactiveDemandChart;
