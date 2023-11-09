// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSP5Jo0ILRlYu656RdMgJmBlb9PuDqneg",
  authDomain: "tenedores-d95fa.firebaseapp.com",
  projectId: "tenedores-d95fa",
  storageBucket: "tenedores-d95fa.appspot.com",
  messagingSenderId: "571551411720",
  appId: "1:571551411720:web:6a4ce76fafddf059802bbd"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase); //nuestra base de datos de firebase