import { View, Text, ScrollView, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/firebase';
import { useRouter } from 'expo-router';
import { updateUser } from '@/services/userService';

const updateProfile = () => {

  const router = useRouter();
  const user = auth.currentUser
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false)

  const saveUpates = async () => {
    if (!user) return
    setLoading(true)
    try {
      await updateUser(user.uid, {
        name,
        phoneNumber,
        address,
        bio
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
        {/* profile picture */}

        <Image source={{uri:'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80'}}
        className='w-40 h-40 rounded-full border-4 border-gray-300'     
        />

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