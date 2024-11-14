import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice } from '@/contexts/types';

const COLLECTION_NAME = 'invoices';

export const invoiceService = {
  async create(invoice: Omit<Invoice, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), invoice);
      return { ...invoice, id: Number(docRef.id) };
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
        id: Number(doc.id),
      }));
    } catch (error) {
      console.error('Error getting invoices:', error);
      throw error;
    }
  },

  async update(id: number, data: Partial<Invoice>) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id.toString()), data);
      return { ...data, id };
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id.toString()));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },
};