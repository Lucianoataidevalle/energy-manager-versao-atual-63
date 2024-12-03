import { ConsumerUnit as ContextConsumerUnit } from '@/contexts/types';

export type ConsumerUnit = ContextConsumerUnit;

export interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

export interface InvoiceFormData {
  id?: string;
  empresa: string;
  unidade: string;
  mes: string;
  consumoForaPonta: string;
  consumoPonta: string;
  demandaMedidaForaPonta: string;
  demandaMedidaPonta: string;
  energiaReativaForaPonta: string;
  energiaReativaPonta: string;
  demandaReativaForaPonta: string;
  demandaReativaPonta: string;
  energiaInjetadaForaPonta: string;
  energiaInjetadaPonta: string;
  saldoAcumulado: string;
  custoConsumoForaPonta: string;
  custoConsumoPonta: string;
  custoDemandaMedidaForaPonta: string;
  custoDemandaMedidaPonta: string;
  custoDemandaIsentaForaPonta: string;
  custoDemandaIsentaPonta: string;
  demandaUltrapassagemForaPonta: string;
  demandaUltrapassagemPonta: string;
  custoEnergiaReativaForaPonta: string;
  custoEnergiaReativaPonta: string;
  custoDemandaReativaForaPonta: string;
  custoDemandaReativaPonta: string;
  custoEnergiaInjetadaForaPonta: string;
  custoEnergiaInjetadaPonta: string;
  multasJuros: string;
  valorFatura: string;
  bandeiraTarifaria: string;
}
