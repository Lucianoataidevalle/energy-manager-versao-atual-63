import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/contexts/types';

const COLLECTION_NAME = 'companies';

export const companyService = {
  async create(company: Omit<Company, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), company);
      return { ...company, id: Number(docRef.id) };
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        ...(doc.data() as Omit<Company, 'id'>),
        id: Number(doc.id),
      }));
    } catch (error) {
      console.error('Error getting companies:', error);
      throw error;
    }
  },

  async update(id: number, data: Partial<Company>) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id.toString()), data);
      return { ...data, id };
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id.toString()));
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  },
};