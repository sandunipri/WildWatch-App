import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import * as FileSystem from "expo-file-system";

export const UploadImage = async (uri: string, path: string): Promise<string> => {
  try {
    console.log("Starting upload for:", uri);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, path);

    const snapshot = await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(snapshot.ref);
    console.log("Upload successful:", url);

    return url;
  } catch (err: any) {
    console.error("UploadImage error:", err);
    throw new Error("Failed to upload image. " + err.message);
  }
};
