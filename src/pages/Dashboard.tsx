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

const Dashboard = () => {
  const { companies, consumerUnits } = useData();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

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

  useEffect(() => {
    if (!selectedMonth) {
      const previousMonth = format(subMonths(new Date(), 1), "yyyy-MM");
      setSelectedMonth(previousMonth);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <DashboardHeader
          selectedCompany={selectedCompany}
          selectedUnit={selectedUnit}
          selectedMonth={selectedMonth}
          onCompanyChange={setSelectedCompany}
          onUnitChange={setSelectedUnit}
          onMonthChange={setSelectedMonth}
        />
        <div className="p-8 mt-32">
          <DashboardSummary 
            selectedCompany={selectedCompany}
            selectedUnit={selectedUnit}
          />

          <div className="space-y-8">
            <ConsumptionChart 
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
            <DemandChart 
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
            <BillingChart 
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
            <ReactiveEnergyChart 
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
            <ReactiveDemandChart 
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
            <FinesChart 
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;