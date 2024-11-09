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
  distribuidora: string;
}

export interface User {
  id: number;
  empresas: string[];
  nome: string;
  funcao: string;
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
  demandaMedida: number;
  demandaUltrapassagem: number;
  valorFatura: number;
}