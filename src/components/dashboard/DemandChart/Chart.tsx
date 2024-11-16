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
import { formatNumberBR } from "./utils";

interface ChartProps {
  data: any[];
  isAzul: boolean;
}

export const Chart = ({ data, isAzul }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip 
          formatter={(value: any, name: string) => {
            if (typeof value === 'number') {
              return [formatNumberBR(value), name];
            }
            return [value, name];
          }}
        />
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
              stackId="demanda"
              fill="#8884d8" 
              name="Demanda Medida"
              barSize={20}
            />
            <Bar 
              dataKey="demandaUltrapassagemForaPonta" 
              stackId="demanda"
              fill="#483d8b" 
              name="Demanda de Ultrapassagem"
              barSize={20}
            />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};