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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { register } from "@/services/authService"
import "./../../global.css"
import { Ionicons } from "@expo/vector-icons"


const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [cPassword, setCPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false);
  

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
      <KeyboardAvoidingView
         behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          className="flex-1 bg-black"
        >
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        >
        <View className=" w-full p-10 flex-1 justify-center">
    
        <View className="items-center">
             <Image
              source={require("../../assets/images/login/logo.png")}
              className="w-40 h-40 rounded-full"
              resizeMode="contain"
              style={{ maxWidth: 128, maxHeight: 128 }}
            />
        </View>

       <Text className="text-3xl font-bold text-center  text-white">Welcome</Text>
       <Text className="text-lg font-bold text-center mt-4 mb-4  text-white">Create your new account</Text>
      
          <View className="mb-5">
            <View className="bg-white/10 rounded-xl px-4 py-3 border border-white/20 flex-row items-center mb-4">
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
              className="flex-1 text-white  text-lg"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            </View>
      
          <View className="bg-white/10 rounded-xl px-4 py-3 mb-4 border border-white/20 flex-row items-center">
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className="flex-1 text-white text-lg"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          </View>
          <View className="bg-white/10 rounded-xl px-4 py-3 border border-white/20 flex-row items-center">
          <TextInput
            placeholder="confirm Password"
            value={cPassword}
            onChangeText={setCPassword}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry={!showPassword}
            className="flex-1 text-white text-lg"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          </View>
        </View>



      <TouchableOpacity
        onPress={handleRegister}
        className="bg-green-400 rounded-xl p-4 mt-6"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-green-900 text-xl font-bold">Register</Text>
        )}
      </TouchableOpacity>

       <View className="flex-row items-center my-4">
                  <View className="flex-1 h-px bg-white/20" />
                  <Text className="text-white/70 mx-3">Or continue with</Text>
                  <View className="flex-1 h-px bg-white/20" />
        </View>

          <View className="flex-row justify-center">
                   <Pressable
                  className="mt-2"
                  onPress={() => router.push("/login")}
                >
                  <Text className="text-center text-white text-lg">
                    Already have an account? 
                     <Text className="text-green-400 font-semibold">Login</Text> 
                  </Text>
                </Pressable>
                 </View>

      <View className="p-5 items-center">
              <Text className="text-white text-xs">
                  © 2025 wildwatchApp. All rights reserved
              </Text>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>

  
  )
}

export default Register
