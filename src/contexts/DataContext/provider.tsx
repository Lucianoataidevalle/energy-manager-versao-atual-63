import { useState, ReactNode } from "react";
import { DataContext } from "./context";
import { Company, ConsumerUnit, User, Invoice } from "./types";
import { toast } from "sonner";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnit[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingConsumerUnit, setEditingConsumerUnit] = useState<ConsumerUnit | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const addCompany = (company: Company) => {
    setCompanies((prev) => [...prev, company]);
  };

  const addConsumerUnit = (unit: ConsumerUnit) => {
    setConsumerUnits((prev) => [...prev, unit]);
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

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const deleteCompany = (id: number) => {
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    toast.success("Empresa excluída com sucesso!");
  };

  const deleteConsumerUnit = (id: number) => {
    const unit = consumerUnits.find((u) => u.id === id);
    if (unit) {
      setConsumerUnits((prev) => prev.filter((u) => u.id !== id));
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

  const deleteInvoice = (id: number) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    toast.success("Fatura excluída com sucesso!");
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

  const editInvoice = (id: number, data: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((invoice) => (invoice.id === id ? { ...invoice, ...data } : invoice))
    );
    setEditingInvoice(null);
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        consumerUnits,
        users,
        invoices,
        editingCompany,
        editingConsumerUnit,
        editingUser,
        editingInvoice,
        addCompany,
        addConsumerUnit,
        addUser,
        addInvoice,
        deleteCompany,
        deleteConsumerUnit,
        deleteUser,
        deleteInvoice,
        editCompany,
        editConsumerUnit,
        editUser,
        editInvoice,
        setEditingCompany,
        setEditingConsumerUnit,
        setEditingUser,
        setEditingInvoice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
