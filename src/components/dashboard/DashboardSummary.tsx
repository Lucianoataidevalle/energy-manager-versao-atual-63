import MainSummarySection from "./summary/MainSummarySection";
import AvoidableCostsSection from "./summary/AvoidableCostsSection";

interface DashboardSummaryProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DashboardSummary = ({ selectedCompany, selectedUnit, selectedMonth }: DashboardSummaryProps) => {
  return (
    <div className="space-y-8">
      <MainSummarySection
        selectedCompany={selectedCompany}
        selectedUnit={selectedUnit}
        selectedMonth={selectedMonth}
      />
      <AvoidableCostsSection
        selectedCompany={selectedCompany}
        selectedUnit={selectedUnit}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default DashboardSummary;