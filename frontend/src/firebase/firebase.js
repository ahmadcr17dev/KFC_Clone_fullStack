// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA47Mne6TasOyFKnVP2lWr0TAWb4Bmh2iM",
  authDomain: "kicksandfits.firebaseapp.com",
  projectId: "kicksandfits",
  storageBucket: "kicksandfits.firebasestorage.app",
  messagingSenderId: "858856875950",
  appId: "1:858856875950:web:4f6600810afaf48fff4a3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
