export interface InvoiceFormData {
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