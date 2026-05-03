
// import { initializeApp } from "firebase/app";
// import {getAuth, GoogleAuthProvider} from "firebase/auth"
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "interviewiq-ba6ba.firebaseapp.com",
//   projectId: "interviewiq-ba6ba",
//   storageBucket: "interviewiq-ba6ba.firebasestorage.app",
//   messagingSenderId: "862159592601",
//   appId: "1:862159592601:web:7308d702cd708076ddec08"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// const provider = new GoogleAuthProvider()

// export {auth , provider}










// import { initializeApp } from "firebase/app";
// import {getAuth, GoogleAuthProvider} from "firebase/auth"



// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
//   authDomain: "interview2-82ff3.firebaseapp.com",
//   projectId: "interview2-82ff3",
//   storageBucket: "interview2-82ff3.firebasestorage.app",
//   messagingSenderId: "87208966711",
//   appId: "1:87208966711:web:7b10eb6c6c55eb34fc5db2",
//   measurementId: "G-GHDJRPX7NH"
// };


// const app = initializeApp(firebaseConfig);

//  const auth = getAuth(app);
//  const provider = new GoogleAuthProvider()
//  export {auth , provider}



import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-12ced.firebaseapp.com", // ✅ SAME PROJECT
  projectId: "interviewiq-12ced",
  storageBucket: "interviewiq-12ced.appspot.com",
  messagingSenderId: "862159592601",
  appId: "1:862159592601:web:7308d702cd708076ddec08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();