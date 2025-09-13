import { View, Text, SafeAreaView,TouchableOpacity,Image } from "react-native"
import { Drawer } from "expo-router/drawer";
import { useNavigation } from "expo-router"
import { DrawerActions } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react";
import FooterTabs from "../../components/footerNav"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { auth } from "@/firebase";
import { User } from "@/types/user";
import { getUserById } from "@/services/userService";



const DashboardLayout = () => {

  const navigation = useNavigation();

  const [userData, setUserData] = useState<User | null>(null);

  const placeholderURL =  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
      const existUser = async() =>{
        if(!auth.currentUser) return;

        const user = await getUserById(auth.currentUser.uid);
        setUserData(user);
      };

      existUser();

  }, []);

  const handleLogOut = async() => {
    try{
      await auth.signOut();
      // navigation.navigate("");
    }catch(err){
      console.error(err);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Drawer
        screenOptions = {({navigation}) => ({
          drawerActiveTintColor:"gray",
          drawerInactiveTintColor:"gray",
          drawerStyle:{
            backgroundColor:"white",
            width:280
          },
          drawerWidth: 280,
          headerTintColor:"white",
          headerTitleStyle:{
            fontFamily:"Poppins_700Bold",
            fontSize:18,
            fontWeight:"bold"
          },

          headerLeft:() => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{marginLeft:30}}
            >

              <View className="flex-row items-center">
              <Ionicons
                name="menu"
                size={28}
                color="black"
              />
              {/* <Image
                      source={require("../../assets/images/login/logo.png")}
                      className="w-32 h-32 rounded-full"
                      resizeMode="contain"
                      style={{ maxWidth: 60, maxHeight: 60 }}
               /> */}
              </View>              
            </TouchableOpacity>
          ),
            headerRight: () => (
              <Text className="text-green-900 text-xl ml-4 pr-8 font-bold">WILD-WATCH</Text>
              )
        })} 

         drawerContent={(props) => (
          <DrawerContentScrollView {...props} className="bg-black flex-1">
            <View className="items-center my-6">
              <Image
                source={{ uri: userData?.photoURL || placeholderURL }} 
                className="w-32 h-32 rounded-full border-4 border-gray-300"
              />
              <Text className="text-black mt-2 font-bold text-lg">{userData?.name || "Username"}</Text>
              <Text className="text-gray-400 text-sm">{userData?.email || "Email"}</Text>
            </View>
            <DrawerItemList {...props} />

            <View className="">
                <View className="flex-row items-center my-4 mt-10">
                    <View className="flex-1 h-px bg-black/20" />
                </View>
              <TouchableOpacity
              className="flex-row items-center border border-gray-300 rounded-xl py-3 px-3 justify-center" 
              onPress={handleLogOut}
              >
                <MaterialIcons name="logout" size={20} color="black"/>
                <Text className="text-black text-lg ml-4">LOGOUT</Text> 
              </TouchableOpacity>
            </View>
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="home"
          options={{
            title: "Home",
            drawerLabelStyle:{
              color:"#636060",
              fontSize:15
            },
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
          name="profile"
          options={{
            title: "Profile Details",
            drawerLabelStyle:{
              color:"#636060",
              fontSize:15
            },
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="person"
                size= {size}
                color={color}
              />
            )
          }}
        />

        <Drawer.Screen
          name="accountSetting"
          options={{
            title: "Account Settings",
            drawerLabelStyle:{
              color:"#636060",
              fontSize:15
            },
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="manage-accounts"
                size= {size}
                color={color}
              />
            )
          }}
        />

        <Drawer.Screen
          name="tasks"
          options={{
            title: "PostStory",
            drawerLabelStyle:{
              color:"#636060",
              fontSize:15
            },
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
          name="createTask"
          options={{
            title: "Add PostStory",
            drawerLabelStyle:{
              color:"#636060",
              fontSize:15
            },
            drawerIcon:({color,size}) => (
              <MaterialIcons
                name="library-add"
                size={size}
                color={color}
              />
            )
          }}
        />

        <Drawer.Screen
          name="chat"
          options={{
            title: "Chats",
            drawerLabelStyle:{
              color:"#636060",
              fontSize:15
            },
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

export default DashboardLayout;
