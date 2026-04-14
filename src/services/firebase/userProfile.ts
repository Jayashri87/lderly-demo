import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

export type UserRole = "parent" | "family";

export async function getUserRole(): Promise<UserRole | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data().role || null;
}

export async function saveUserRole(role: UserRole) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  await setDoc(
    ref,
    {
      role,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}