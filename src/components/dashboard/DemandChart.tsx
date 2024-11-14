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

  const calculateOverageDemand = (measured: number, contracted: number) => {
    const threshold = contracted * 1.05;
    return measured > threshold ? measured - contracted : 0;
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
          demandaContratada: 0,
          demandaContratadaPonta: 0,
          demandaContratadaForaPonta: 0,
          demandaUltrapassagemForaPonta: 0,
          demandaUltrapassagemPonta: 0,
          demandaEfetivaForaPonta: 0,
          demandaEfetivaPonta: 0
        };
      }

      const demandaMedidaForaPonta = invoice?.demandaMedidaForaPonta || 0;
      const demandaMedidaPonta = invoice?.demandaMedidaPonta || 0;

      const demandaUltrapassagemForaPonta = modalidadeTarifaria === "Azul" 
        ? calculateOverageDemand(demandaMedidaForaPonta, demandaContratadaForaPonta)
        : calculateOverageDemand(demandaMedidaForaPonta, demandaContratada);

      const demandaUltrapassagemPonta = modalidadeTarifaria === "Azul"
        ? calculateOverageDemand(demandaMedidaPonta, demandaContratadaPonta)
        : 0;

      const demandaEfetivaForaPonta = demandaMedidaForaPonta - demandaUltrapassagemForaPonta;
      const demandaEfetivaPonta = demandaMedidaPonta - demandaUltrapassagemPonta;

      return {
        mes: format(monthDate, "MMM/yy", { locale: ptBR }),
        demandaEfetivaForaPonta,
        demandaEfetivaPonta,
        demandaUltrapassagemForaPonta,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Demanda (kW)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={270}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            {isAzul ? (
              <>
                <Bar 
                  dataKey="demandaEfetivaForaPonta" 
                  stackId="foraPonta"
                  fill="#8884d8" 
                  name="Demanda Efetiva Fora Ponta"
                  barSize={20}
                />
                <Bar
                  dataKey="demandaUltrapassagemForaPonta"
                  stackId="foraPonta"
                  fill="#ff7300"
                  name="Demanda Ultrapassagem Fora Ponta"
                  barSize={20}
                />
                <Bar 
                  dataKey="demandaEfetivaPonta" 
                  stackId="ponta"
                  fill="#82ca9d"
                  name="Demanda Efetiva Ponta"
                  barSize={20}
                />
                <Bar
                  dataKey="demandaUltrapassagemPonta"
                  stackId="ponta"
                  fill="#ff0000"
                  name="Demanda Ultrapassagem Ponta"
                  barSize={20}
                />
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
              </>
            ) : (
              <>
                <Bar 
                  dataKey="demandaEfetivaForaPonta" 
                  stackId="foraPonta"
                  fill="#8884d8" 
                  name="Demanda Efetiva"
                  barSize={20}
                />
                <Bar
                  dataKey="demandaUltrapassagemForaPonta"
                  stackId="foraPonta"
                  fill="#ff7300"
                  name="Demanda Ultrapassagem"
                  barSize={20}
                />
                <Line
                  type="monotone"
                  dataKey="demandaContratada"
                  stroke="#ff7300"
                  name="Demanda Contratada"
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