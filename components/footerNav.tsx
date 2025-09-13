import { View, Text, Pressable } from "react-native"
import React from "react"
import { Link, usePathname } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

type TabRoute = "/home" | "/tasks" | "/profile" | "/chat"

const tabs: { href: TabRoute; label: string; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { href: "/home", label: "Home", icon: "home-filled" },
  { href: "/tasks", label: "Task", icon: "post-add" },
  { href: "/profile", label: "Profile", icon: "person" },
  { href: "/chat", label: "chat", icon: "chat" },
]

const FooterNav = () => {
  const pathname = usePathname()

  return (
    <View className="flex-row items-center justify-between pb-14 border border-t-gray-300 pt-3 px-8 bg-white shadow shadow-gray-400">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link key={tab.href} href={tab.href} asChild>
            <Pressable className="items-center gap-1">
              <MaterialIcons
                name={tab.icon}
                size={28}
                color={isActive ? "#13a86a" : "#2c3e50"}
              />
              <Text
                className={`text-xs font-bold ${
                  isActive ? "text-green-500" : "text-black"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          </Link>
        )
      })}
    </View>
  )
}

export default FooterNav
