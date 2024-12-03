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
import { format, subMonths, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DemandChartProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const DemandChart = ({ selectedCompany, selectedUnit, selectedMonth }: DemandChartProps) => {
  const { invoices, consumerUnits } = useData();

  const getContractedDemand = () => {
    const unit = consumerUnits.find(
      unit => unit.empresa === selectedCompany && unit.nome === selectedUnit
    );
    return {
      demandaContratada: unit?.demandaContratada ? Number(unit.demandaContratada) : 0,
      demandaContratadaPonta: unit?.demandaContratadaPonta ? Number(unit.demandaContratadaPonta) : 0,
      demandaContratadaForaPonta: unit?.demandaContratadaForaPonta ? Number(unit.demandaContratadaForaPonta) : 0,
      modalidadeTarifaria: unit?.modalidadeTarifaria || ""
    };
  };

  const calculateDemandaUltrapassagem = (medida: number, contratada: number) => {
    const limite = contratada * 1.05;
    return medida > limite ? medida - contratada : 0;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getLast12MonthsData = () => {
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    if (!isValid(selectedDate)) {
      console.error('Invalid date:', selectedMonth);
      return [];
    }

    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(selectedDate, i);
      return format(date, 'yyyy-MM');
    }).reverse();

    const { demandaContratada, demandaContratadaPonta, demandaContratadaForaPonta, modalidadeTarifaria } = getContractedDemand();

    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );

      const monthDate = parse(month, 'yyyy-MM', new Date());
      if (!isValid(monthDate)) {
        console.error('Invalid month date:', month);
        return {
          mes: month,
          demandaMedidaForaPonta: 0,
          demandaMedidaPonta: 0,
          demandaUltrapassagemForaPonta: 0,
          demandaUltrapassagemPonta: 0,
          demandaContratada: 0,
          demandaContratadaPonta: 0,
          demandaContratadaForaPonta: 0
        };
      }

      const demandaUltrapassagemForaPonta = modalidadeTarifaria === "Azul" 
        ? calculateDemandaUltrapassagem(invoice?.demandaMedidaForaPonta || 0, demandaContratadaForaPonta)
        : 0;
      
      const demandaUltrapassagemPonta = modalidadeTarifaria === "Azul"
        ? calculateDemandaUltrapassagem(invoice?.demandaMedidaPonta || 0, demandaContratadaPonta)
        : 0;

      const demandaUltrapassagemVerde = modalidadeTarifaria === "Verde"
        ? calculateDemandaUltrapassagem(invoice?.demandaMedidaForaPonta || 0, demandaContratada)
        : 0;

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        demandaMedidaForaPonta: (invoice?.demandaMedidaForaPonta || 0),
        demandaMedidaPonta: (invoice?.demandaMedidaPonta || 0),
        demandaUltrapassagemForaPonta: modalidadeTarifaria === "Verde" ? demandaUltrapassagemVerde : demandaUltrapassagemForaPonta,
        demandaUltrapassagemPonta,
        demandaContratada: modalidadeTarifaria === "Verde" ? demandaContratada : 0,
        demandaContratadaPonta: modalidadeTarifaria === "Azul" ? demandaContratadaPonta : 0,
        demandaContratadaForaPonta: modalidadeTarifaria === "Azul" ? demandaContratadaForaPonta : 0
      };
    });
  };

  const chartData = getLast12MonthsData();
  const { modalidadeTarifaria } = getContractedDemand();
  const isAzul = modalidadeTarifaria === "Azul";

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="text-sm">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span>{formatNumber(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demanda (kW)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
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
                  order={2}
                />
                <Bar
                  dataKey="demandaMedidaPonta"
                  stackId="ponta"
                  fill="#82ca9d"
                  name="Demanda Medida Ponta"
                  barSize={20}
                  order={2}
                />
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="foraPonta"
                  fill="#483d8b" 
                  name="Demanda de Ultrapassagem Fora Ponta"
                  barSize={20}
                  order={1}
                />
                <Bar
                  dataKey="demandaUltrapassagemPonta"
                  stackId="ponta"
                  fill="#2e8b57"
                  name="Demanda de Ultrapassagem Ponta"
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
                  name="Demanda Contratada"
                />
                <Bar 
                  dataKey="demandaMedidaForaPonta" 
                  stackId="demanda"
                  fill="#8884d8" 
                  name="Demanda Medida"
                  barSize={20}
                  order={2}
                />
                <Bar 
                  dataKey="demandaUltrapassagemForaPonta" 
                  stackId="demanda"
                  fill="#483d8b" 
                  name="Demanda de Ultrapassagem"
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