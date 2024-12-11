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
import { formatMonthYear, parseMonthString, getMonthsByScreenSize } from "@/utils/dateUtils";

interface GenerationChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const GenerationChart = ({ selectedCompany, selectedUnit, selectedMonth }: GenerationChartProps) => {
  const { invoices, generatorUnits } = useData();

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getChartData = () => {
    const months = getMonthsByScreenSize(selectedMonth);
    const generatorUnit = generatorUnits.find(
      unit => unit.empresa === selectedCompany && unit.unidadeConsumidora === selectedUnit
    );

    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );

      const monthIndex = new Date(month).getMonth();
      const monthNames = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
                         'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
      const estimatedGeneration = Number(generatorUnit?.estimativaGeracao[monthNames[monthIndex]] || 0);

      return {
        mes: formatMonthYear(parseMonthString(month)),
        geracaoTotal: Number(invoice?.geracaoTotal || 0),
        estimativaGeracao: estimatedGeneration
      };
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="text-sm font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name === 'geracaoTotal' ? 'Geração Total' : 'Estimativa de Geração'}: ${formatNumber(entry.value)} kWh`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartData = getChartData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Geração de Energia (kWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="geracaoTotal"
              fill="#82ca9d"
              name="Geração Total"
            />
            <Line
              type="monotone"
              dataKey="estimativaGeracao"
              stroke="#ff7300"
              name="Estimativa de Geração"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GenerationChart;