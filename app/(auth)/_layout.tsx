import { View, Text, Platform } from "react-native"
import React, { useEffect } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as NavigationBar from 'expo-navigation-bar';

const AuthLayout = () => {

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("black"); 
      NavigationBar.setButtonStyleAsync("dark");  
    }
  })

  return (
    <>
    <StatusBar style="light" />
     <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Login" }} />
    </Stack>
    </>
   
  )
}

export default AuthLayout
