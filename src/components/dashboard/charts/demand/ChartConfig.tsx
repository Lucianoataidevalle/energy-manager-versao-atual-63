import { ConsumerUnit } from "@/contexts/types";

export const getContractedDemand = (consumerUnits: ConsumerUnit[], selectedCompany: string, selectedUnit: string) => {
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

export const getChartData = (selectedDate: Date, invoices: any[], selectedCompany: string, selectedUnit: string, getContractedDemandFn: typeof getContractedDemand, consumerUnits: ConsumerUnit[]) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7);
  }).reverse();

  const { demandaContratada, demandaContratadaPonta, demandaContratadaForaPonta, modalidadeTarifaria } = getContractedDemandFn(consumerUnits, selectedCompany, selectedUnit);

  return months.map(month => {
    const invoice = invoices.find(inv => 
      inv.empresa === selectedCompany && 
      inv.unidade === selectedUnit &&
      inv.mes === month
    );

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
      mes: new Date(month).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
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