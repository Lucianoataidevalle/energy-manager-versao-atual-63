import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { Company, ConsumerUnit, User, Invoice, GeneratorUnit, DataContextType } from "./types";
import { companyService } from "@/services/companyService";
import { consumerUnitService } from "@/services/consumerUnitService";
import { userService } from "@/services/userService";
import { invoiceService } from "@/services/invoiceService";
import { generatorUnitService } from "@/services/generatorUnitService";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnit[]>([]);
  const [generatorUnits, setGeneratorUnits] = useState<GeneratorUnit[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingConsumerUnit, setEditingConsumerUnit] = useState<ConsumerUnit | null>(null);
  const [editingGeneratorUnit, setEditingGeneratorUnit] = useState<GeneratorUnit | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companiesData, unitsData, generatorUnitsData, usersData, invoicesData] = await Promise.all([
          companyService.getAll(),
          consumerUnitService.getAll(),
          generatorUnitService.getAll(),
          userService.getAll(),
          invoiceService.getAll(),
        ]);

        setCompanies(companiesData);
        setConsumerUnits(unitsData);
        setGeneratorUnits(generatorUnitsData);
        setUsers(usersData);
        setInvoices(invoicesData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Erro ao carregar dados');
      }
    };

    loadData();
  }, []);

  const addCompany = async (company: Omit<Company, 'id'>) => {
    try {
      const newCompany = await companyService.create(company);
      setCompanies((prev) => [...prev, newCompany]);
    } catch (error) {
      console.error('Error adding company:', error);
      toast.error('Erro ao adicionar empresa');
      throw error;
    }
  };

  const addConsumerUnit = async (unit: Omit<ConsumerUnit, 'id'>) => {
    try {
      const newUnit = await consumerUnitService.create(unit);
      setConsumerUnits((prev) => [...prev, newUnit]);
      setCompanies((prev) =>
        prev.map((company) =>
          company.razaoSocial === unit.empresa
            ? { ...company, unidades: [...company.unidades, unit.numero] }
            : company
        )
      );
    } catch (error) {
      console.error('Error adding consumer unit:', error);
      toast.error('Erro ao adicionar unidade consumidora');
      throw error;
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await userService.create(user);
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Erro ao adicionar usuário');
      throw error;
    }
  };

  const addInvoice = async (invoice: Omit<Invoice, 'id'>) => {
    try {
      const newInvoice = await invoiceService.create(invoice);
      setInvoices((prev) => [...prev, newInvoice]);
    } catch (error) {
      console.error('Error adding invoice:', error);
      toast.error('Erro ao adicionar fatura');
      throw error;
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      await companyService.delete(id);
      setCompanies((prev) => prev.filter((company) => company.id !== id));
      toast.success("Empresa excluída com sucesso!");
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Erro ao excluir empresa');
      throw error;
    }
  };

  const deleteConsumerUnit = async (id: string) => {
    try {
      const unit = consumerUnits.find((u) => u.id === id);
      if (unit) {
        await consumerUnitService.delete(id);
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
    } catch (error) {
      console.error('Error deleting consumer unit:', error);
      toast.error('Erro ao excluir unidade consumidora');
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erro ao excluir usuário');
      throw error;
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      await invoiceService.delete(id);
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      toast.success("Fatura excluída com sucesso!");
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Erro ao excluir fatura');
      throw error;
    }
  };

  const editCompany = async (id: string, data: Partial<Company>) => {
    try {
      await companyService.update(id, data);
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === id ? { ...company, ...data } : company
        )
      );
      setEditingCompany(null);
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Erro ao atualizar empresa');
      throw error;
    }
  };

  const editConsumerUnit = async (id: string, data: Partial<ConsumerUnit>) => {
    try {
      await consumerUnitService.update(id, data);
      setConsumerUnits((prev) =>
        prev.map((unit) => (unit.id === id ? { ...unit, ...data } : unit))
      );
      setEditingConsumerUnit(null);
    } catch (error) {
      console.error('Error updating consumer unit:', error);
      toast.error('Erro ao atualizar unidade consumidora');
      throw error;
    }
  };

  const editUser = async (id: string, data: Partial<User>) => {
    try {
      await userService.update(id, data);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...data } : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Erro ao atualizar usuário');
      throw error;
    }
  };

  const editInvoice = async (id: string, data: Partial<Invoice>) => {
    try {
      await invoiceService.update(id, data);
      setInvoices((prev) =>
        prev.map((invoice) => (invoice.id === id ? { ...invoice, ...data } : invoice))
      );
      setEditingInvoice(null);
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast.error('Erro ao atualizar fatura');
      throw error;
    }
  };

  const addGeneratorUnit = async (unit: Omit<GeneratorUnit, 'id'>) => {
    try {
      const newUnit = await generatorUnitService.create(unit);
      setGeneratorUnits((prev) => [...prev, newUnit]);
      toast.success("Unidade geradora cadastrada com sucesso!");
    } catch (error) {
      console.error('Error adding generator unit:', error);
      toast.error('Erro ao adicionar unidade geradora');
      throw error;
    }
  };

  const deleteGeneratorUnit = async (id: string) => {
    try {
      await generatorUnitService.delete(id);
      setGeneratorUnits((prev) => prev.filter((unit) => unit.id !== id));
      toast.success("Unidade geradora excluída com sucesso!");
    } catch (error) {
      console.error('Error deleting generator unit:', error);
      toast.error('Erro ao excluir unidade geradora');
      throw error;
    }
  };

  const editGeneratorUnit = async (id: string, data: Partial<GeneratorUnit>) => {
    try {
      await generatorUnitService.update(id, data);
      setGeneratorUnits((prev) =>
        prev.map((unit) => (unit.id === id ? { ...unit, ...data } : unit))
      );
      setEditingGeneratorUnit(null);
      toast.success("Unidade geradora atualizada com sucesso!");
    } catch (error) {
      console.error('Error updating generator unit:', error);
      toast.error('Erro ao atualizar unidade geradora');
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        consumerUnits,
        generatorUnits,
        users,
        invoices,
        editingCompany,
        editingConsumerUnit,
        editingGeneratorUnit,
        editingUser,
        editingInvoice,
        addCompany,
        addConsumerUnit,
        addGeneratorUnit,
        addUser,
        addInvoice,
        deleteCompany,
        deleteConsumerUnit,
        deleteGeneratorUnit,
        deleteUser,
        deleteInvoice,
        editCompany,
        editConsumerUnit,
        editGeneratorUnit,
        editUser,
        editInvoice,
        setEditingCompany,
        setEditingConsumerUnit,
        setEditingGeneratorUnit,
        setEditingUser,
        setEditingInvoice,
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
