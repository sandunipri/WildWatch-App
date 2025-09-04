import React from "react";
import { Stack } from "expo-router";

const TaskLayout = () => {
  return (
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
  );
};

export default TaskLayout;
