import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-12ced.firebaseapp.com",
  projectId: "interviewiq-12ced",
  storageBucket: "interviewiq-12ced.appspot.com",
  messagingSenderId: "862159592601",
  appId: "1:862159592601:web:7308d702cd708076ddec08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();