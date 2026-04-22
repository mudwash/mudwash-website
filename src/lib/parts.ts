import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from "firebase/firestore";
import { db } from "./firebase";

export interface Part {
  id?: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  description?: string;
  stock?: number;
}

const COLLECTION_NAME = "parts";

export const getParts = async () => {
  const partsCol = collection(db, COLLECTION_NAME);
  const partSnapshot = await getDocs(partsCol);
  return partSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Part[];
};

export const addPart = async (part: Omit<Part, "id">) => {
  const partsCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(partsCol, part);
  return docRef.id;
};

export const updatePart = async (id: string, part: Partial<Part>) => {
  const partRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(partRef, part);
};

export const deletePart = async (id: string) => {
  const partRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(partRef);
};
