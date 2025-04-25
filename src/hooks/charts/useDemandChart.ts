
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface DemandChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useDemandChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: DemandChartParams) => {
  const { invoices } = useData();
  const months = getMonthsByScreenSize(selectedMonth);

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
};
