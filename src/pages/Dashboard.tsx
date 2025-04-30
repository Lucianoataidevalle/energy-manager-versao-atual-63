
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import DemandChart from "@/components/dashboard/DemandChart";
import BillingChart from "@/components/dashboard/BillingChart";
import ReactiveEnergyChart from "@/components/dashboard/ReactiveEnergyChart";
import ReactiveDemandChart from "@/components/dashboard/ReactiveDemandChart";
import FinesChart from "@/components/dashboard/FinesChart";
import GenerationChart from "@/components/dashboard/GenerationChart";
import { format, subMonths } from "date-fns";

const CHART_ORDER = [
  "consumption",
  "demand",
  "generation",
  "billing",
  "reactiveEnergy",
  "reactiveDemand",
  "fines"
];

// Define consistent chart dimensions for all charts
const CHART_STYLES = {
  height: 300,
  barSize: 40, // Uniform bar width
  margin: { top: 20, right: 30, left: 40, bottom: 20 }
};

const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    format(subMonths(new Date(), 1), "yyyy-MM")
  );
  const [visibleCharts, setVisibleCharts] = useState(CHART_ORDER);

  const handleVisibleChartsChange = (newCharts: string[]) => {
    const orderedCharts = CHART_ORDER.filter(chartId => newCharts.includes(chartId));
    setVisibleCharts(orderedCharts);
  };

  const renderChart = (chartId: string) => {
    if (!visibleCharts.includes(chartId)) return null;

    const chartProps = {
      selectedCompany,
      selectedUnit,
      selectedMonth,
      chartStyles: CHART_STYLES
    };

    const charts: Record<string, JSX.Element | null> = {
      consumption: <ConsumptionChart {...chartProps} />,
      demand: <DemandChart {...chartProps} />,
      generation: <GenerationChart {...chartProps} />,
      billing: <BillingChart {...chartProps} />,
      reactiveEnergy: <ReactiveEnergyChart {...chartProps} />,
      reactiveDemand: <ReactiveDemandChart {...chartProps} />,
      fines: <FinesChart {...chartProps} />,
    };

    return charts[chartId] || null;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="md:sticky md:top-0 bg-background z-40">
          <DashboardHeader
            selectedCompany={selectedCompany}
            selectedUnit={selectedUnit}
            selectedMonth={selectedMonth}
            onCompanyChange={setSelectedCompany}
            onUnitChange={setSelectedUnit}
            onMonthChange={setSelectedMonth}
            visibleCharts={visibleCharts}
            onVisibleChartsChange={handleVisibleChartsChange}
          />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4">
            {selectedCompany && selectedUnit && (
              <DashboardSummary
                selectedCompany={selectedCompany}
                selectedUnit={selectedUnit}
                selectedMonth={selectedMonth}
              />
            )}
            {selectedCompany && selectedUnit && visibleCharts.map((chartId) => (
              <div key={chartId} className="w-full">
                {renderChart(chartId)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
