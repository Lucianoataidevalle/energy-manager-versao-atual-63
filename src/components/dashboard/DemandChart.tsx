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
import { getContractedDemand, getChartData } from "./charts/demand/ChartConfig";
import { parseMonthString } from "@/utils/dateUtils";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
  const { invoices, consumerUnits } = useData();
  const selectedDate = parseMonthString(selectedMonth);
  const chartData = getChartData(selectedDate, invoices, selectedCompany, selectedUnit, getContractedDemand, consumerUnits);
  const { modalidadeTarifaria } = getContractedDemand(consumerUnits, selectedCompany, selectedUnit);
  const isAzul = modalidadeTarifaria === "Azul";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demanda (kW)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  stackId="foraPonta"
                  fill="#8884d8" 
                  name="Medida Fora Ponta"
                  barSize={20}
                  order={2}
                />
                <Bar
                  dataKey="demandaMedidaPonta"
                  stackId="ponta"
                  fill="#82ca9d"
                  name="Medida Ponta"
                  barSize={20}
                  order={2}
                />
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="foraPonta"
                  fill="#483d8b" 
                  name="Ultrapassagem Fora Ponta"
                  barSize={20}
                  order={1}
                />
                <Bar
                  dataKey="demandaUltrapassagemPonta"
                  stackId="ponta"
                  fill="#2e8b57"
                  name="Ultrapassagem Ponta"
                  barSize={20}
                  order={1}
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
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  stackId="demanda"
                  fill="#8884d8" 
                  name="Medida"
                  barSize={20}
                  order={2}
                />
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="demanda"
                  fill="#483d8b" 
                  name="Ultrapassagem"
                  barSize={20}
                  order={1}
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