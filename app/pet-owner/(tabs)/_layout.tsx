import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import { HapticTab } from "@/components/haptic-tab";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/shared/colors/Colors";
import { ShadowStyle } from "@/shared/styles/styles";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const renderIcon = (
    focused: boolean,
    activeIcon: ImageSourcePropType,
    inactiveIcon: ImageSourcePropType
  ) => (
    <Image
      source={focused ? activeIcon : inactiveIcon}
      style={{
        width: 30,
        height: 30,
        tintColor: focused ? Colors.primary : "#C3C0C0", // 👈 active/inactive colors
        marginTop: 10,
      }}
      resizeMode="contain"
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          marginHorizontal: 20,
          width: "90%",
          height: 50,
          borderRadius: 25,
          backgroundColor: "#fff",
          ...ShadowStyle,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              require("../../../assets/Icons/home-fill.png"),
              require("../../../assets/Icons/home-outline.png")
            ),
        }}
      />
      <Tabs.Screen
        name="market-place"
        options={{
          title: "Market",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              require("../../../assets/Icons/store-fill.png"),
              require("../../../assets/Icons/store-outline.png")
            ),
        }}
      />
      <Tabs.Screen
        name="add-friend"
        options={{
          title: "Post",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              require("../../../assets/Icons/friend-fill.png"),
              require("../../../assets/Icons/friend-outline.png")
            ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              require("../../../assets/Icons/chat-fill.png"),
              require("../../../assets/Icons/chat-outline.png")
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              require("../../../assets/Icons/profile-fill.png"),
              require("../../../assets/Icons/profile-outline.png")
            ),
        }}
      />
    </Tabs>
  );
}
