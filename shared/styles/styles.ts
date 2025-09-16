import { StyleSheet } from "react-native";

export const screens = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});

export const ShadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 }, // x:0, y:3
  shadowOpacity: 0.16, // 16%
  shadowRadius: 4.5, // blur = 9 → radius ≈ 4.5
  elevation: 4,
};
