import { View, Text, Platform } from "react-native"
import React, { useEffect } from "react"
import { Slot, Stack } from "expo-router"
import "./../global.css"
import { LoaderProvider } from "@/context/LoaderContext"
import { AuthProvider } from "@/context/AuthContext"
import { StatusBar } from "expo-status-bar"
import * as NavigationBar from 'expo-navigation-bar';


const RootLayout = () => {

    useEffect(() => {
      if (Platform.OS === "android") {
        NavigationBar.setBackgroundColorAsync("#000"); 
        NavigationBar.setButtonStyleAsync("dark");  
      }
    })

  return (
    <>
    <StatusBar style="dark" />
    <LoaderProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoaderProvider>
    </>
    
  )
}

export default RootLayout

