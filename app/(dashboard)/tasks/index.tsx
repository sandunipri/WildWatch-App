import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView
} from "react-native"
import React, { useEffect, useState } from "react"
import { deleteTask, getAllTaskByUserId, taskColRef } from "@/services/taskService"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useRouter, useSegments } from "expo-router"
import { Task } from "@/types/task"
import { useLoader } from "@/context/LoaderContext"
import { onSnapshot } from "firebase/firestore"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { auth } from "@/firebase"
import { query, where } from "firebase/firestore";


const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const segment = useSegments()
  const router = useRouter()
  const { hideLoader, showLoader } = useLoader()

  const insets = useSafeAreaInsets();

  const handleFetchData = async () => {
    if(!auth.currentUser){
      Alert.alert("Error", "You must be logged in");
      return;
    }
    showLoader()
    await getAllTaskByUserId(auth.currentUser.uid)
      .then((data) => {
        setTasks(data)
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        hideLoader()
      })

    }

  useEffect(() => {
  if (!auth.currentUser) {
    Alert.alert("Error", "You must be logged in");
    return;
  }
  
  const q = query(taskColRef, where("userId", "==", auth.currentUser?.uid)); 

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(taskList);
    },
    (err) => console.error(err)
  );
  return () => unsubscribe();
}, []);


  const hadnleDelete = (id: string) => {
    Alert.alert("Alert Title", "Alert Desc", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {

          try{
            showLoader();
            await deleteTask(id)
          }catch(err){
            console.error("Error deleting task:",err)
            Alert.alert("Error", "Could not delete task.");
          }finally{
            hideLoader()
          }
        }
      }
    ])
  }

  return (

  <SafeAreaView className={`flex-1 bg-white pt-${insets.top} pb-${insets.bottom}`}>  
    <View className="flex-1 w-full bg-green-50">
      <Text className="text-3xl font-bold text-center my-4 text-green-800">Tasks screen</Text>

      <View className="absolute bottom-5 right-5 z-40">
        <Pressable
          className="bg-green-900 rounded-full p-5 shadow-lg"
          onPress={() => {
            router.push("/tasks/new")
          }}
        >
          <MaterialIcons name="add" size={28} color={"#fff"} />
        </Pressable>
      </View>

      <ScrollView className="flex-1 mt-5 ">
        {tasks.map((task) => {
          return (
            <View
              key={task.id}
              className="bg-gray-100 p-4 mb-3 rounded-lg mx-4 border border-gray-100 "
            >
              {task.image && (
                <Image source={{ uri: task.image }} className="w-full h-48 mb-2" />
              )}

              <Text className="text-lg text-center font-semibold">{task.title}</Text>
              <Text className="text-base text-gray-800 mb-2">
                Description : {task.description}
              </Text>
              <View className="flex-row justify-center space-x-3">
                <TouchableOpacity
                  className="bg-yellow-300 p-2 rounded-full mr-4"
                  onPress={() => router.push(`/tasks/${task.id}`)}
                >
                  <Feather name="edit" size={20} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-500 p-2 rounded-full"
                  onPress={() => hadnleDelete(task.id!)}
                >
                <Feather name="trash" size={20} color="white"/>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default TasksScreen
