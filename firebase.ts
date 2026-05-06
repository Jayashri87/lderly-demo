import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP_JB1B8FzUAI90nygAclVQZGbYP2qAis",
  authDomain: "lderly-e2991.firebaseapp.com",
  databaseURL: "https://lderly-e2991-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lderly-e2991",
  storageBucket: "lderly-e2991.firebasestorage.app",
  messagingSenderId: "982236610754",
  appId: "1:982236610754:web:3bbc5853f3d8040d6fbb5b"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);