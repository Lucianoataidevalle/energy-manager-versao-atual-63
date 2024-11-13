import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DashboardSummaryProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DashboardSummary = ({ selectedCompany, selectedUnit, selectedMonth }: DashboardSummaryProps) => {
  const { invoices } = useData();

  const getCurrentMonthData = () => {
    const invoice = invoices.find(
      inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit && 
        inv.mes === selectedMonth
    );

    return {
      consumption: invoice ? invoice.consumoPonta + invoice.consumoForaPonta : 0,
      demand: invoice ? invoice.demandaMedidaForaPonta + invoice.demandaMedidaPonta : 0,
      total: invoice ? invoice.valorFatura : 0,
    };
  };

  const currentData = getCurrentMonthData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Consumo Médio</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-end">
          <p className="text-2xl font-bold">
            {currentData.consumption.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}{" "}
            kWh
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Demanda Média</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-end">
          <p className="text-2xl font-bold">
            {currentData.demand.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}{" "}
            kW
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Valor Total Médio</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-end">
          <p className="text-2xl font-bold">
            {currentData.total.toLocaleString("pt-BR", {
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