import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

interface DemandChartProps {
  selectedMonth: string;
}

const DemandChart = ({ selectedMonth }: DemandChartProps) => {
  const mockData = [
    { mes: "Jan/24", medida: 350, contratada: 400, ultrapassagem: 0 },
    { mes: "Fev/24", medida: 420, contratada: 400, ultrapassagem: 20 },
    { mes: "Mar/24", medida: 380, contratada: 400, ultrapassagem: 0 },
    { mes: "Abr/24", medida: 390, contratada: 400, ultrapassagem: 0 },
    { mes: "Mai/24", medida: 450, contratada: 400, ultrapassagem: 50 },
    { mes: "Jun/24", medida: 370, contratada: 400, ultrapassagem: 0 },
    { mes: "Jul/24", medida: 360, contratada: 400, ultrapassagem: 0 },
    { mes: "Ago/24", medida: 430, contratada: 400, ultrapassagem: 30 },
    { mes: "Set/24", medida: 400, contratada: 400, ultrapassagem: 0 },
    { mes: "Out/24", medida: 410, contratada: 400, ultrapassagem: 10 },
    { mes: "Nov/24", medida: 385, contratada: 400, ultrapassagem: 0 },
    { mes: "Dez/24", medida: 395, contratada: 400, ultrapassagem: 0 },
  ].slice(0, parseInt(selectedMonth));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demanda dos Últimos 12 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="medida" fill="#8884d8" name="Demanda Medida" />
            <Bar
              dataKey="ultrapassagem"
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