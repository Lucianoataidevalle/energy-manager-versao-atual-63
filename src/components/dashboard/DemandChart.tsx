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
import { format, subMonths, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
  const { invoices, consumerUnits } = useData();

  // Get contracted demand from consumer unit
  const getContractedDemand = () => {
    const unit = consumerUnits.find(
      unit => unit.empresa === selectedCompany && unit.nome === selectedUnit
    );
    return unit ? Number(unit.demandaContratada) : 0;
  };

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

    const contractedDemand = getContractedDemand();

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
          medida: 0,
          ultrapassagem: 0,
          contratada: contractedDemand
        };
      }

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        medida: invoice?.demandaMedida || 0,
        ultrapassagem: invoice?.demandaUltrapassagem || 0,
        contratada: contractedDemand
      };
    });
  };

  const chartData = getLast12MonthsData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demanda (kW)</CardTitle>
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