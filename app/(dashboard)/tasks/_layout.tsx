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
    <Stack screenOptions={{ animation: "fade_from_bottom" }}>
      {/* Only customize options if needed */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      {/* You can customize [id] options here without repeating the name */}
      <Stack.Screen
        name="[id]"
        options={{ title: "Task Form" }}
      />
    </Stack>
    </>
   
  );
};

export default TaskLayout;
