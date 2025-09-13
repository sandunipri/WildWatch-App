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

  const post = new Date(task[0]?.createdAt || 0);

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
      <View className="px-6 py-8 bg-green-100 rounded-b-3xl shadow-md">
        <Text className="text-center text-lg text-green-800 font-semibold">
          Welcome to WildWatch!
        </Text>
        <Text className="text-center text-sm text-green-700 mt-2">
          Stay updated with the latest tasks, posts, and chats. Manage your profile, track your stories, and connect with your community.
        </Text>
      </View>
        
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

            task.map((task) => {

            const postDate = new Date(task.createdAt || task.createdDate || "");
            const taskDate = postDate.toLocaleDateString();
            const taskTime = postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
              <View
                key={task.id}
                className="bg-white p-4 mb-4 rounded-lg border border-gray-200 shadow-lg"
              >
                {task.image && (
                  <Image 
                    source={{ uri: task.image }} 
                    className="w-full h-52"
                    resizeMode="cover"
                  />
                )}

                <View className="p-2"> 
                  <Text className="text-xl font-bold text-center text-gray-800 mb-2">
                  {task.title}
                </Text>
                </View>

                  <Text className="text-gray-700 text-base px-2 mb-3">
                   Description : {task.description}
                  </Text>

                <View className="flex-row justify-between items-center mb-2">
                  <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-gray-600 mb-1">
                    Date: {taskDate}
                  </Text>
                  </View>

                  <View className="bg-blue-100 px-3 py-1 rounded-full">
                    <Text className="text-blue-800 text-sm">Time: {taskTime}</Text>
                  </View>
                </View>
              </View>
              )

            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
