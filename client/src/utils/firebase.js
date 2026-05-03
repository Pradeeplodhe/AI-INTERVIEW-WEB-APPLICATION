import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview2-82ff3.firebaseapp.com",
  projectId: "interview2-82ff3",
  storageBucket: "interview2-82ff3.firebasestorage.app",
  messagingSenderId: "87208966711",
  appId: "1:87208966711:web:7b10eb6c6c55eb34fc5db2",
  measurementId: "G-GHDJRPX7NH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();