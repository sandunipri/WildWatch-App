import { auth, db } from "@/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth)
}

export const register = async(email: string, password: string) => {
  const userEmailAndPassword = await createUserWithEmailAndPassword(auth, email, password)
  const user = userEmailAndPassword.user

  await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  email: user.email,
  createdAt: serverTimestamp()
})
return user

}


