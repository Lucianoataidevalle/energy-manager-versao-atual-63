
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface ReactiveDemandChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useReactiveDemandChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: ReactiveDemandChartParams) => {
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
      demandaReativaPonta: Number(invoice?.demandaReativaPonta || 0),
      demandaReativaForaPonta: Number(invoice?.demandaReativaForaPonta || 0)
    };
  });
};
