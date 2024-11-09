import { createContext, useContext } from 'react';
import { Company, ConsumerUnit, User, Invoice } from './types';

interface DataContextType {
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

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};