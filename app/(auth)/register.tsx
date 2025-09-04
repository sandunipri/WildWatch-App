import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { register } from "@/services/authService"
import "./../../global.css"


const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [cPassword, setCPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleRegister = async () => {
    // if(email)
    // password
    if (isLoading) return
    if (password !== cPassword) {
      Alert.alert("Title", "description")
      return
    }
    setIsLoading(true)
    await register(email, password)
      .then((res) => {
        // const res = await register(email, password)
        // success
        router.back()
      })
      .catch((err) => {
        Alert.alert("Registration failed", "Somthing went wrong")
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    
    <ImageBackground source={require("../../assets/images/login/img-02.jpg")} className="flex-1 justify-center items-center" resizeMode="cover">

    <View className="absolute inset-0 bg-black opacity-50" /> 

    <View className="flex-1 w-full justify-center align-items-center p-4 ">
      <Image
         source={require("../../assets/images/login/logo.png")}
         className="w-32 h-32 m-16 rounded-full"
         resizeMode="contain"
         style={{ maxWidth: 128, maxHeight: 128 }}
        />

      <Text className="text-4xl text-center mb-2 text-white">Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="bg-surface border border-gray-300 text-lg text-white rounded px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-surface border border-gray-300 text-lg text-white rounded px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Confirm password"
        value={cPassword}
        onChangeText={setCPassword}
        secureTextEntry
        className="bg-surface border border-gray-300 text-lg text-white rounded px-4 py-3 mb-4"
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-black p-4 rounded mt-10"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-white text-2xl">Register</Text>
        )}
      </TouchableOpacity>
      <Pressable className="px-6 py-3" onPress={() => router.back()}>
        <Text className="text-xl text-center text-white">
          Alrady have an account? Login
        </Text>
      </Pressable>
    </View>
    </ImageBackground>
  )
}

export default Register
