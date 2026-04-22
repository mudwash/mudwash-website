import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  createdAt: string;
}

export const saveUserToFirestore = async (user: UserProfile) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, user, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};
