import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const AuthService = {
  signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  },

  signOutUser() {
    return signOut(auth);
  },

  subscribe(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};