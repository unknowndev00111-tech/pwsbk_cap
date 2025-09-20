import { Colors } from "@/shared/colors/Colors";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens } from "@/shared/styles/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <HeaderLayout withLogo noBorderRadius height={120}>
        <Text style={styles.title}>Menu</Text>
      </HeaderLayout>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    top: 30,
    marginLeft: 10,
  },
});
