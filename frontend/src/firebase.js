// src/firebase.js (Update karke ye likho)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdt0ATXyYCDkyWLYxKA8T3fBB00K25Gys",
  authDomain: "urbane-admin.firebaseapp.com",
  projectId: "urbane-admin",
  storageBucket: "urbane-admin.firebasestorage.app",
  messagingSenderId: "326941187295",
  appId: "1:326941187295:web:f2a21e8b41962fcfdf5d6a",
  measurementId: "G-F2Q71SDPPL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Ye line zaroori hai
export const provider = new GoogleAuthProvider(); // Google login ke liye