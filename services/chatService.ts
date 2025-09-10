import { auth, db } from "@/firebase"
import { Message } from "@/types/messages";

import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const messagesColRef = collection(db,"messages");
export const sendMessage = async(message: any) => {
    const user = auth.currentUser

    if(!user || !message) return;

    await addDoc(messagesColRef, {
        senderId: user.uid,
        senderName: user.displayName,
        text: message,
        timestamp: new Date().toISOString()
       
    });
};

export const getAllMessages = (callback:(messages: Message[]) => void) => {
    const q = query(messagesColRef,orderBy("timestamp","asc"));
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
           id : doc.id,
           ...(doc.data() as Omit<Message,"id">)
        }))

        callback(messages)  
    })
}