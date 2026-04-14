import {
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const AuthService = {
  signInWithGoogle() {
    return signInWithRedirect(auth, googleProvider);
  },

  handleRedirectResult() {
    return getRedirectResult(auth);
  },

  signOutUser() {
    return signOut(auth);
  },

  subscribe(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};