import { db } from "@/firebase"
import { Post } from "@/types/post"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import api from "./config/api"

export const taskColRef = collection(db, "tasks")

export const createTask = async (taskData: Omit<Post, 'id'>): Promise<Post> => {
  try {
    const docRef = await addDoc(taskColRef, {
      ...taskData,
      createdAt: new Date().toISOString(),
      
      updatedAt: new Date().toISOString()
    });
    
    return { id: docRef.id, ...taskData };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};


export const updateTask = async (id: string, task: Post) => {
  const docRef = doc(db, "tasks", id)
  const { id: _id, ...taskData } = task
  return await updateDoc(docRef, taskData)
}

export const deleteTask = async (id: string) => {
  const docRef = doc(db, "tasks", id)
  return await deleteDoc(docRef)
  
}


export const getAllTaskData = async () => {
  const snapshot = await getDocs(taskColRef)
  const taskList = snapshot.docs.map((taskRef) => ({
    id: taskRef.id,
    ...taskRef.data()
  })) as Post[]
  return taskList
}

export const getTaskById = async (id: string) => {
  const taskDocRef = doc(db, "tasks", id)
  const snapshot = await getDoc(taskDocRef)
  const task = snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as Post)
    : null
  return task
}

export const getAllTaskByUserId = async (userId: string): Promise<Post[]> => {
  const q = query(taskColRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((taskRef) => ({
    id: taskRef.id,
    ...taskRef.data(),
  })) as Post[];
};

export const getAllTask = async () => {
  const res = await api.get("/task")
  return res.data
}

export const addTask = async (task: any) => {
  const res = await api.post("/task", task)
  return res.data
}
