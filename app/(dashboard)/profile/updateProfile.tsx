import { View, Text, ScrollView, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/firebase';
import { useRouter } from 'expo-router';
import { updateUser } from '@/services/userService';
import { UploadImage } from '@/services/storageService';
import * as ImagePicker from "expo-image-picker";

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
    <ScrollView className='flex-1 bg-gray-100 p-6 mt-10'>
        <Text className='text-2xl font-bold'>updateProfile</Text>
    <View>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: image ?? user?.photoURL ?? "https://via.placeholder.com/150",
            }}
            className="w-40 h-40 rounded-full border-4 border-gray-300"
          />
          <Text className="text-blue-500 text-center mt-2">Change Photo</Text>
        </TouchableOpacity>


        <TextInput
        placeholder='Name'
        value={name}
        onChangeText={setName}
        className='border border-gray-400 p-2 my-2 rounded-md'
        />
        <TextInput
        placeholder='phone'
        value={phoneNumber}
        onChangeText={setPhone}
        className='border border-gray-400 p-2 my-2 rounded-md'
        />
        <TextInput
        placeholder='address'
        value={address}
        onChangeText={setAddress}
        className='border border-gray-400 p-2 my-2 rounded-md'
        />
        <TextInput
        placeholder='bio'
        value={bio}
        onChangeText={setBio}
        className='border border-gray-400 p-2 my-2 rounded-md'
        />
        <TouchableOpacity 
        onPress={saveUpates}
        disabled={loading}
        > 
            <Text className='bg-blue-400 rounded-md px-6 py-3 my-2'>Update</Text>
        </TouchableOpacity>
     
    </View>
    </ScrollView>

    
  )
}

export default updateProfile