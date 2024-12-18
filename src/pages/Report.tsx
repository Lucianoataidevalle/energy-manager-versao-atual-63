import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ReportHeader from "@/components/report/ReportHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import DemandChart from "@/components/dashboard/DemandChart";
import BillingChart from "@/components/dashboard/BillingChart";
import ReactiveEnergyChart from "@/components/dashboard/ReactiveEnergyChart";
import ReactiveDemandChart from "@/components/dashboard/ReactiveDemandChart";
import FinesChart from "@/components/dashboard/FinesChart";
import GenerationChart from "@/components/dashboard/GenerationChart";
import { useData } from "@/contexts/DataContext";
import { format, subMonths } from "date-fns";
import ChartCommentBox from "@/components/report/ChartCommentBox";
import ChartDataTable from "@/components/report/ChartDataTable";

const CHART_ORDER = [
  "consumption",
  "demand",
  "generation",
  "billing",
  "reactiveEnergy",
  "reactiveDemand",
  "fines"
];

const Report = () => {
  const { companies, consumerUnits } = useData();
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

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const renderChartWithTable = (chartId: string) => {
    if (!visibleCharts.includes(chartId)) return null;

    const chartProps = {
      selectedCompany,
      selectedUnit,
      selectedMonth,
    };

    const charts: Record<string, { component: JSX.Element, columns: any[] }> = {
      consumption: {
        component: <ConsumptionChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "ponta", label: "Ponta (kWh)", format: formatNumber },
          { key: "foraPonta", label: "Fora Ponta (kWh)", format: formatNumber },
          { key: "total", label: "Total (kWh)", format: formatNumber }
        ]
      },
      demand: {
        component: <DemandChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "demandaMedidaPonta", label: "Demanda Medida Ponta (kW)", format: formatNumber },
          { key: "demandaMedidaForaPonta", label: "Demanda Medida Fora Ponta (kW)", format: formatNumber }
        ]
      },
      generation: {
        component: <GenerationChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "geracaoTotal", label: "Geração Total (kWh)", format: formatNumber },
          { key: "estimativaGeracao", label: "Estimativa de Geração (kWh)", format: formatNumber }
        ]
      },
      billing: {
        component: <BillingChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "valor", label: "Valor (R$)", format: formatNumber }
        ]
      },
      reactiveEnergy: {
        component: <ReactiveEnergyChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "ponta", label: "Energia Reativa Ponta (kVArh)", format: formatNumber },
          { key: "foraPonta", label: "Energia Reativa Fora Ponta (kVArh)", format: formatNumber }
        ]
      },
      reactiveDemand: {
        component: <ReactiveDemandChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "demandaReativaPonta", label: "Demanda Reativa Ponta (kVAr)", format: formatNumber },
          { key: "demandaReativaForaPonta", label: "Demanda Reativa Fora Ponta (kVAr)", format: formatNumber }
        ]
      },
      fines: {
        component: <FinesChart {...chartProps} />,
        columns: [
          { key: "mes", label: "Mês" },
          { key: "valor", label: "Multas/Juros (R$)", format: formatNumber }
        ]
      }
    };

    const chart = charts[chartId];
    if (!chart) return null;

    // Get the chart data by accessing the component's internal data
    let chartData;
    switch (chartId) {
      case "consumption":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      case "demand":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      case "generation":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      case "billing":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      case "reactiveEnergy":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      case "reactiveDemand":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      case "fines":
        chartData = chart.component.type({ ...chartProps }).props.data;
        break;
      default:
        chartData = [];
    }

    return (
      <div key={chartId} className="space-y-4">
        {chart.component}
        <ChartDataTable data={chartData} columns={chart.columns} />
        <ChartCommentBox chartId={chartId} />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="md:sticky md:top-0 bg-background z-40">
          <ReportHeader
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
            {visibleCharts.map((chartId) => renderChartWithTable(chartId))}
            <div className="mt-8">
              <ChartCommentBox chartId="finalConsiderations" title="Considerações Finais" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;