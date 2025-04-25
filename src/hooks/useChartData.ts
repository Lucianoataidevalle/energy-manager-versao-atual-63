
import { useData } from "@/contexts/DataContext";
import { getMonthsByScreenSize, formatMonthYear, parseMonthString } from "@/utils/dateUtils";

interface ChartDataParams {
  chartId: string;
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

export const useChartData = ({
  chartId,
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: ChartDataParams) => {
  const { invoices, generatorUnits } = useData();

  const months = getMonthsByScreenSize(selectedMonth);
  const generatorUnit = generatorUnits.find(
    unit => unit.empresa === selectedCompany && unit.unidadeConsumidora === selectedUnit
  );

  const getConsumptionData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      const ponta = Number(invoice?.consumoPonta || 0);
      const foraPonta = Number(invoice?.consumoForaPonta || 0);
      return {
        mes: formatMonthYear(parseMonthString(month)),
        ponta,
        foraPonta,
        total: ponta + foraPonta
      };
    });
  };

  const getDemandData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      return {
        mes: formatMonthYear(parseMonthString(month)),
        demandaMedidaPonta: Number(invoice?.demandaMedidaPonta || 0),
        demandaMedidaForaPonta: Number(invoice?.demandaMedidaForaPonta || 0)
      };
    });
  };

  const getGenerationData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      const monthIndex = new Date(month).getMonth();
      const monthNames = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
                       'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
      return {
        mes: formatMonthYear(parseMonthString(month)),
        geracaoTotal: Number(invoice?.geracaoTotal || 0),
        estimativaGeracao: Number(generatorUnit?.estimativaGeracao[monthNames[monthIndex]] || 0)
      };
    });
  };

  const getBillingData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      return {
        mes: formatMonthYear(parseMonthString(month)),
        valor: Number(invoice?.valorFatura || 0)
      };
    });
  };

  const getFinesData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      return {
        mes: formatMonthYear(parseMonthString(month)),
        valor: Number(invoice?.multasJuros || 0)
      };
    });
  };

  const getReactiveEnergyData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      const ponta = Number(invoice?.energiaReativaPonta || 0);
      const foraPonta = Number(invoice?.energiaReativaForaPonta || 0);
      return {
        mes: formatMonthYear(parseMonthString(month)),
        ponta,
        foraPonta,
        total: ponta + foraPonta
      };
    });
  };

  const getReactiveDemandData = () => {
    return months.map(month => {
      const invoice = invoices.find(inv => 
        inv.empresa === selectedCompany && 
        inv.unidade === selectedUnit &&
        inv.mes === month
      );
      return {
        mes: formatMonthYear(parseMonthString(month)),
        demandaReativaPonta: Number(invoice?.demandaReativaPonta || 0),
        demandaReativaForaPonta: Number(invoice?.demandaReativaForaPonta || 0)
      };
    });
  };

  const dataFunctions = {
    consumption: getConsumptionData,
    demand: getDemandData,
    generation: getGenerationData,
    billing: getBillingData,
    fines: getFinesData,
    reactiveEnergy: getReactiveEnergyData,
    reactiveDemand: getReactiveDemandData,
  };

  return dataFunctions[chartId as keyof typeof dataFunctions]?.() || [];
};
