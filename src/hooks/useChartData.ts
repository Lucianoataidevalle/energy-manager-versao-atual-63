
import { useConsumptionChart } from "./charts/useConsumptionChart";
import { useDemandChart } from "./charts/useDemandChart";
import { useGenerationChart } from "./charts/useGenerationChart";
import { useBillingChart } from "./charts/useBillingChart";
import { useFinesChart } from "./charts/useFinesChart";
import { useReactiveEnergyChart } from "./charts/useReactiveEnergyChart";
import { useReactiveDemandChart } from "./charts/useReactiveDemandChart";

export interface ChartStyles {
  height: number;
  barSize: number;
  margin: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
}

interface ChartDataParams {
  chartId: string;
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  chartStyles?: ChartStyles;
}

export const useChartData = ({
  chartId,
  selectedCompany,
  selectedUnit,
  selectedMonth,
  chartStyles,
}: ChartDataParams) => {
  const params = { selectedCompany, selectedUnit, selectedMonth, chartStyles };
  
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
