// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoyRKzI2LEYe0cCaHYn6R7LxbJ6vKk6bw",
  authDomain: "wildwatch-app-e532a.firebaseapp.com",
  projectId: "wildwatch-app-e532a",
  storageBucket: "wildwatch-app-e532a.firebasestorage.app",
  messagingSenderId: "387737411363",
  appId: "1:387737411363:web:2c4b80921f2a9059723696",
  measurementId: "G-W33PYN1837"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

export const storage = getStorage(app)


