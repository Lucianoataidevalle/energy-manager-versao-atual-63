import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice } from '@/contexts/types';
import { toast } from 'sonner';

const COLLECTION_NAME = 'invoices';

export const invoiceService = {
  async create(invoice: Omit<Invoice, 'id'>) {
    try {
      // Check if an invoice already exists for this month and unit
      const q = query(
        collection(db, COLLECTION_NAME),
        where('empresa', '==', invoice.empresa),
        where('unidade', '==', invoice.unidade),
        where('mes', '==', invoice.mes)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('Já existe uma fatura cadastrada para este mês');
      }

      const docRef = await addDoc(collection(db, COLLECTION_NAME), invoice);
      return { ...invoice, id: docRef.id };
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        ...(doc.data() as Omit<Invoice, 'id'>),
        id: doc.id,
      }));
    } catch (error) {
      console.error('Error getting invoices:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<Invoice>) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), data);
      return { ...data, id };
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },
};