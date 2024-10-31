import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import DemandChart from "@/components/dashboard/DemandChart";
import BillingChart from "@/components/dashboard/BillingChart";

const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("12");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <DashboardHeader
          selectedCompany={selectedCompany}
          selectedUnit={selectedUnit}
          selectedMonth={selectedMonth}
          onCompanyChange={setSelectedCompany}
          onUnitChange={setSelectedUnit}
          onMonthChange={setSelectedMonth}
        />

        <DashboardSummary />

        <div className="space-y-8">
          <ConsumptionChart selectedMonth={selectedMonth} />
          <DemandChart selectedMonth={selectedMonth} />
          <BillingChart selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;