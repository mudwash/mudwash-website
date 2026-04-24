import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  createdAt: string;
}

export const saveUserToFirestore = async (user: UserProfile) => {
  const userRef = doc(db, "users", user.uid);
  // Default to 'user' if role is not specified
  const userData = {
    ...user,
    role: user.role || 'user'
  };
  await setDoc(userRef, userData, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};
