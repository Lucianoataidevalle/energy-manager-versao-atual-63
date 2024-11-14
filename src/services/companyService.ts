import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/contexts/types';

const COLLECTION_NAME = 'companies';

export const companyService = {
  async create(company: Omit<Company, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        razaoSocial: company.razaoSocial,
        cnpj: company.cnpj,
        endereco: company.endereco,
        unidades: company.unidades || [],
      });
      return { ...company, id: docRef.id };
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
        id: doc.id,
      }));
    } catch (error) {
      console.error('Error getting companies:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<Company>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        razaoSocial: data.razaoSocial,
        cnpj: data.cnpj,
        endereco: data.endereco,
        unidades: data.unidades || [],
      });
      return { ...data, id };
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  },
};
