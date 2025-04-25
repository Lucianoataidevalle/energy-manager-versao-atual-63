
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface GenerationChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useGenerationChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: GenerationChartParams) => {
  const { invoices, generatorUnits } = useData();
  const months = getMonthsByScreenSize(selectedMonth);
  const generatorUnit = generatorUnits.find(
    unit => unit.empresa === selectedCompany && unit.unidadeConsumidora === selectedUnit
  );

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
};
