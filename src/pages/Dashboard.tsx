import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  consumo: [
    { mes: "Jan", ponta: 100, foraPonta: 300, total: 400 },
    { mes: "Fev", ponta: 120, foraPonta: 280, total: 400 },
    { mes: "Mar", ponta: 140, foraPonta: 260, total: 400 },
    { mes: "Abr", ponta: 90, foraPonta: 310, total: 400 },
    { mes: "Mai", ponta: 110, foraPonta: 290, total: 400 },
    { mes: "Jun", ponta: 130, foraPonta: 270, total: 400 },
    { mes: "Jul", ponta: 150, foraPonta: 250, total: 400 },
    { mes: "Ago", ponta: 95, foraPonta: 305, total: 400 },
    { mes: "Set", ponta: 115, foraPonta: 285, total: 400 },
    { mes: "Out", ponta: 135, foraPonta: 265, total: 400 },
    { mes: "Nov", ponta: 145, foraPonta: 255, total: 400 },
    { mes: "Dez", ponta: 105, foraPonta: 295, total: 400 },
  ],
  demanda: [
    { mes: "Jan", medida: 350, contratada: 400, ultrapassagem: 0 },
    { mes: "Fev", medida: 420, contratada: 400, ultrapassagem: 20 },
    { mes: "Mar", medida: 380, contratada: 400, ultrapassagem: 0 },
    { mes: "Abr", medida: 390, contratada: 400, ultrapassagem: 0 },
    { mes: "Mai", medida: 450, contratada: 400, ultrapassagem: 50 },
    { mes: "Jun", medida: 370, contratada: 400, ultrapassagem: 0 },
    { mes: "Jul", medida: 360, contratada: 400, ultrapassagem: 0 },
    { mes: "Ago", medida: 430, contratada: 400, ultrapassagem: 30 },
    { mes: "Set", medida: 400, contratada: 400, ultrapassagem: 0 },
    { mes: "Out", medida: 410, contratada: 400, ultrapassagem: 10 },
    { mes: "Nov", medida: 385, contratada: 400, ultrapassagem: 0 },
    { mes: "Dez", medida: 395, contratada: 400, ultrapassagem: 0 },
  ],
  valores: [
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
  ],
};

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("12");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Janeiro</SelectItem>
              <SelectItem value="2">Fevereiro</SelectItem>
              <SelectItem value="3">Março</SelectItem>
              <SelectItem value="4">Abril</SelectItem>
              <SelectItem value="5">Maio</SelectItem>
              <SelectItem value="6">Junho</SelectItem>
              <SelectItem value="7">Julho</SelectItem>
              <SelectItem value="8">Agosto</SelectItem>
              <SelectItem value="9">Setembro</SelectItem>
              <SelectItem value="10">Outubro</SelectItem>
              <SelectItem value="11">Novembro</SelectItem>
              <SelectItem value="12">Dezembro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">400 kWh</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Demanda Média</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">395 kW</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Valor Total Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 50.750,00</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Consumo dos Últimos 12 Meses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.consumo}>
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

          <Card>
            <CardHeader>
              <CardTitle>Demanda dos Últimos 12 Meses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={mockData.demanda}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="medida"
                    fill="#8884d8"
                    name="Demanda Medida"
                  />
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

          <Card>
            <CardHeader>
              <CardTitle>Valor Total das Faturas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.valores}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;