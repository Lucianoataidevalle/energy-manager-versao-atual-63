import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ConsumerUnit } from '@/contexts/types';

const COLLECTION_NAME = 'consumerUnits';

export const consumerUnitService = {
  async create(unit: Omit<ConsumerUnit, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), unit);
      return { ...unit, id: docRef.id };
    } catch (error) {
      console.error('Error creating consumer unit:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        ...(doc.data() as Omit<ConsumerUnit, 'id'>),
        id: doc.id,
      }));
    } catch (error) {
      console.error('Error getting consumer units:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<ConsumerUnit>) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), data);
      return { ...data, id };
    } catch (error) {
      console.error('Error updating consumer unit:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting consumer unit:', error);
      throw error;
    }
  },
};