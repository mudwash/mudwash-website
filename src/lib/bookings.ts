import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  orderBy, 
  query 
} from "firebase/firestore";
import { db } from "./firebase";

export interface Booking {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location: string;
  amount: string;
  status: "Pending" | "Completed" | "Cancelled";
  createdAt?: any;
}

const COLLECTION_NAME = "bookings";

export const getBookings = async () => {
  const bookingsCol = collection(db, COLLECTION_NAME);
  const q = query(bookingsCol, orderBy("createdAt", "desc"));
  const bookingSnapshot = await getDocs(q);
  return bookingSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Booking[];
};

export const createBooking = async (booking: Omit<Booking, "id" | "createdAt">) => {
  const bookingsCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(bookingsCol, {
    ...booking,
    createdAt: new Date()
  });
  return docRef.id;
};

export const updateBookingStatus = async (id: string, status: Booking["status"]) => {
  const bookingRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(bookingRef, { status });
};
