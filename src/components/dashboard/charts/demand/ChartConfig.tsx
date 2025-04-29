
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
