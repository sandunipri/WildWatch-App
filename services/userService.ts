import { db } from "@/firebase"
import { User } from "@/types/user"
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"


export const saveUser = async (userData: User) => {
    return await setDoc(doc(db, "users", userData.uid), {
        ...userData,
        createdAt: serverTimestamp()
  })
}
export const updateUser = async (id: string, updates: Partial<User>) => {
    const docRef = doc(db, "users", id)
    return await updateDoc(docRef, updates)
}

export const getUserById = async (id : string): Promise<User | null> => {
  const docRef = doc(db, "users", id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()){ 
    return { uid: id, ...snapshot.data() } as User
  }
  else{
    return null 
  }}   