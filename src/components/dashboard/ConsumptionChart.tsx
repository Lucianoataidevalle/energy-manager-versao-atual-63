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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConsumptionChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const ConsumptionChart = ({ selectedCompany, selectedUnit, selectedMonth }: ConsumptionChartProps) => {
  const { invoices } = useData();

  // Filtra as faturas pela empresa e UC selecionadas
  const filteredInvoices = invoices
    .filter(invoice => 
      invoice.empresa === selectedCompany && 
      invoice.unidade === selectedUnit
    )
    .sort((a, b) => new Date(a.mes).getTime() - new Date(b.mes).getTime())
    .map(invoice => ({
      mes: format(new Date(invoice.mes), "MMM/yy", { locale: ptBR }),
      ponta: invoice.consumoPonta,
      foraPonta: invoice.consumoForaPonta,
      total: invoice.consumoPonta + invoice.consumoForaPonta
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo dos Últimos 12 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredInvoices} barSize={30}>
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