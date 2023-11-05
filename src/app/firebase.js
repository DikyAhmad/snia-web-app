// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqem8sLPYxz9uFwl-0YcLOhe60PDBgAwU",
  authDomain: "snia-app.firebaseapp.com",
  projectId: "snia-app",
  storageBucket: "snia-app.appspot.com",
  messagingSenderId: "134851073423",
  appId: "1:134851073423:web:673a1ddbc2fa23d4d9e7fa",
  measurementId: "G-ZCRNC7GDSM",
  // storageBucket: 'gs://snia-app.appspot.com',
  databaseURL: "https://snia-app-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);