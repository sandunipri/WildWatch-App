import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await login(email, password)
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        Alert.alert("Login failed", "Something went wrong");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-50">
      <Text className="text-4xl font-bold text-center mb-6 text-gray-800">
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-900"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-900"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-blue-600 rounded-lg p-4 mb-4"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-white text-xl font-semibold">
            Login
          </Text>
        )}
      </TouchableOpacity>

      <Pressable
        className="mt-2"
        onPress={() => router.push("/register")}
      >
        <Text className="text-center text-blue-500 text-lg">
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
