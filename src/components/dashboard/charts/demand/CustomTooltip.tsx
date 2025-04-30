
import { formatNumber } from "@/utils/formatters";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    // Get the modalidade from the payload
    const modalidadeTarifaria = payload[0]?.payload?.modalidadeTarifaria;
    const isAzul = modalidadeTarifaria === "Azul";
    
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        {payload.map((entry: any) => {
          // Special handling for demand values - show original measured values
          if (entry.dataKey === "demandaMedidaPonta" && isAzul) {
            return (
              <div key={entry.name} className="text-sm">
                <span style={{ color: entry.color }}>Medida Ponta: </span>
                <span>{formatNumber(payload[0].payload.demandaMedidaPontaOriginal)}</span>
              </div>
            );
          } 
          else if (entry.dataKey === "demandaMedidaForaPonta") {
            return (
              <div key={entry.name} className="text-sm">
                <span style={{ color: entry.color }}>{isAzul ? "Medida Fora Ponta" : "Medida"}: </span>
                <span>{formatNumber(payload[0].payload.demandaMedidaForaPontaOriginal)}</span>
              </div>
            );
          }
          // Regular entries
          else if (
            entry.dataKey !== "demandaMedidaPontaOriginal" && 
            entry.dataKey !== "demandaMedidaForaPontaOriginal" &&
            entry.value !== undefined
          ) {
            return (
              <div key={entry.name} className="text-sm">
                <span style={{ color: entry.color }}>{entry.name}: </span>
                <span>{formatNumber(entry.value)}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};
