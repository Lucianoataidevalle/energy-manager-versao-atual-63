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
import GenerationChart from "@/components/dashboard/GenerationChart";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
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

const Dashboard = () => {
  const { companies, consumerUnits } = useData();
  const { user, isAdmin } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    format(subMonths(new Date(), 1), "yyyy-MM")
  );
  const [visibleCharts, setVisibleCharts] = useState(CHART_ORDER);

  // Filter units based on user permissions
  const userUnits = isAdmin 
    ? consumerUnits 
    : consumerUnits.filter(unit => user?.unidadesConsumidoras?.includes(unit.numero));

  useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      // Only show companies that have units the user has access to
      const userCompanies = companies.filter(company => 
        userUnits.some(unit => unit.empresa === company.razaoSocial)
      );
      if (userCompanies.length > 0) {
        setSelectedCompany(userCompanies[0].razaoSocial);
      }
    }
  }, [companies, userUnits]);

  useEffect(() => {
    if (selectedCompany && userUnits.length > 0 && !selectedUnit) {
      const companyUnits = userUnits.filter(
        (unit) => unit.empresa === selectedCompany
      );
      if (companyUnits.length > 0) {
        setSelectedUnit(companyUnits[0].nome);
      }
    }
  }, [selectedCompany, userUnits]);

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
            <DashboardSummary
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
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
  );
};

export default Dashboard;