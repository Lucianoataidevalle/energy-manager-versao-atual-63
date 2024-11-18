import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import DemandChart from "@/components/dashboard/DemandChart";
import BillingChart from "@/components/dashboard/BillingChart";
import ReactiveEnergyChart from "@/components/dashboard/ReactiveEnergyChart";
import ReactiveDemandChart from "@/components/dashboard/ReactiveDemandChart";
import FinesChart from "@/components/dashboard/FinesChart";
import { useData } from "@/contexts/DataContext";
import { format, subMonths } from "date-fns";

const CHART_ORDER = [
  "consumption",
  "demand",
  "billing",
  "reactiveEnergy",
  "reactiveDemand",
  "fines"
];

const Dashboard = () => {
  const { companies, consumerUnits } = useData();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    format(subMonths(new Date(), 1), "yyyy-MM")
  );
  const [visibleCharts, setVisibleCharts] = useState(CHART_ORDER);

  useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0].razaoSocial);
    }
  }, [companies]);

  useEffect(() => {
    if (selectedCompany && consumerUnits.length > 0 && !selectedUnit) {
      const companyUnits = consumerUnits.filter(
        (unit) => unit.empresa === selectedCompany
      );
      if (companyUnits.length > 0) {
        setSelectedUnit(companyUnits[0].nome);
      }
    }
  }, [selectedCompany, consumerUnits]);

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
    };

    const charts: Record<string, JSX.Element | null> = {
      consumption: <ConsumptionChart {...chartProps} />,
      demand: <DemandChart {...chartProps} />,
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
        <div className="flex flex-col">
          <div className="md:sticky md:top-0 bg-background z-40">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
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
              <DashboardSummary
                selectedCompany={selectedCompany}
                selectedUnit={selectedUnit}
              />
              {visibleCharts.map((chartId) => (
                <div key={chartId} className="w-full">
                  {renderChart(chartId)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;