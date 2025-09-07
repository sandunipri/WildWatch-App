import { View, Text, ScrollView, SafeAreaView,Image, TouchableOpacity } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {

    const insets = useSafeAreaInsets();
  

  return (
    <SafeAreaView className={`flex-1 bg-gray-100 pt-${insets.top} pb-${insets.bottom}`}>
    <ScrollView>

    <View className="items-center mb-6 mt-24">
      <Image source = {{ uri: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80'}} 
      className="w-40 h-40 rounded-full border-4 border-gray-300"
      />
      <Text className="text-3xl font-bold">User Name</Text>
      <Text className="text-gray-600">Email</Text>
      <Text className="text-gray-500">user joined</Text>

    </View>

    <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <Text className="text-gray-500 text-center">bio</Text>
    </View>


    <View className="bg-white rounded-xl shadow-sm p-4 mb-safe-or-6 ">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Personal Details</Text>
      <View className="flex-row items-center mb-5">
        <Ionicons name="person-outline" size={20} color="#374151" />
        <Text className="ml-3 text-gray-800">Name</Text>
      </View>
      <View className="flex-row items-center mb-5">
        <Ionicons name="mail-outline" size={22} color="#374151" />
        <Text className="ml-3 text-gray-800">Email</Text>
      </View>
      <View className="flex-row items-center mb-5">
        <Ionicons name="call-outline" size={20} color="#374151" />
        <Text className="ml-3 text-gray-800">Phone</Text>
      </View>
      <View className="flex-row items-center mb-5">
        <Ionicons name="location-outline" size={20} color="#374151"/>
        <Text className="ml-3 text-gray-800">Location</Text>
      </View>
    </View>

  
        {/* Actions */}
    <View className="bg-white rounded-xl shadow-sm p-4">
      <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
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
