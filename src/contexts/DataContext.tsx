import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface Company {
  id: number;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  unidades: string[];
}

interface ConsumerUnit {
  id: number;
  empresa: string;
  nome: string;
  numero: string;
  endereco: string;
  distribuidora: string;
}

interface User {
  id: number;
  empresa: string;
  nome: string;
  funcao: string;
  fone: string;
  email: string;
}

interface DataContextType {
  companies: Company[];
  consumerUnits: ConsumerUnit[];
  users: User[];
  deleteCompany: (id: number) => void;
  deleteConsumerUnit: (id: number) => void;
  deleteUser: (id: number) => void;
  editCompany: (id: number, data: Partial<Company>) => void;
  editConsumerUnit: (id: number, data: Partial<ConsumerUnit>) => void;
  editUser: (id: number, data: Partial<User>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      razaoSocial: "Empresa Exemplo 1",
      cnpj: "12.345.678/0001-90",
      endereco: "Rua Exemplo, 123",
      unidades: ["UC-001", "UC-002"],
    },
    {
      id: 2,
      razaoSocial: "Empresa Exemplo 2",
      cnpj: "98.765.432/0001-10",
      endereco: "Avenida Teste, 456",
      unidades: ["UC-003"],
    },
  ]);

  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnit[]>([
    {
      id: 1,
      empresa: "Empresa Exemplo 1",
      nome: "Matriz",
      numero: "123456789",
      endereco: "Rua Principal, 100",
      distribuidora: "Energia SA",
    },
    {
      id: 2,
      empresa: "Empresa Exemplo 1",
      nome: "Filial 1",
      numero: "987654321",
      endereco: "Avenida Secundária, 200",
      distribuidora: "Energia SA",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      empresa: "Empresa Exemplo 1",
      nome: "João Silva",
      funcao: "Gerente",
      fone: "(11) 99999-9999",
      email: "joao@exemplo.com",
    },
    {
      id: 2,
      empresa: "Empresa Exemplo 2",
      nome: "Maria Santos",
      funcao: "Analista",
      fone: "(11) 88888-8888",
      email: "maria@exemplo.com",
    },
  ]);

  const deleteCompany = (id: number) => {
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    toast.success("Empresa excluída com sucesso!");
  };

  const deleteConsumerUnit = (id: number) => {
    setConsumerUnits((prev) => prev.filter((unit) => unit.id !== id));
    toast.success("Unidade Consumidora excluída com sucesso!");
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.success("Usuário excluído com sucesso!");
  };

  const editCompany = (id: number, data: Partial<Company>) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, ...data } : company
      )
    );
    toast.success("Empresa atualizada com sucesso!");
  };

  const editConsumerUnit = (id: number, data: Partial<ConsumerUnit>) => {
    setConsumerUnits((prev) =>
      prev.map((unit) => (unit.id === id ? { ...unit, ...data } : unit))
    );
    toast.success("Unidade Consumidora atualizada com sucesso!");
  };

  const editUser = (id: number, data: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...data } : user))
    );
    toast.success("Usuário atualizado com sucesso!");
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        consumerUnits,
        users,
        deleteCompany,
        deleteConsumerUnit,
        deleteUser,
        editCompany,
        editConsumerUnit,
        editUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};