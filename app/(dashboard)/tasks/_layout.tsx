import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
const TaskLayout = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("black"); 
      NavigationBar.setButtonStyleAsync("dark");  
    }
  }, []);
  return (
    <>
    <StatusBar style="dark" />
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
    </>
   
  );
};

export default TaskLayout;
