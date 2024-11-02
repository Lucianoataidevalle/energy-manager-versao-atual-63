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
  editingCompany: Company | null;
  editingConsumerUnit: ConsumerUnit | null;
  editingUser: User | null;
  addCompany: (company: Company) => void;
  addConsumerUnit: (unit: ConsumerUnit) => void;
  addUser: (user: User) => void;
  deleteCompany: (id: number) => void;
  deleteConsumerUnit: (id: number) => void;
  deleteUser: (id: number) => void;
  editCompany: (id: number, data: Partial<Company>) => void;
  editConsumerUnit: (id: number, data: Partial<ConsumerUnit>) => void;
  editUser: (id: number, data: Partial<User>) => void;
  setEditingCompany: (company: Company | null) => void;
  setEditingConsumerUnit: (unit: ConsumerUnit | null) => void;
  setEditingUser: (user: User | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnit[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingConsumerUnit, setEditingConsumerUnit] = useState<ConsumerUnit | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const addCompany = (company: Company) => {
    setCompanies((prev) => [...prev, company]);
  };

  const addConsumerUnit = (unit: ConsumerUnit) => {
    setConsumerUnits((prev) => [...prev, unit]);
    // Atualiza a lista de unidades da empresa
    setCompanies((prev) =>
      prev.map((company) =>
        company.razaoSocial === unit.empresa
          ? { ...company, unidades: [...company.unidades, unit.numero] }
          : company
      )
    );
  };

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const deleteCompany = (id: number) => {
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    toast.success("Empresa excluída com sucesso!");
  };

  const deleteConsumerUnit = (id: number) => {
    const unit = consumerUnits.find((u) => u.id === id);
    if (unit) {
      setConsumerUnits((prev) => prev.filter((u) => u.id !== id));
      // Remove a unidade da lista da empresa
      setCompanies((prev) =>
        prev.map((company) =>
          company.razaoSocial === unit.empresa
            ? {
                ...company,
                unidades: company.unidades.filter((u) => u !== unit.numero),
              }
            : company
        )
      );
    }
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
    setEditingCompany(null);
  };

  const editConsumerUnit = (id: number, data: Partial<ConsumerUnit>) => {
    setConsumerUnits((prev) =>
      prev.map((unit) => (unit.id === id ? { ...unit, ...data } : unit))
    );
    setEditingConsumerUnit(null);
  };

  const editUser = (id: number, data: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...data } : user))
    );
    setEditingUser(null);
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        consumerUnits,
        users,
        editingCompany,
        editingConsumerUnit,
        editingUser,
        addCompany,
        addConsumerUnit,
        addUser,
        deleteCompany,
        deleteConsumerUnit,
        deleteUser,
        editCompany,
        editConsumerUnit,
        editUser,
        setEditingCompany,
        setEditingConsumerUnit,
        setEditingUser,
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