
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface ReactiveEnergyChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useReactiveEnergyChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: ReactiveEnergyChartParams) => {
  const { invoices } = useData();
  const months = getMonthsByScreenSize(selectedMonth);

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
};
