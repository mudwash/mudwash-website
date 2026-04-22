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

export interface Service {
  id?: string;
  name: string;
  price: string;
  duration: string;
  category: string;
  description: string;
  image: string;
  active: boolean;
  createdAt?: any;
}

const COLLECTION_NAME = "services";

export const getServices = async (onlyActive = false) => {
  const servicesCol = collection(db, COLLECTION_NAME);
  const q = onlyActive 
    ? query(servicesCol, where("active", "==", true))
    : servicesCol;
    
  const serviceSnapshot = await getDocs(q);
  const serviceList = serviceSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Service[];
  return serviceList;
};

export const addService = async (service: Service) => {
  const servicesCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(servicesCol, {
    ...service,
    createdAt: new Date()
  });
  return docRef.id;
};

export const updateService = async (id: string, updates: Partial<Service>) => {
  const serviceRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(serviceRef, updates);
};

export const deleteService = async (id: string) => {
  const serviceRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(serviceRef);
};
