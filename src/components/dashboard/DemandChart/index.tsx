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
import CustomTooltip from "./CustomTooltip";
import { getContractedDemand, getLast12MonthsData } from "./utils";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
  const { invoices, consumerUnits } = useData();
  const chartData = getLast12MonthsData(selectedMonth, selectedCompany, selectedUnit, invoices, consumerUnits);
  const { modalidadeTarifaria } = getContractedDemand(consumerUnits, selectedCompany, selectedUnit);
  const isAzul = modalidadeTarifaria === "Azul";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demanda (kW)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart 
            data={chartData}
            margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
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
                  name="Demanda Contratada Fora Ponta"
                />
                <Line
                  type="monotone"
                  dataKey="demandaContratadaPonta"
                  stroke="#ff0000"
                  name="Demanda Contratada Ponta"
                />
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  stackId="foraPonta"
                  fill="#8884d8" 
                  name="Demanda Medida Fora Ponta"
                  barSize={20}
                />
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="foraPonta"
                  fill="#483d8b" 
                  name="Demanda de Ultrapassagem Fora Ponta"
                  barSize={20}
                />
                <Bar
                  dataKey="demandaMedidaPonta"
                  stackId="ponta"
                  fill="#82ca9d"
                  name="Demanda Medida Ponta"
                  barSize={20}
                />
                <Bar
                  dataKey="demandaUltrapassagemPonta"
                  stackId="ponta"
                  fill="#2e8b57"
                  name="Demanda de Ultrapassagem Ponta"
                  barSize={20}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="demandaContratada"
                  stroke="#ff7300"
                  name="Demanda Contratada"
                />
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  fill="#8884d8" 
                  name="Demanda Medida"
                  barSize={20}
                />
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  fill="#483d8b" 
                  name="Demanda de Ultrapassagem"
                  barSize={20}
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