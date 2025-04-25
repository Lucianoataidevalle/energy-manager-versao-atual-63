
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface FinesChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useFinesChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: FinesChartParams) => {
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
      valor: Number(invoice?.multasJuros || 0)
    };
  });
};
