import { Colors } from "@/shared/colors/Colors";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens } from "@/shared/styles/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const chat = () => {
  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <HeaderLayout withLogo noBorderRadius height={130}>
        <Text style={styles.title}>Inbox</Text>
        <Pressable onPress={() => router.push("/pet-owner/notifications")}>
          <Feather name="bell" size={24} color="black" alignSelf="flex-end" />
        </Pressable>
      </HeaderLayout>
    </View>
  );
};

export default chat;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    top: 30,
    marginLeft: 10,
  },
});
