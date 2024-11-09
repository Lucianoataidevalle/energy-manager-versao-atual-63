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

interface BillingChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const BillingChart = ({ selectedCompany, selectedUnit, selectedMonth }: BillingChartProps) => {
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
      valor: invoice.valorFatura
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valor Total das Faturas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredInvoices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="valor"
              fill="#8884d8"
              name="Valor Total"
              label={{
                position: "top",
                formatter: (value: number) =>
                  `R$ ${value.toLocaleString("pt-BR")}`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BillingChart;