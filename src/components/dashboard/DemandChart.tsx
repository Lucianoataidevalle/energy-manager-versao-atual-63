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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
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
      medida: invoice.demandaMedida,
      ultrapassagem: invoice.demandaUltrapassagem,
      contratada: 400 // Este valor deve vir do cadastro da UC
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demanda dos Últimos 12 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={filteredInvoices} barSize={30}>
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