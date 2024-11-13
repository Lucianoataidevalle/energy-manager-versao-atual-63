export interface Company {
  id: number;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  unidades: string[];
}

export interface ConsumerUnit {
  id: number;
  empresa: string;
  nome: string;
  numero: string;
  endereco: string;
  demandaContratada: string;
  demandaContratadaPonta: string;
  demandaContratadaForaPonta: string;
  distribuidora: string;
  grupoSubgrupo: string;
  modalidadeTarifaria: string;
}

export interface User {
  id: number;
  empresas: string[];
  nome: string;
  fone: string;
  email: string;
}

export interface Invoice {
  id: number;
  empresa: string;
  unidade: string;
  mes: string;
  consumoForaPonta: number;
  consumoPonta: number;
  demandaMedidaForaPonta: number;
  demandaMedidaPonta: number;
  energiaReativaForaPonta: number;
  energiaReativaPonta: number;
  demandaReativaForaPonta: number;
  demandaReativaPonta: number;
  multasJuros: number;
  valorFatura: number;
}

export interface DataContextType {
  companies: Company[];
  consumerUnits: ConsumerUnit[];
  users: User[];
  invoices: Invoice[];
  editingCompany: Company | null;
  editingConsumerUnit: ConsumerUnit | null;
  editingUser: User | null;
  editingInvoice: Invoice | null;
  addCompany: (company: Company) => void;
  addConsumerUnit: (unit: ConsumerUnit) => void;
  addUser: (user: User) => void;
  addInvoice: (invoice: Invoice) => void;
  deleteCompany: (id: number) => void;
  deleteConsumerUnit: (id: number) => void;
  deleteUser: (id: number) => void;
  deleteInvoice: (id: number) => void;
  editCompany: (id: number, data: Partial<Company>) => void;
  editConsumerUnit: (id: number, data: Partial<ConsumerUnit>) => void;
  editUser: (id: number, data: Partial<User>) => void;
  editInvoice: (id: number, data: Partial<Invoice>) => void;
  setEditingCompany: (company: Company | null) => void;
  setEditingConsumerUnit: (unit: ConsumerUnit | null) => void;
  setEditingUser: (user: User | null) => void;
  setEditingInvoice: (invoice: Invoice | null) => void;
}