// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-88988.firebaseapp.com",
  projectId: "mern-estate-88988",
  storageBucket: "mern-estate-88988.firebasestorage.app",
  messagingSenderId: "574950941148",
  appId: "1:574950941148:web:6f55836dd885fcf5726f19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);