// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFD_ZdLPcmDRqUeUVtPUSDK68w37uuliU",
  authDomain: "ecommerce-app-2a385.firebaseapp.com",
  projectId: "ecommerce-app-2a385",
  storageBucket: "ecommerce-app-2a385.appspot.com",
  messagingSenderId: "897513655292",
  appId: "1:897513655292:web:e348f360b7a0ec8a8c8079",
  measurementId: "G-EVTVVR88Z0", // Optional (for Analytics)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app); // Initialize auth first
export const db = getFirestore(app); // For Firestore database
export const googleProvider = new GoogleAuthProvider(); // For Google login

// Enable persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling persistence:", error);
  });