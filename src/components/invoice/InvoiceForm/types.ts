export interface InvoiceFormData {
  id?: number;
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

export interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

export interface ConsumerUnit {
  id: number;
  empresa: string;
  nome: string;
  numero: string;
  endereco: string;
  demandaContratada: string;
  distribuidora: string;
  grupoSubgrupo: string;
  modalidadeTarifaria: string;
}

export interface Company {
  id: number;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
}