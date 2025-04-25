
import { useConsumptionChart } from "./charts/useConsumptionChart";
import { useDemandChart } from "./charts/useDemandChart";
import { useGenerationChart } from "./charts/useGenerationChart";
import { useBillingChart } from "./charts/useBillingChart";
import { useFinesChart } from "./charts/useFinesChart";
import { useReactiveEnergyChart } from "./charts/useReactiveEnergyChart";
import { useReactiveDemandChart } from "./charts/useReactiveDemandChart";

interface ChartDataParams {
  chartId: string;
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useChartData = ({
  chartId,
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: ChartDataParams) => {
  const params = { selectedCompany, selectedUnit, selectedMonth };
  
  const dataHooks = {
    consumption: () => useConsumptionChart(params),
    demand: () => useDemandChart(params),
    generation: () => useGenerationChart(params),
    billing: () => useBillingChart(params),
    fines: () => useFinesChart(params),
    reactiveEnergy: () => useReactiveEnergyChart(params),
    reactiveDemand: () => useReactiveDemandChart(params),
  };

  return dataHooks[chartId as keyof typeof dataHooks]?.() || [];
};
