import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";

interface DashboardSummaryProps {
  selectedCompany: string;
  selectedUnit: string;
}

const DashboardSummary = ({ selectedCompany, selectedUnit }: DashboardSummaryProps) => {
  const { invoices } = useData();

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.empresa === selectedCompany && invoice.unidade === selectedUnit
  );

  const calculateAverages = () => {
    if (filteredInvoices.length === 0) return { consumption: 0, demand: 0, total: 0 };

    const sum = filteredInvoices.reduce(
      (acc, invoice) => ({
        consumption: acc.consumption + (invoice.consumoPonta + invoice.consumoForaPonta),
        demand: acc.demand + (invoice.demandaMedidaForaPonta + invoice.demandaMedidaPonta),
        total: acc.total + invoice.valorFatura,
      }),
      { consumption: 0, demand: 0, total: 0 }
    );

    return {
      consumption: sum.consumption / filteredInvoices.length,
      demand: sum.demand / filteredInvoices.length,
      total: sum.total / filteredInvoices.length,
    };
  };

  const averages = calculateAverages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <Card className="h-[90px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Consumo Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">
            {averages.consumption.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}{" "}
            kWh
          </p>
        </CardContent>
      </Card>
      <Card className="h-[90px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Demanda Média</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">
            {averages.demand.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}{" "}
            kW
          </p>
        </CardContent>
      </Card>
      <Card className="h-[90px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Valor Total Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">
            {averages.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;