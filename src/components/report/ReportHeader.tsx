import { CompanySelect } from "../dashboard/header/CompanySelect";
import { UnitSelect } from "../dashboard/header/UnitSelect";
import { MonthSelect } from "../dashboard/header/MonthSelect";
import { MultipleChartSelect } from "../dashboard/MultipleChartSelect";
import FullscreenButton from "../shared/FullscreenButton";

interface ReportHeaderProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
  onMonthChange: (month: string) => void;
  visibleCharts: string[];
  onVisibleChartsChange: (charts: string[]) => void;
}

const ReportHeader = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
  onCompanyChange,
  onUnitChange,
  onMonthChange,
  visibleCharts,
  onVisibleChartsChange,
}: ReportHeaderProps) => {
  return (
    <div className="border-b">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Relatório</h1>
          <div className="flex items-center gap-2">
            <MultipleChartSelect
              visibleCharts={visibleCharts}
              onVisibleChartsChange={onVisibleChartsChange}
            />
            <FullscreenButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;