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
  multasJuros: string;
  valorFatura: string;
}