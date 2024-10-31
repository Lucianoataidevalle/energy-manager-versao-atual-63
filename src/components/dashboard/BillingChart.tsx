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

interface BillingChartProps {
  selectedMonth: string;
}

const BillingChart = ({ selectedMonth }: BillingChartProps) => {
  const mockData = [
    { mes: "Jan/24", valor: 50000 },
    { mes: "Fev/24", valor: 52000 },
    { mes: "Mar/24", valor: 48000 },
    { mes: "Abr/24", valor: 51000 },
    { mes: "Mai/24", valor: 53000 },
    { mes: "Jun/24", valor: 49000 },
    { mes: "Jul/24", valor: 47000 },
    { mes: "Ago/24", valor: 54000 },
    { mes: "Set/24", valor: 50500 },
    { mes: "Out/24", valor: 51500 },
    { mes: "Nov/24", valor: 49500 },
    { mes: "Dez/24", valor: 52500 },
  ].slice(0, parseInt(selectedMonth));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valor Total das Faturas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData}>
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
                  `R$ ${value.toLocaleString()}`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BillingChart;