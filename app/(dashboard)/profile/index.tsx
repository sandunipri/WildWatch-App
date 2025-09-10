import { View, Text, ScrollView, SafeAreaView,Image, TouchableOpacity } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { User } from "@/types/user";
import { auth } from "@/firebase";
import { getUserById } from "@/services/userService";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = () => {

    const insets = useSafeAreaInsets();
    const user = auth.currentUser
    const [profile, setProfile] = useState<User | null>(null);

    const loadProfile = async () => {
      if (user){
        const profileData = await getUserById(user.uid)
        setProfile(profileData)
      }
    }

    useFocusEffect(
      useCallback(() => {
        loadProfile();
      },[user])
    )

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className={`flex-1 bg-gray-100 pt-${insets.top} pb-${insets.bottom}`}>
    <ScrollView>

    <View className="items-center mb-6 mt-24">
      <Image
        source={{
          uri: profile.photoURL 
            ? profile.photoURL 
            : "https://via.placeholder.com/150"
        }}
        className="w-40 h-40 rounded-full border-4 border-gray-300"
      />
      <Text className="text-3xl font-bold">{profile.name}</Text>
      <Text className="text-gray-600">{profile.email}</Text>
      <Text className="text-gray-500">Joined: {new Date(profile.createdAt).toDateString()}</Text>

    </View>

    <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <Text className="text-gray-500 text-center">{profile.bio}</Text>
    </View>


    <View className="bg-white rounded-xl shadow-sm p-4 mb-safe-or-6 ">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Personal Details</Text>
      <View className="flex-row items-center mb-5">
        <Ionicons name="person-outline" size={20} color="#374151" />
        <Text className="ml-3 text-gray-800">{profile.name}</Text>
      </View>
      <View className="flex-row items-center mb-5">
        <Ionicons name="mail-outline" size={22} color="#374151" />
        <Text className="ml-3 text-gray-800">{profile.email}</Text>
      </View>
      <View className="flex-row items-center mb-5">
        <Ionicons name="call-outline" size={20} color="#374151" />
        <Text className="ml-3 text-gray-800">{profile.phoneNumber}</Text>
      </View>
      <View className="flex-row items-center mb-5">
        <Ionicons name="location-outline" size={20} color="#374151"/>
        <Text className="ml-3 text-gray-800">{profile.address}</Text>
      </View>
    </View>

  
        {/* Actions */}
    <View className="bg-white rounded-xl shadow-sm p-4">
      <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200"
      onPress={()=>router.push("/(dashboard)/profile/updateProfile")}
      >
        <Ionicons name="settings-outline" size={22} color="#374151" />
        <Text className="ml-3 text-gray-800">Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
        <Ionicons name="lock-closed-outline" size={22} color="#374151" />
        <Text className="ml-3 text-gray-800">Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center py-3">
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text className="ml-3 text-red-600">Logout</Text>
      </TouchableOpacity>
    </View>


    </ScrollView>
    </SafeAreaView>

    
  )
}

export default ProfileScreen
