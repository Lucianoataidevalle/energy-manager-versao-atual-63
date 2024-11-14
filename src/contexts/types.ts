export interface Company {
  id: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  unidades: string[];
}

export interface ConsumerUnit {
  id: string;
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
  id: string;
  empresas: string[];
  nome: string;
  fone: string;
  email: string;
  isAdmin?: boolean;
}

export interface Invoice {
  id: string;
  empresa: string;
  unidade: string;
  mes: string;
  consumoForaPonta: number;
  consumoPonta: number;
  demandaMedidaForaPonta: number;
  demandaMedidaPonta: number;
  demandaUltrapassagemForaPonta: number;
  demandaUltrapassagemPonta: number;
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
  addCompany: (company: Omit<Company, 'id'>) => Promise<void>;
  addConsumerUnit: (unit: Omit<ConsumerUnit, 'id'>) => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  deleteConsumerUnit: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  editCompany: (id: string, data: Partial<Company>) => Promise<void>;
  editConsumerUnit: (id: string, data: Partial<ConsumerUnit>) => Promise<void>;
  editUser: (id: string, data: Partial<User>) => Promise<void>;
  editInvoice: (id: string, data: Partial<Invoice>) => Promise<void>;
  setEditingCompany: (company: Company | null) => void;
  setEditingConsumerUnit: (unit: ConsumerUnit | null) => void;
  setEditingUser: (user: User | null) => void;
  setEditingInvoice: (invoice: Invoice | null) => void;
}