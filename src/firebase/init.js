// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChAKWzhY0wtzZ1RMfBg3zEZPDnXEMfBt0",
  authDomain: "fit5032-week-6-204c9.firebaseapp.com",
  projectId: "fit5032-week-6-204c9",
  storageBucket: "fit5032-week-6-204c9.firebasestorage.app",
  messagingSenderId: "917107337890",
  appId: "1:917107337890:web:dc3f4a09fc2637c70f45fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

export default db;
