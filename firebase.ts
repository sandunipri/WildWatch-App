
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBsijuzyOcclUWmBgIsLsPYa80w414MrVs",
  authDomain: "wildwatch-app.firebaseapp.com",
  projectId: "wildwatch-app",
  storageBucket: "wildwatch-app.firebasestorage.app",
  messagingSenderId: "1051881494700",
  appId: "1:1051881494700:web:386567934c5b241d696709",
  measurementId: "G-59RFZNE4VK"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)