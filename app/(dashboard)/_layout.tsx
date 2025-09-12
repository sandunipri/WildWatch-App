import { View, Text, SafeAreaView,TouchableOpacity,Image } from "react-native"
import { Drawer } from "expo-router/drawer";
import { useNavigation } from "expo-router"
import { DrawerActions } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import React from "react";
import FooterTabs from "../../components/footerNav"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";



const DashboardLayout = () => {

  const navigation = useNavigation();


  return (
    <SafeAreaView className="flex-1 bg-white">
      <Drawer
        screenOptions = {({navigation}) => ({
          drawerActiveTintColor:"black",
          drawerInactiveTintColor:"black",
          drawerStyle:{
            backgroundColor:"white",
            width:280
          },
          drawerWidth: 280,
          headerTintColor:"white",
          headerTitleStyle:{
            fontFamily:"Poppins_700Bold",
            fontSize:20,
            fontWeight:"bold"
          },

          headerLeft:() => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{marginLeft:20}}
            >
              <Ionicons
                name="menu"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )
        })} 

         drawerContent={(props) => (
          <DrawerContentScrollView {...props} className="bg-black flex-1">
            <View className="items-center my-6">
              <Image
                source={{
                  uri: "https://via.placeholder.com/150", 
                }}
                className="w-32 h-32 rounded-full border-4 border-gray-300"
              />
              <Text className="text-white mt-2 font-bold text-lg">Username</Text>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="profile"
          options={{
            title: "PROFILE",
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="person"
                size={size}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name="home"
          options={{
            title: "HOME",
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="home-filled"
                size={size}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name="tasks"
          options={{
            title: "TASK",
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="task"
                size={size}
                color={color}
              />
            )
          }}
        />

        <Drawer.Screen
          name="chat"
          options={{
            title: "CHAT",
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="chat-bubble"
                size={size}
                color={color}
              />
            )
          }}
        />
      </Drawer>
    <FooterTabs />
    </SafeAreaView>
  )
}

export default DashboardLayout
