import { View, Text, SafeAreaView,TouchableOpacity } from "react-native"
import { Drawer } from "expo-router/drawer";
import { useNavigation } from "expo-router"
import { DrawerActions } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import React from "react";
import FooterTabs from "../../components/footerNav"



const DashboardLayout = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Drawer
        screenOptions = {({navigation}) => ({
          drawerActiveTintColor:"white",
          drawerInactiveTintColor:"white",
          drawerStyle:{
            backgroundColor:"black",
            width:280
          },
          drawerWidth: 280,
          headerTintColor:"black",
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
      >
        <Drawer.Screen
          name="home"
          options={{
            title: "dashboard/home",
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
            title: "dashboard/tasks",
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
          name="profile"
          options={{
            title: "dashboard/profile",
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
          name="chat"
          options={{
            title: "dashboard/chat",
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
