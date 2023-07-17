import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzO9ZQTleLun3x4SBvE-rvtm2cKypOIjE",
  authDomain: "dinebd-20ed9.firebaseapp.com",
  projectId: "dinebd-20ed9",
  storageBucket: "dinebd-20ed9.appspot.com",
  messagingSenderId: "552075389857",
  appId: "1:552075389857:web:380e0eea134e89862939e0",
  measurementId: "G-HEPNSVR5X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
