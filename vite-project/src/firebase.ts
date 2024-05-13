import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl4zJwpe6hmTW96b5kAvl0aY65rOgl5c0",
  authDomain: "fir-example-915b5.firebaseapp.com",
  projectId: "fir-example-915b5",
  storageBucket: "fir-example-915b5.appspot.com",
  messagingSenderId: "307106166734",
  appId: "1:307106166734:web:cca491bfbfbbdfe9549d9f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
