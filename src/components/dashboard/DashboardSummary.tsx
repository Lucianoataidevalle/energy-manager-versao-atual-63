import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
  );
};

export default DashboardSummary;