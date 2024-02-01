import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUb8Dma_eJJcZkBqqLxQ8nsRkN-4HaFhw",
  authDomain: "plan2execute-4cb59.firebaseapp.com",
  projectId: "plan2execute-4cb59",
  storageBucket: "plan2execute-4cb59.appspot.com",
  messagingSenderId: "1092912435624",
  appId: "1:1092912435624:web:94a9a87ef295eb8e888d9d",
  measurementId: "G-TF5C1TB11F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
