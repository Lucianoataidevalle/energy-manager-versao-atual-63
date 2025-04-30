
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useData } from "@/contexts/DataContext";
import { CustomTooltip } from "./charts/demand/CustomTooltip";
import { getContractedDemand } from "./charts/demand/ChartConfig";
import { useDemandChart } from "@/hooks/charts/useDemandChart";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  chartStyles?: {
    height: number;
    barSize: number;
    margin: {
      top: number;
      right: number;
      left: number;
      bottom: number;
    };
  };
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth, chartStyles }: DemandChartProps) => {
  const { consumerUnits } = useData();
  const chartData = useDemandChart({ selectedCompany, selectedUnit, selectedMonth });
  const { modalidadeTarifaria, demandaContratada, demandaContratadaPonta, demandaContratadaForaPonta } = 
    getContractedDemand(consumerUnits, selectedCompany, selectedUnit);
  const isAzul = modalidadeTarifaria === "Azul";

  // Add contracted demand to chart data
  const enhancedChartData = chartData.map(item => {
    return {
      ...item,
      demandaContratada: !isAzul ? demandaContratada : 0,
      demandaContratadaPonta: isAzul ? demandaContratadaPonta : 0,
      demandaContratadaForaPonta: isAzul ? demandaContratadaForaPonta : 0
    };
  });

  // Set chart dimensions based on provided styles
  const height = chartStyles?.height || 280;
  const barSize = chartStyles?.barSize || 20;
  const margin = chartStyles?.margin || { top: 20, right: 30, left: 20, bottom: 5 };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demanda (kW)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart 
            data={enhancedChartData}
            margin={margin}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {isAzul ? (
              <>
                <Line
                  type="monotone"
                  dataKey="demandaContratadaForaPonta"
                  stroke="#ff7300"
                  name="Contratada Fora Ponta"
                />
                <Line
                  type="monotone"
                  dataKey="demandaContratadaPonta"
                  stroke="#ff0000"
                  name="Contratada Ponta"
                />
                {/* First stack - Demanda Medida Fora Ponta */}
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  stackId="foraPonta"
                  fill="#8884d8" 
                  name="Medida Fora Ponta"
                  barSize={barSize}
                />
                {/* Second stack - Ultrapassagem Fora Ponta on top */}
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="foraPonta"
                  fill="#483d8b" 
                  name="Ultrapassagem Fora Ponta"
                  barSize={barSize}
                />

                {/* First stack - Demanda Medida Ponta */}
                <Bar
                  dataKey="demandaMedidaPonta"
                  stackId="ponta"
                  fill="#82ca9d"
                  name="Medida Ponta"
                  barSize={barSize}
                />
                {/* Second stack - Ultrapassagem Ponta on top */}
                <Bar
                  dataKey="demandaUltrapassagemPonta"
                  stackId="ponta"
                  fill="#2e8b57"
                  name="Ultrapassagem Ponta"
                  barSize={barSize}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="demandaContratada"
                  stroke="#ff7300"
                  name="Contratada"
                />
                {/* First stack - Demanda Medida */}
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  stackId="demanda"
                  fill="#8884d8" 
                  name="Medida"
                  barSize={barSize}
                />
                {/* Second stack - Ultrapassagem on top */}
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="demanda"
                  fill="#483d8b" 
                  name="Ultrapassagem"
                  barSize={barSize}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandChart;
