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

interface ConsumptionChartProps {
  selectedMonth: string;
}

const ConsumptionChart = ({ selectedMonth }: ConsumptionChartProps) => {
  const mockData = [
    { mes: "Jan/24", ponta: 100, foraPonta: 300, total: 400 },
    { mes: "Fev/24", ponta: 120, foraPonta: 280, total: 400 },
    { mes: "Mar/24", ponta: 140, foraPonta: 260, total: 400 },
    { mes: "Abr/24", ponta: 90, foraPonta: 310, total: 400 },
    { mes: "Mai/24", ponta: 110, foraPonta: 290, total: 400 },
    { mes: "Jun/24", ponta: 130, foraPonta: 270, total: 400 },
    { mes: "Jul/24", ponta: 150, foraPonta: 250, total: 400 },
    { mes: "Ago/24", ponta: 95, foraPonta: 305, total: 400 },
    { mes: "Set/24", ponta: 115, foraPonta: 285, total: 400 },
    { mes: "Out/24", ponta: 135, foraPonta: 265, total: 400 },
    { mes: "Nov/24", ponta: 145, foraPonta: 255, total: 400 },
    { mes: "Dez/24", ponta: 105, foraPonta: 295, total: 400 },
  ].slice(0, parseInt(selectedMonth));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo dos Últimos 12 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ponta" stackId="a" fill="#8884d8" name="Ponta" />
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