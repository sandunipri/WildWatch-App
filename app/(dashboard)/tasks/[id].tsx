import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native"
import { useCameraPermissions, CameraView, CameraType } from "expo-camera"
import React, {useEffect, useState, useRef} from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { createTask, getTaskById, updateTask } from "@/services/taskService"
import { useLoader } from "@/context/LoaderContext"
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { UploadImage } from "@/services/storageService"
import { auth } from "@/firebase"
import * as FileSystem from 'expo-file-system';

const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const isNew = !id || id === "new" 

  // task
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const [isUploading, setIsUploading] = useState<boolean>(false);


  const router = useRouter()
  const { hideLoader, showLoader } = useLoader()

  // camera
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>("back")
  const cameraRef = useRef<CameraView>(null)

  // media
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()

  useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        try {
          showLoader()
          const task = await getTaskById(id)
          if (task) {
            setTitle(task.title)
            setDescription(task.description)
            setImage(task.image || "")
          }
        } finally {
          hideLoader()
        }
      }
    }
    load()
  }, [id])

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    if (!auth.currentUser) {
      Alert.alert("Error", "You must be logged in");
      return;
    }

    try {
      showLoader();

      let imageUrl = image; 
      
      if (image && image.startsWith('file://')) {
        try {
          const timestamp = Date.now();
          const filename = `tasks/${auth.currentUser.uid}/${timestamp}.jpg`;
          imageUrl = await UploadImage(image, filename);
        } catch (err) {
          console.error("UploadImage error:", err);
          Alert.alert("Error", "Failed to upload image");
          hideLoader();
          return;
        }
      }

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        image: imageUrl,
        userId: auth.currentUser.uid
      };

      if (isNew) {
        await createTask(taskData);
      } else {
        await updateTask(id, taskData);
      }

      router.back();
    } catch (error) {
      console.error("Error saving task:", error);
      Alert.alert("Error", "Failed to save task");
    } finally {
      hideLoader();
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
    
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        setShowCamera(false);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          exif: false
        });
        
        if (photo.uri) {
          setImage(photo.uri);
          
          // Save to media library if permission granted
          if (mediaPermission?.granted) {
            try {
              await MediaLibrary.saveToLibraryAsync(photo.uri);
            } catch (saveError) {
              console.warn("Could not save to media library:", saveError);
            }
          }
        }
      } catch (error) {
        console.error("Error taking photo:", error);
        Alert.alert("Error", "Failed to take photo");
      }
    }
  }

  const toggleCamera = () => {
    setShowCamera(!showCamera);
  }

  const removeImage = () => {
    setImage("");
  }

  if (!permission || !mediaPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center mb-3 text-lg text-gray-700">
          Requesting permissions...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center mb-3 text-lg text-gray-700">
          We need permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="items-center bg-blue-500 rounded-xl py-3 px-6"
        >
          <Text className="text-white text-xl font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!mediaPermission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center mb-3 text-lg text-gray-700">
          We need permission to save photos to your gallery
        </Text>
        <TouchableOpacity
          onPress={requestMediaPermission}
          className="items-center bg-blue-500 rounded-xl py-3 px-6"
        >
          <Text className="text-white text-xl font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 w-full p-5 bg-green-50 ">
      <Text className="text-2xl text-center text-green-800 font-bold mb-4">
        {isNew ? "Add Post" : "Edit Task"}
      </Text>
      
      {/* Image Preview and Camera */}
      <View className="mb-4">
        {image ? (
          <View className="relative">
            <Image 
              source={{ uri: image }} 
              className="w-full h-64 rounded-lg mb-2" 
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={removeImage}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
            >
              <Text className="text-white">Remove</Text>
            </TouchableOpacity>
          </View>
        ) : showCamera ? (
          <View className="h-64 rounded-lg overflow-hidden mb-2">
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing={facing}
            />
          </View>
        ) : (
          <View className="h-64 bg-gray-200 rounded-lg items-center justify-center mb-2">
            <Text className="text-gray-500">No image selected</Text>
          </View>
        )}
        
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity
            className="bg-green-800 p-3 rounded-lg flex-1 mr-2"
            onPress={toggleCamera}
          >
            <Text className="text-white text-center">
              {showCamera ? "Hide Camera" : "Show Camera"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-green-800 p-3 rounded-lg flex-1 ml-2"
            onPress={handlePickImage}
          >
            <Text className="text-white text-center">Pick Image</Text>
          </TouchableOpacity>
        </View>
        
        {showCamera && (
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity
              className="bg-black p-3 rounded-lg flex-1 mr-2"
              onPress={handleTakePhoto}
            >
              <Text className="text-white text-center">Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-700 p-3 rounded-lg flex-1 ml-2"
              onPress={() => setFacing(facing === "back" ? "front" : "back")}
            >
              <Text className="text-white text-center">Flip Camera</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Form Inputs */}
      <TextInput
        className="border border-gray-400 p-4 my-2 rounded-md"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border border-gray-400 p-4 my-2 rounded-md h-20"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <TouchableOpacity
        className="bg-green-800 rounded-md p-4 my-2"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white text-center">
          {isNew ? "Add Task" : "Update Task"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default TaskFormScreen