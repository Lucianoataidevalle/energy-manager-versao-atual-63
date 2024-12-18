import { getMonthsByScreenSize } from "@/utils/dateUtils";
import { formatMonthYear, parseMonthString } from "@/utils/dateUtils";

export const calculateChartData = (
  chartId: string,
  selectedCompany: string,
  selectedUnit: string,
  selectedMonth: string,
  invoices: any[],
  generatorUnits: any[]
) => {
  const months = getMonthsByScreenSize(selectedMonth);
  const generatorUnit = generatorUnits.find(
    unit => unit.empresa === selectedCompany && unit.unidadeConsumidora === selectedUnit
  );

  switch (chartId) {
    case "consumption":
      return months.map(month => {
        const invoice = invoices.find(inv => 
          inv.empresa === selectedCompany && 
          inv.unidade === selectedUnit &&
          inv.mes === month
        );
        const ponta = Number(invoice?.consumoPonta || 0);
        const foraPonta = Number(invoice?.consumoForaPonta || 0);
        return {
          mes: formatMonthYear(parseMonthString(month)),
          ponta,
          foraPonta,
          total: ponta + foraPonta
        };
      });

    case "demand":
      return months.map(month => {
        const invoice = invoices.find(inv => 
          inv.empresa === selectedCompany && 
          inv.unidade === selectedUnit &&
          inv.mes === month
        );
        return {
          mes: formatMonthYear(parseMonthString(month)),
          demandaMedidaPonta: Number(invoice?.demandaMedidaPonta || 0),
          demandaMedidaForaPonta: Number(invoice?.demandaMedidaForaPonta || 0)
        };
      });

    case "generation":
      return months.map(month => {
        const invoice = invoices.find(inv => 
          inv.empresa === selectedCompany && 
          inv.unidade === selectedUnit &&
          inv.mes === month
        );
        const monthIndex = new Date(month).getMonth();
        const monthNames = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
                         'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        return {
          mes: formatMonthYear(parseMonthString(month)),
          geracaoTotal: Number(invoice?.geracaoTotal || 0),
          estimativaGeracao: Number(generatorUnit?.estimativaGeracao[monthNames[monthIndex]] || 0)
        };
      });

    case "billing":
    case "fines":
      return months.map(month => {
        const invoice = invoices.find(inv => 
          inv.empresa === selectedCompany && 
          inv.unidade === selectedUnit &&
          inv.mes === month
        );
        return {
          mes: formatMonthYear(parseMonthString(month)),
          valor: chartId === "billing" ? Number(invoice?.valorFatura || 0) : Number(invoice?.multasJuros || 0)
        };
      });

    case "reactiveEnergy":
      return months.map(month => {
        const invoice = invoices.find(inv => 
          inv.empresa === selectedCompany && 
          inv.unidade === selectedUnit &&
          inv.mes === month
        );
        const ponta = Number(invoice?.energiaReativaPonta || 0);
        const foraPonta = Number(invoice?.energiaReativaForaPonta || 0);
        return {
          mes: formatMonthYear(parseMonthString(month)),
          ponta,
          foraPonta,
          total: ponta + foraPonta
        };
      });

    case "reactiveDemand":
      return months.map(month => {
        const invoice = invoices.find(inv => 
          inv.empresa === selectedCompany && 
          inv.unidade === selectedUnit &&
          inv.mes === month
        );
        return {
          mes: formatMonthYear(parseMonthString(month)),
          demandaReativaPonta: Number(invoice?.demandaReativaPonta || 0),
          demandaReativaForaPonta: Number(invoice?.demandaReativaForaPonta || 0)
        };
      });

    default:
      return [];
  }
};