// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zHiLIm17xAbz7yByRPt1Rxih69y1sBg",
  authDomain: "web-dev-final-30541.firebaseapp.com",
  projectId: "web-dev-final-30541",
  storageBucket: "web-dev-final-30541.firebasestorage.app",
  messagingSenderId: "618760655811",
  appId: "1:618760655811:web:4e4421dcbe72b76d9a6376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();