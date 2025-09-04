import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image,
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

     <ImageBackground
        source={require("../../assets/images/login/img-01.jpg")}
        className="flex-1 w-full h-full justify-center items-center"
        resizeMode="cover"
      >

    <View className="w-full  p-10 flex-1 items-center justify-center">

      <Image
          source={require("../../assets/images/login/logo.png")}
          className="w-32 h-32 m-16 rounded-full"
          resizeMode="contain"
          style={{ maxWidth: 128, maxHeight: 128 }}
        />

      <Text className="text-4xl font-bold text-center mb-6 text-gray-800">
        LOGIN
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full  border border-gray-300 text-lg rounded-lg px-4 py-3 mb-4 text-white"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 text-lg rounded-lg px-4 py-3 mb-4 text-white"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-transparent border rounded-lg p-4 mb-4 mt-8"
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
        <Text className="text-center text-white text-lg">
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
    </ImageBackground>
  );
};

export default Login;
