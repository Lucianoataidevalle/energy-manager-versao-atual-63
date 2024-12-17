import { CompanySelect } from "./header/CompanySelect";
import { UnitSelect } from "./header/UnitSelect";
import { MonthSelect } from "./header/MonthSelect";
import { MultipleChartSelect } from "./MultipleChartSelect";
import FullscreenButton from "../shared/FullscreenButton";

interface DashboardHeaderProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
  onMonthChange: (month: string) => void;
  visibleCharts: string[];
  onVisibleChartsChange: (charts: string[]) => void;
}

const DashboardHeader = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
  onCompanyChange,
  onUnitChange,
  onMonthChange,
  visibleCharts,
  onVisibleChartsChange,
}: DashboardHeaderProps) => {
  return (
    <div className="border-b">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <FullscreenButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CompanySelect
            selectedCompany={selectedCompany}
            onCompanyChange={onCompanyChange}
          />
          <UnitSelect
            selectedCompany={selectedCompany}
            selectedUnit={selectedUnit}
            onUnitChange={onUnitChange}
          />
          <MonthSelect
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Gráficos</label>
            <MultipleChartSelect
              visibleCharts={visibleCharts}
              onVisibleChartsChange={onVisibleChartsChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;