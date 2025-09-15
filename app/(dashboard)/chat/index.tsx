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
    <View className='flex-1 w-full h-full items-center'>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 90 : 0}
      style={{ flex: 1 }}
    >

    {/* <Text className='text-3xl font-bold text-center border border-b-gray-300 pb-2'>Chat Screen</Text> */}

    <View className='flex-1 bg-gray-400 '>
        <FlatList
        ref={messageListRef}
        className = "flex-1 p-3 bg-gray-100 pt-2"
        data = {messages}
        keyExtractor={(item) => item.senderId + item.timestamp}
        renderItem={({ item }) => {
        const mine = item.senderId === auth.currentUser?.uid 
            return (
                <View
                className={`my-2 flex ${mine ? "items-end" : "items-start"}`}
                >
                <View
                    className={`rounded-xl px-4 py-2 max-w-full ${
                    mine ? "bg-green-800" : "bg-white"
                    } shadow`}
                >
                    {!mine && (
                    <Text className="text-base text-gray-500 mb-1 font-semibold text-left">
                        {item.senderName || item.senderEmail || item.senderPhone}
                    </Text>
                    )}
                    <Text className={mine ? "text-white" : "text-gray-800 text-lg"}>
                    {item.text}
                    </Text>
                </View>
                </View>
            );
    }}
    contentContainerStyle = {{paddingBottom : 80}}
    onContentSizeChange={() => 
        messageListRef.current?.scrollToEnd({animated : true})
    }
    onLayout={() =>
        messageListRef.current?.scrollToEnd({animated : true})
    }
    />     
    </View>


    <View className="flex-row justify-between items-center border-t border-gray-300 bg-white p-4">
        <TextInput
        className='flex-1 mr-2 text-lg bg-gray-200 rounded-full px-4 py-2'
        placeholder='Type a message'
        value={text}
        onChangeText={setText}
        onFocus={() => setTimeout(() => messageListRef.current?.scrollToEnd({animated : true}), 100)}
        />

        <TouchableOpacity
        className='bg-green-500 rounded-full px-4 py-2'
        onPress={handlesend}
        >
        <Text className='text-white font-bold'>Send</Text>  
        </TouchableOpacity>
            
    </View>
    </KeyboardAvoidingView>
    </View>

    
  )
}

export default chatScreen