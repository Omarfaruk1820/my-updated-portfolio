// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbMOUrbWlHXuMAiPjrxouvFtWdJpapRdM",
  authDomain: "omar-faruk-portfolio-9a43d.firebaseapp.com",
  projectId: "omar-faruk-portfolio-9a43d",
  storageBucket: "omar-faruk-portfolio-9a43d.firebasestorage.app",
  messagingSenderId: "237897366861",
  appId: "1:237897366861:web:db29b1fe368d20b7938b04",
  measurementId: "G-1V2YY0NNGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
