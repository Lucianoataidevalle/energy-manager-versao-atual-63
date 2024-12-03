import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";

interface DashboardSummaryProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DashboardSummary = ({ selectedCompany, selectedUnit, selectedMonth }: DashboardSummaryProps) => {
  const { invoices } = useData();

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.empresa === selectedCompany && invoice.unidade === selectedUnit
  );

  const last12Months = filteredInvoices.slice(-12);
  const currentMonthInvoice = filteredInvoices.find(
    (invoice) => invoice.mes === selectedMonth
  );

  const calculateAverages = () => {
    if (last12Months.length === 0) return { consumption: 0, demand: 0, total: 0 };

    const sum = last12Months.reduce(
      (acc, invoice) => ({
        consumption: acc.consumption + (invoice.consumoPonta + invoice.consumoForaPonta),
        demand: acc.demand + (invoice.demandaMedidaForaPonta + invoice.demandaMedidaPonta),
        total: acc.total + invoice.valorFatura,
      }),
      { consumption: 0, demand: 0, total: 0 }
    );

    return {
      consumption: sum.consumption / last12Months.length,
      demand: sum.demand / last12Months.length,
      total: sum.total / last12Months.length,
    };
  };

  const calculateAvoidableCosts = (invoices: typeof last12Months) => {
    return invoices.reduce((total, invoice) => {
      return total + (
        invoice.demandaUltrapassagemForaPonta +
        invoice.demandaUltrapassagemPonta +
        invoice.custoEnergiaReativaForaPonta +
        invoice.custoEnergiaReativaPonta +
        invoice.custoDemandaReativaForaPonta +
        invoice.custoDemandaReativaPonta +
        invoice.multasJuros
      );
    }, 0);
  };

  const averages = calculateAverages();
  const currentConsumption = currentMonthInvoice ? 
    currentMonthInvoice.consumoPonta + currentMonthInvoice.consumoForaPonta : 0;
  const currentDemand = currentMonthInvoice ? 
    currentMonthInvoice.demandaMedidaForaPonta + currentMonthInvoice.demandaMedidaPonta : 0;
  const currentTotal = currentMonthInvoice?.valorFatura || 0;
  
  const totalAvoidableCosts = calculateAvoidableCosts(last12Months);
  const currentAvoidableCosts = currentMonthInvoice ? 
    calculateAvoidableCosts([currentMonthInvoice]) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Consumo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mês Atual</p>
            <p className="text-2xl font-bold">
              {currentConsumption.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
              })}{" "}
              kWh
            </p>
            <p className="text-sm text-muted-foreground">Média 12 meses</p>
            <p className="text-lg font-semibold">
              {averages.consumption.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
              })}{" "}
              kWh
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Demanda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mês Atual</p>
            <p className="text-2xl font-bold">
              {currentDemand.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
              })}{" "}
              kW
            </p>
            <p className="text-sm text-muted-foreground">Média 12 meses</p>
            <p className="text-lg font-semibold">
              {averages.demand.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
              })}{" "}
              kW
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Custos Evitáveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mês Atual</p>
            <p className="text-2xl font-bold">
              {currentAvoidableCosts.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-sm text-muted-foreground">Total 12 meses</p>
            <p className="text-lg font-semibold">
              {totalAvoidableCosts.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Custo de Faturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mês Atual</p>
            <p className="text-2xl font-bold">
              {currentTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-sm text-muted-foreground">Média 12 meses</p>
            <p className="text-lg font-semibold">
              {averages.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;