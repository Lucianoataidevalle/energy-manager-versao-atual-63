import { format, subMonths, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ConsumerUnit, Invoice } from "@/contexts/types";

export const getContractedDemand = (
  consumerUnits: ConsumerUnit[],
  selectedCompany: string,
  selectedUnit: string
) => {
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

export const calculateDemandaUltrapassagem = (medida: number, contratada: number) => {
  const limite = contratada * 1.05;
  return medida > limite ? medida - contratada : 0;
};

export const formatNumberBR = (value: number) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const getLast12MonthsData = (
  selectedMonth: string,
  selectedCompany: string,
  selectedUnit: string,
  invoices: Invoice[],
  contractedDemand: ReturnType<typeof getContractedDemand>
) => {
  const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
  if (!isValid(selectedDate)) {
    console.error('Invalid date:', selectedMonth);
    return [];
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(selectedDate, i);
    return format(date, 'yyyy-MM');
  }).reverse();

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

    const { demandaContratada, demandaContratadaPonta, demandaContratadaForaPonta, modalidadeTarifaria } = contractedDemand;

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
      demandaMedidaForaPonta: invoice?.demandaMedidaForaPonta || 0,
      demandaMedidaPonta: invoice?.demandaMedidaPonta || 0,
      demandaUltrapassagemForaPonta: modalidadeTarifaria === "Verde" ? demandaUltrapassagemVerde : demandaUltrapassagemForaPonta,
      demandaUltrapassagemPonta,
      demandaContratada: modalidadeTarifaria === "Verde" ? demandaContratada : 0,
      demandaContratadaPonta: modalidadeTarifaria === "Azul" ? demandaContratadaPonta : 0,
      demandaContratadaForaPonta: modalidadeTarifaria === "Azul" ? demandaContratadaForaPonta : 0
    };
  });
};