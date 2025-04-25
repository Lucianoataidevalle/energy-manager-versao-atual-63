
import { useChartData } from "@/hooks/useChartData";

export const calculateChartData = (
  chartId: string,
  selectedCompany: string,
  selectedUnit: string,
  selectedMonth: string,
  invoices: any[],
  generatorUnits: any[]
) => {
  // Using the hook as a function to maintain backward compatibility
  return useChartData({ chartId, selectedCompany, selectedUnit, selectedMonth });
};
