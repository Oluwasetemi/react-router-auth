// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZL7J_ujdGjKQqQ3M0cvIea8vC80NnLAI",
  authDomain: "react-router-auth-419cd.firebaseapp.com",
  projectId: "react-router-auth-419cd",
  storageBucket: "react-router-auth-419cd.appspot.com",
  messagingSenderId: "621512150814",
  appId: "1:621512150814:web:b690247001192653d3c30f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()




export default app;

export {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
};
