import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { getContractedDemand, getLast12MonthsData } from "./DemandChart/utils";
import { Chart } from "./DemandChart/Chart";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
  const { invoices, consumerUnits } = useData();

  const contractedDemand = getContractedDemand(consumerUnits, selectedCompany, selectedUnit);
  const chartData = getLast12MonthsData(selectedMonth, selectedCompany, selectedUnit, invoices, contractedDemand);
  const isAzul = contractedDemand.modalidadeTarifaria === "Azul";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demanda (kW)</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart data={chartData} isAzul={isAzul} />
      </CardContent>
    </Card>
  );
};

export default DemandChart;