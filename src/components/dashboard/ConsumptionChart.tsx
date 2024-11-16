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
  LabelList,
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

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

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

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 10} 
        fill="#666" 
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {formatNumber(value)}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="text-sm font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)}
            </p>
          ))}
          <p className="text-sm font-semibold">
            Consumo Total: {formatNumber(payload[0].payload.total)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consumo (kWh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={270}>
          <BarChart 
            data={chartData} 
            barSize={30}
            stackOffset="none"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              payload={[
                { value: 'Consumo Fora Ponta', type: 'rect', color: '#82ca9d' },
                { value: 'Consumo Ponta', type: 'rect', color: '#8884d8' },
                { value: 'Consumo Total', type: 'rect', color: '#666' }
              ]}
            />
            <Bar 
              dataKey="foraPonta" 
              stackId="a" 
              fill="#82ca9d" 
              name="Consumo Fora Ponta"
            />
            <Bar 
              dataKey="ponta" 
              stackId="a" 
              fill="#8884d8" 
              name="Consumo Ponta"
            >
              <LabelList 
                dataKey="total" 
                position="top" 
                content={renderCustomizedLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;