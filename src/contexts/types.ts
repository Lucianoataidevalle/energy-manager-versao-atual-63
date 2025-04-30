
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
  possuiGeracao: boolean;
  modalidadeCompensacao: string;
}

export interface GeneratorUnit {
  id: string;
  empresa: string;
  unidadeConsumidora: string;
  tipoGeracao: string;
  potenciaInstalada: string;
  tipoConexao: string;
  estimativaGeracao: {
    janeiro: string;
    fevereiro: string;
    marco: string;
    abril: string;
    maio: string;
    junho: string;
    julho: string;
    agosto: string;
    setembro: string;
    outubro: string;
    novembro: string;
    dezembro: string;
  };
}

export interface User {
  id: string;
  email: string;
  nome: string;
  fone: string;
  empresas: string[];
  unidadesConsumidoras: string[];
  empresaRepresentada: {
    nome: string;
    cnpj: string;
    endereco: string;
  };
  isAdmin: boolean;
  isSuperUser: boolean;
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
  energiaReativaForaPonta: number;
  energiaReativaPonta: number;
  demandaReativaForaPonta: number;
  demandaReativaPonta: number;
  energiaInjetadaForaPonta: number;
  energiaInjetadaPonta: number;
  geracaoTotal: number;
  saldoAcumulado: number;
  custoConsumoForaPonta: number;
  custoConsumoPonta: number;
  custoDemandaMedidaForaPonta: number;
  custoDemandaMedidaPonta: number;
  custoDemandaIsentaForaPonta: number;
  custoDemandaIsentaPonta: number;
  demandaUltrapassagemForaPonta: number;
  demandaUltrapassagemPonta: number;
  custoDemandaUltrapassagemForaPonta: number;
  custoDemandaUltrapassagemPonta: number;
  custoEnergiaReativaForaPonta: number;
  custoEnergiaReativaPonta: number;
  custoDemandaReativaForaPonta: number;
  custoDemandaReativaPonta: number;
  custoEnergiaInjetadaForaPonta: number;
  custoEnergiaInjetadaPonta: number;
  multasJuros: number;
  valorFatura: number;
  bandeiraTarifaria: string;
}

export interface DataContextType {
  companies: Company[];
  consumerUnits: ConsumerUnit[];
  generatorUnits: GeneratorUnit[];
  users: User[];
  invoices: Invoice[];
  editingCompany: Company | null;
  editingConsumerUnit: ConsumerUnit | null;
  editingGeneratorUnit: GeneratorUnit | null;
  editingUser: User | null;
  editingInvoice: Invoice | null;
  addCompany: (company: Omit<Company, 'id'>) => Promise<void>;
  addConsumerUnit: (unit: Omit<ConsumerUnit, 'id'>) => Promise<void>;
  addGeneratorUnit: (unit: Omit<GeneratorUnit, 'id'>) => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  deleteConsumerUnit: (id: string) => Promise<void>;
  deleteGeneratorUnit: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  editCompany: (id: string, data: Partial<Company>) => Promise<void>;
  editConsumerUnit: (id: string, data: Partial<ConsumerUnit>) => Promise<void>;
  editGeneratorUnit: (id: string, data: Partial<GeneratorUnit>) => Promise<void>;
  editUser: (id: string, data: Partial<User>) => Promise<void>;
  editInvoice: (id: string, data: Partial<Invoice>) => Promise<void>;
  setEditingCompany: (company: Company | null) => void;
  setEditingConsumerUnit: (unit: ConsumerUnit | null) => void;
  setEditingGeneratorUnit: (unit: GeneratorUnit | null) => void;
  setEditingUser: (user: User | null) => void;
  setEditingInvoice: (invoice: Invoice | null) => void;
}
