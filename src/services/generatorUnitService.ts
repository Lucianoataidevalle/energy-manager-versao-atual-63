import { GeneratorUnit } from "@/contexts/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const COLLECTION_NAME = 'generatorUnits';

export const generatorUnitService = {
  getAll: async (): Promise<GeneratorUnit[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GeneratorUnit));
  },

  create: async (unit: Omit<GeneratorUnit, 'id'>): Promise<GeneratorUnit> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), unit);
    return {
      id: docRef.id,
      ...unit
    };
  },

  update: async (id: string, data: Partial<GeneratorUnit>): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};