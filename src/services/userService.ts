import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/contexts/types';

const COLLECTION_NAME = 'users';

export const userService = {
  async create(user: Omit<User, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), user);
      return { ...user, id: Number(docRef.id) };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        ...(doc.data() as Omit<User, 'id'>),
        id: Number(doc.id),
      }));
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  async update(id: number, data: Partial<User>) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id.toString()), data);
      return { ...data, id };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id.toString()));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};