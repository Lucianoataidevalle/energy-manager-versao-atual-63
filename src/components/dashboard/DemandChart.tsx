import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  Line,
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

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
  const { invoices, consumerUnits } = useData();

  const getLast12MonthsData = () => {
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(selectedDate, i);
      return format(date, 'yyyy-MM');
    }).reverse();

    const unit = consumerUnits.find(u => 
      u.empresa === selectedCompany && u.nome === selectedUnit
    );
    const demandaContratada = unit ? Number(unit.demandaContratada) : 0;

    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );

      return {
        mes: format(parse(month, 'yyyy-MM', new Date()), "MMM/yy", { locale: ptBR }),
        medida: invoice?.demandaMedida || 0,
        ultrapassagem: invoice?.demandaUltrapassagem || 0,
        contratada: demandaContratada
      };
    });
  };

  const chartData = getLast12MonthsData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demanda dos Últimos 12 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="medida" 
              stackId="a" 
              fill="#8884d8" 
              name="Demanda Medida"
            />
            <Bar
              dataKey="ultrapassagem"
              stackId="a"
              fill="#ff8042"
              name="Ultrapassagem"
            />
            <Line
              type="monotone"
              dataKey="contratada"
              stroke="#82ca9d"
              name="Demanda Contratada"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandChart;