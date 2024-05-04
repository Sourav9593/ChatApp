import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-c8183.firebaseapp.com",
  projectId: "reactchat-c8183",
  storageBucket: "reactchat-c8183.appspot.com",
  messagingSenderId: "477183921707",
  appId: "1:477183921707:web:a99a7bb215699578cb246e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()