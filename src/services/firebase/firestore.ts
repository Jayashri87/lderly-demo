import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  DocumentData,
  QueryConstraint
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../firebase";

export const FirestoreService = {
  async create<T extends DocumentData>(collectionName: string, data: T, id?: string) {
    try {
      if (id) {
        await setDoc(doc(db, collectionName, id), { ...data, createdAt: Timestamp.now() });
        return id;
      } else {
        const docRef = await addDoc(collection(db, collectionName), { ...data, createdAt: Timestamp.now() });
        return docRef.id;
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, collectionName);
    }
  },

  async update<T extends Partial<DocumentData>>(collectionName: string, id: string, data: T) {
    try {
      await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: Timestamp.now() });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${id}`);
    }
  },

  async getOne<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docSnap = await getDoc(doc(db, collectionName, id));
      return docSnap.exists() ? (docSnap.data() as T) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${collectionName}/${id}`);
      return null;
    }
  },

  subscribeToQuery<T>(
    collectionName: string, 
    constraints: QueryConstraint[], 
    callback: (data: T[]) => void
  ) {
    const q = query(collection(db, collectionName), ...constraints);
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
      callback(items);
    }, (error) => handleFirestoreError(error, OperationType.LIST, collectionName));
  }
};
