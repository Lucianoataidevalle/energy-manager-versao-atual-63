
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";
import { getContractedDemand, calculateDemandaUltrapassagem } from "@/components/dashboard/charts/demand/ChartConfig";

interface DemandChartParams {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  chartStyles?: any;
}

export const useDemandChart = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: DemandChartParams) => {
  const { invoices, consumerUnits } = useData();
  const months = getMonthsByScreenSize(selectedMonth);
  
  // Get consumer unit to determine modalidade tarifária
  const unit = consumerUnits.find(
    unit => unit.empresa === selectedCompany && unit.nome === selectedUnit
  );
  
  // Get contracted demand values
  const { 
    modalidadeTarifaria, 
    demandaContratada, 
    demandaContratadaPonta, 
    demandaContratadaForaPonta 
  } = getContractedDemand(consumerUnits, selectedCompany, selectedUnit);
  
  const isAzul = modalidadeTarifaria === "Azul";

  return months.map(month => {
    const invoice = invoices.find(inv => 
      inv.empresa === selectedCompany && 
      inv.unidade === selectedUnit &&
      inv.mes === month
    );
    
    // Calculate measured demand values
    const demandaMedidaPonta = Number(invoice?.demandaMedidaPonta || 0);
    const demandaMedidaForaPonta = Number(invoice?.demandaMedidaForaPonta || 0);
    
    // Calculate exceeding demand
    const demandaUltrapassagemPonta = isAzul 
      ? calculateDemandaUltrapassagem(demandaMedidaPonta, demandaContratadaPonta)
      : 0;
      
    const demandaUltrapassagemForaPonta = isAzul 
      ? calculateDemandaUltrapassagem(demandaMedidaForaPonta, demandaContratadaForaPonta)
      : calculateDemandaUltrapassagem(demandaMedidaForaPonta, demandaContratada);

    // The "real" demand measured is the total minus exceeding
    const demandaMedidaPontaReal = demandaMedidaPonta - demandaUltrapassagemPonta;
    const demandaMedidaForaPontaReal = demandaMedidaForaPonta - demandaUltrapassagemForaPonta;
    
    return {
      mes: formatMonthYear(parseMonthString(month)),
      demandaMedidaPonta: demandaMedidaPontaReal,
      demandaMedidaForaPonta: demandaMedidaForaPontaReal,
      demandaUltrapassagemPonta,
      demandaUltrapassagemForaPonta,
      modalidadeTarifaria: modalidadeTarifaria || ""
    };
  });
};
