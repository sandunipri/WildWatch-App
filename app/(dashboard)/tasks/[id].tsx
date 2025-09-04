import { View, Text, TextInput, TouchableOpacity, Alert, Image} from "react-native"
import { useCameraPermissions, CameraView, CameraType } from "expo-camera"
import React, {useEffect, useState, useRef} from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { createTask, getTaskById, updateTask } from "@/services/taskService"
import { useLoader } from "@/context/LoaderContext"
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';


const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const isNew = !id || id === "new" 

  // task
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [image, setImage] = useState<string>("")

  const router = useRouter()
  const { hideLoader, showLoader } = useLoader()

  // camera
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>("back")
  const cameraRef = useRef<CameraView>(null)

  // media
  const [mediaPermission, requestMediaPermission] =MediaLibrary.usePermissions()

  useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        try {
          showLoader()
          const task = await getTaskById(id)
          if (task) {
            setTitle(task.title)
            setDescription(task.description)
          }
        } finally {
          hideLoader()
        }
      }
    }
    load()
  }, [id])

  const handleSubmit = async () => {
    // validations
    if (!title.trim) {
      Alert.alert("Validation", "Title is required")
      return
    }
    try {
      showLoader()
      if (isNew) {
        await createTask({ title, description })
      } else {
        await updateTask(id, { title, description })
      }
      router.back()
    } catch (err) {
      console.error("Error saving task : ", err)
      Alert.alert("Error", "Fail to save task")
    } finally {
      hideLoader()
    }
  }

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleTakePhoto = async () => {
    if(cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      setImage(photo.uri)
      if(mediaPermission?.granted) {
        await MediaLibrary.saveToLibraryAsync(photo.uri)
      }
    }
    
  }
  

  if (!permission || mediaPermission) <View />
  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center mb-3 text-lg text-gray-700">
          We need permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="items-center bg-black/50 rounded-xl py-3 px-3"
        >
          <Text className="text-white text-xl font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!mediaPermission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center mb-3 text-lg text-gray-700">
          We need permision to save photo to your gallery
        </Text>
        <TouchableOpacity
          onPress={requestMediaPermission}
          className="items-center bg-black/50 rounded-xl py-3 px-3"
        >
          <Text className="text-white text-xl font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View className="flex-1 w-full p-5">
      <Text className="text-2xl font-bold">
        {isNew ? "Add Task" : "Edit Task"}
      </Text>
      {/* camare*/}
       <View className="flex-1">
      <Image source={{ uri: image }} className="w-full h-96" />
      <CameraView
          ref={cameraRef}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          style={{ flex: 1 }}
          facing={facing}
        />

      <View className="absolute bottom-16 w-full justify-between flex-row px-10">
        <TouchableOpacity
          className="bg-black p-4 border border-gray-200"
          onPress={handleTakePhoto}
        >
          <Text className="text-center text-2xl text-white">📸</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-black p-4 border border-gray-200"
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        >
          <Text className="text-center text-2xl text-white">Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-black p-4 border border-gray-200"
          onPress={handlePickImage}
        >
          <Text className="text-center text-2xl text-white">Pick an image</Text>
        </TouchableOpacity>
      </View>
    </View>
    {/* finish */}
      <TextInput
        className="border border-gray-400 p-2 my-2 rounded-md"
        placeholder="title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border border-gray-400 p-2 my-2 rounded-md"
        placeholder="description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        className="bg-blue-400 rounded-md px-6 py-3 my-2"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white text-center">
          {isNew ? "Add Task" : "Update Task"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskFormScreen
// function useCameraPermissions(): [any, any] {
//   throw new Error("Function not implemented.")
// }

// function useRef<T>(arg0: null) {
//   throw new Error("Function not implemented.")
// }

