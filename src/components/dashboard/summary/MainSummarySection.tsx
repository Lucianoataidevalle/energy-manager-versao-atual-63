
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import SummaryCard from "./SummaryCard";

interface MainSummarySectionProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const MainSummarySection = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: MainSummarySectionProps) => {
  const { currentMetrics, averageMetrics } = useDashboardSummary(
    selectedCompany,
    selectedUnit,
    selectedMonth
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Consumo"
        currentValue={currentMetrics.consumption}
        averageValue={averageMetrics.consumption}
        unit="kWh"
      />
      <SummaryCard
        title="Demanda"
        currentValue={currentMetrics.demand}
        averageValue={averageMetrics.demand}
        unit="kW"
      />
      <SummaryCard
        title="Geração de Energia"
        currentValue={currentMetrics.generation}
        averageValue={averageMetrics.generation}
        unit="kWh"
      />
      <SummaryCard
        title="Custo de Faturas"
        currentValue={currentMetrics.total}
        averageValue={averageMetrics.total}
        isCurrency={true}
      />
    </div>
  );
};

export default MainSummarySection;
