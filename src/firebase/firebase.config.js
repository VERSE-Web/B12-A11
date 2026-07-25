import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEdszTSXp2K9reCDGg-yba1hqz3sbE9fM",
  authDomain: "jhanker3.firebaseapp.com",
  projectId: "jhanker3",
  storageBucket: "jhanker3.firebasestorage.app",
  messagingSenderId: "1059147186445",
  appId: "1:1059147186445:web:ae82790a6a82ec50f97044",
  measurementId: "G-YMZ5FEM6LX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
