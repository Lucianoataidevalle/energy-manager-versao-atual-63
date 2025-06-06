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
import { Card, CardContent } from "@/components/ui/card";
import ChartSection from "@/components/report/ChartSection";
import { getChartConfigurations } from "@/components/report/ChartConfigurations";
import { calculateChartData } from "@/components/report/ChartDataCalculator";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/contexts/DataContext";
import { format, subMonths } from "date-fns";
import ChartCommentBox from "@/components/report/ChartCommentBox";

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
  const { companies, consumerUnits, invoices, generatorUnits } = useData();
  const { toast } = useToast();
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

  const handlePrintReport = async () => {
    if (!selectedCompany || !selectedUnit) {
      toast({
        title: "Atenção",
        description: "Selecione uma empresa e uma unidade consumidora para gerar o relatório.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Gerando PDF",
      description: "Aguarde enquanto o relatório é gerado..."
    });

    const companyData = companies.find(c => c.razaoSocial === selectedCompany);
    const unitData = consumerUnits.find(u => u.nome === selectedUnit && u.empresa === selectedCompany);

    await generatePDF(
      selectedCompany,
      selectedUnit,
      selectedMonth,
      companyData,
      unitData
    );
  };

  const renderChartWithTable = (chartId: string) => {
    if (!visibleCharts.includes(chartId)) return null;

    const chartProps = {
      selectedCompany,
      selectedUnit,
      selectedMonth,
    };

    const chartComponents = {
      consumption: <ConsumptionChart {...chartProps} />,
      demand: <DemandChart {...chartProps} />,
      generation: <GenerationChart {...chartProps} />,
      billing: <BillingChart {...chartProps} />,
      reactiveEnergy: <ReactiveEnergyChart {...chartProps} />,
      reactiveDemand: <ReactiveDemandChart {...chartProps} />,
      fines: <FinesChart {...chartProps} />
    };

    const chartData = calculateChartData(
      chartId,
      selectedCompany,
      selectedUnit,
      selectedMonth,
      invoices,
      generatorUnits
    );

    const { columns } = getChartConfigurations()[chartId as keyof ReturnType<typeof getChartConfigurations>];

    return (
      <ChartSection
        key={chartId}
        chartId={chartId}
        chartComponent={chartComponents[chartId as keyof typeof chartComponents]}
        data={chartData}
        columns={columns}
        selectedCompany={selectedCompany}
        selectedUnit={selectedUnit}
      />
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
          <div id="report-content" className="grid grid-cols-1 gap-4">
            <DashboardSummary
              selectedCompany={selectedCompany}
              selectedUnit={selectedUnit}
              selectedMonth={selectedMonth}
            />
            {visibleCharts.map((chartId) => renderChartWithTable(chartId))}
            <Card className="mt-8 final-considerations">
              <CardContent>
                <ChartCommentBox chartId="finalConsiderations" title="Considerações Finais" />
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handlePrintReport} className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir Relatório
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;