
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface BillingChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useBillingChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: BillingChartParams) => {
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
      valor: Number(invoice?.valorFatura || 0)
    };
  });
};
