
import { useAvoidableCosts } from "@/hooks/useAvoidableCosts";
import SummaryCard from "./SummaryCard";

interface AvoidableCostsSectionProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const AvoidableCostsSection = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: AvoidableCostsSectionProps) => {
  const { currentCosts, totalCosts } = useAvoidableCosts(
    selectedCompany,
    selectedUnit,
    selectedMonth
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Custos Evitáveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Demanda de Ultrapassagem"
          currentValue={currentCosts.demandOverrun}
          totalValue={totalCosts.demandOverrun}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
        <SummaryCard
          title="Demanda Reativa"
          currentValue={currentCosts.reactiveDemand}
          totalValue={totalCosts.reactiveDemand}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
        <SummaryCard
          title="Energia Reativa"
          currentValue={currentCosts.reactiveEnergy}
          totalValue={totalCosts.reactiveEnergy}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
        <SummaryCard
          title="Multas/Juros"
          currentValue={currentCosts.fines}
          totalValue={totalCosts.fines}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
      </div>
    </div>
  );
};

export default AvoidableCostsSection;
