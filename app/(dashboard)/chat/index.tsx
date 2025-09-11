import { View, Text, Platform, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { use, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { getAllMessages, sendMessage } from '@/services/chatService'
import { Message } from '@/types/messages'
import { auth } from '@/firebase'
const chatScreen = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [text , setText] = useState('')
    const messageListRef = useRef<FlatList>(null)


    useEffect(() => {
        const unsubscibe = getAllMessages((msgs: Message[]) => {
            setMessages(msgs)
        });
        return unsubscibe
    },[])

    useEffect(() => {
        if(messages.length > 0){
            messageListRef.current?.scrollToEnd({animated : true})
        }
    },[messages])


    const handlesend = async() => {
        await sendMessage(text)
        setText('')
    }

  return (
    <KeyboardAvoidingView 
    className = "flex-1 bg-gray-100 p-5"
    behavior={Platform.OS === "android" ? "padding" : undefined}
    >

    <Text className='text-3xl font-bold text-center mt-10'>Chat Screen</Text>

    <View className='flex-1 w-full h-9 bg-gray-400 '>
        <FlatList
        className = "flex-1 bg-gray-100 pt-2"
        data = {messages}
        keyExtractor={(item) => item.senderId + item.timestamp}
        renderItem={({ item }) => {
        const mine = item.senderId === auth.currentUser?.uid 
            return (
                <View
                className={`my-2 flex ${mine ? "items-end" : "items-start"}`}
                >
                <View
                    className={`rounded-xl px-4 py-2 max-w-[100%] ${
                    mine ? "bg-green-800" : "bg-white"
                    } shadow`}
                >
                    {!mine && (
                    <Text className="text-xs text-gray-500 mb-1 font-semibold text-left">
                        {item.senderName || item.senderEmail || item.senderPhone}
                    </Text>
                    )}
                    <Text className={mine ? "text-white" : "text-gray-800 text-lg"}>
                    {item.text}
                    </Text>
                </View>
                </View>
            )
    }}
    contentContainerStyle = {{paddingBottom : 80}}
    />     
    </View>


    <View className='flex-row justify-between items-center border-t border-gray-300 bg-white p-4'>
        <TextInput
        className='flex-1 mr-2 bg-gray-200 rounded-full px-4 py-2'
        placeholder='Type a message'
        value={text}
        onChangeText={setText}
        onFocus={() => setTimeout(() => messageListRef.current?.scrollToEnd({animated : true}), 100)}
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