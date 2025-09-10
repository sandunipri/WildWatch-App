import { View, Text, Platform, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { getAllMessages, sendMessage } from '@/services/chatService'
import { Message } from '@/types/messages'
const chatScreen = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [text , setText] = useState('')


    useEffect(() => {
        const unsubscibe = getAllMessages((msgs: Message[]) => {
            setMessages(msgs)
        });
        return unsubscibe
    },[])


    const handlesend = async() => {
        await sendMessage(text)
        setText('')
    }

  return (
    <KeyboardAvoidingView 
    className = "flex-1 bg-gray-100 pt-2"
      behavior={Platform.OS === "android" ? "padding" : undefined}
    >

    <FlatList
    className = "flex-1 bg-gray-100 pt-2"
    data = {messages}
    keyExtractor={(item) => item.senderId + item.timestamp}
    renderItem={({item}) => (
        <View>
            <Text className="font-bold">{item.senderName || item.senderEmail}</Text>
            <Text className="text-gray-700">{item.text}</Text>
        </View>
    )}
    />

    <View className='flex-row justify-between items-center border-t border-gray-300 bg-white p-4'>
        <TextInput
        className='flex-1 mr-2 bg-gray-200 rounded-full px-4 py-2'
        placeholder='Type a message'
        value={text}
        onChangeText={setText}
        />

        <TouchableOpacity
        className='bg-blue-500 rounded-full px-4 py-2'
        onPress={handlesend}
        >
        <Text className='text-white font-bold'>Send</Text>  
        </TouchableOpacity>
            
    </View>
    </KeyboardAvoidingView>
    
  )
}

export default chatScreen