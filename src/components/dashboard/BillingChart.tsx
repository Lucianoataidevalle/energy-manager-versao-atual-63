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
    { mes: "Jan", valor: 50000 },
    { mes: "Fev", valor: 52000 },
    { mes: "Mar", valor: 48000 },
    { mes: "Abr", valor: 51000 },
    { mes: "Mai", valor: 53000 },
    { mes: "Jun", valor: 49000 },
    { mes: "Jul", valor: 47000 },
    { mes: "Ago", valor: 54000 },
    { mes: "Set", valor: 50500 },
    { mes: "Out", valor: 51500 },
    { mes: "Nov", valor: 49500 },
    { mes: "Dez", valor: 52500 },
  ];

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