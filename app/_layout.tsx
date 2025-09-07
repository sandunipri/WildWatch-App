import { View, Text } from "react-native"
import React from "react"
import { Slot, Stack } from "expo-router"
import "./../global.css"
import { LoaderProvider } from "@/context/LoaderContext"
import { AuthProvider } from "@/context/AuthContext"
import { StatusBar } from "expo-status-bar"

const RootLayout = () => {
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

