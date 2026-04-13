import { db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export async function getParentStatus() {
  const snap = await getDoc(doc(db, "parentStatus", "current"));
  return snap.exists() ? snap.data() : null;
}

export async function getJourneyData() {
  const snap = await getDoc(doc(db, "journey", "current"));
  return snap.exists() ? snap.data() : null;
}

export async function getControlData() {
  const snap = await getDoc(doc(db, "control", "current"));
  return snap.exists() ? snap.data() : null;
}

export async function getFeedData() {
  const snap = await getDocs(collection(db, "feed"));
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}