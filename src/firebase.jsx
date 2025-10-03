import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD5hGsri-gN2To98gjc2C-OX_77MFQ8tGw",
  authDomain: "first-auth-4afb6.firebaseapp.com",
  projectId: "first-auth-4afb6",
  storageBucket: "first-auth-4afb6.firebasestorage.app",
  messagingSenderId: "1021868394365",
  appId: "1:1021868394365:web:e5b65aabbc119bcbf76e14",
  measurementId: "G-K686Z5TLNX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)