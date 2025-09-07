import { View, Text, SafeAreaView, ScrollView,Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Task } from "@/types/task"
import { useRouter } from "expo-router"
import { useLoader } from "@/context/LoaderContext"
import { getAllTaskData } from "@/services/taskService"
import { RefreshControl } from "react-native"


const HomeScreen = () => {

  const[task, settask] = useState<Task[]>([])
  const router = useRouter()
  const { hideLoader, showLoader } = useLoader()
  const [refreshing, setRefreshing] = useState(false);


  const loadAllTask = async () => {
    try{
      showLoader()
      await getAllTaskData()
        .then((data) => {
          settask(data)
          console.log(data)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          hideLoader()
        })
  }
  catch(err){
    console.error(err)
  }
  }

  useEffect(() => {
    loadAllTask()
  },[])

  const onRefresh = () => {
    setRefreshing(true);
    loadAllTask();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full">
        <Text className="text-center text-4xl font-bold text-green-800 py-4">
          Home Screen 
        </Text>
        
        <ScrollView 
          className="flex-1 px-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {task.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-lg text-gray-600 mb-2">
                No observations yet
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                Pull down to refresh or add a new observation
              </Text>
            </View>
          ) : (
            task.map((task) => (
              <View
                key={task.id}
                className="bg-white p-4 mb-4 rounded-lg border border-gray-200 shadow-sm"
              >
                {task.image && (
                  <Image 
                    source={{ uri: task.image }} 
                    className="w-full h-64 rounded-lg mb-3"
                    resizeMode="cover"
                  />
                )}
                <Text className="text-xl font-semibold text-gray-800 mb-2">
                  {task.title}
                </Text>
                <Text className="text-gray-600 mb-3">
                  {task.description}
                </Text> 
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
