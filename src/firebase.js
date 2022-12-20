import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "todo-11f64.firebaseapp.com",
  projectId: "todo-11f64",
  storageBucket: "todo-11f64.appspot.com",
  messagingSenderId: "675484882997",
  appId: "1:675484882997:web:9c67934402ebd1aa36397c",
  measurementId: "G-PTSRP0CHC5",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
