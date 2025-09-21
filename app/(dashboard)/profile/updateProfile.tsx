import { View, Text, ScrollView, TextInput, TouchableOpacity,Image, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/firebase';
import { useRouter } from 'expo-router';
import { updateUser } from '@/services/userService';
import { UploadImage } from '@/services/storageService';
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

const updateProfile = () => {

  const router = useRouter();
  const user = auth.currentUser
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false)

  // upload profile picture
  const [image, setImage] = useState<string | undefined>('');

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Image picker error:", err);
    }
  }

  const saveUpates = async () => {
    if (!user) return
    setLoading(true)
    try {

      let photoURL = user?.photoURL?? null;

      if (image) {
        photoURL = await UploadImage(image, `profileImages/${user.uid}/avatar.jpg`);
      }

      await updateUser(user.uid, {
        name,
        phoneNumber,
        address,
        bio,
        photoURL
      })
      router.back() 
    } catch (err) {
      console.error("Update failed:", err)
    } finally {
      setLoading(false)
    }
  }
  

  return (
        <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            className="flex-1 w-full p-5 bg-green-50"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
        <View>

          <TouchableOpacity onPress={pickImage}
            className='items-center mb-5'
            >
            <View className="w-40 h-40 rounded-full border-4 border-gray-300 items-center justify-center overflow-hidden">
              {
              image && user?.photoURL ? (
                  <Image
                    source={{
                      uri: image ?? user?.photoURL ?? "./../assets/images/login/logo.png",
                    }}
                    className="w-40 h-40 rounded-full border-4 border-gray-300"
              />
                ):(
                  <Ionicons name="camera" size={30} color="black" />
                )
              }

            </View>
          </TouchableOpacity>



            <TextInput
            placeholder='Name'
            value={name}
            onChangeText={setName}
            className='border border-gray-400 p-3 text-lg my-3 rounded-md'
            />
            <TextInput
            placeholder='phone'
            value={phoneNumber}
            onChangeText={setPhone}
            className='border border-gray-400 p-3 text-lg my-3 rounded-md'
            />
            <TextInput
            placeholder='address'
            value={address}
            onChangeText={setAddress}
            className='border border-gray-400 p-3 text-lg my-3 rounded-md'
            />
            <TextInput
            placeholder='bio'
            value={bio}
            numberOfLines={4}
            textAlignVertical="top"
            onChangeText={setBio}
            className='border border-gray-400 p-3 text-lg my-3 rounded-md'
            />
            <TouchableOpacity 
            className='bg-green-400 rounded-md text-center px-6 py-3 my-2'
            onPress={saveUpates}
            disabled={loading}
            > 
                <Text className='text-white text-lg text-center'>Update</Text>
            </TouchableOpacity>
        
        </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
    
  )
}

export default updateProfile