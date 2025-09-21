import { Colors } from "@/shared/colors/Colors";
import { HeaderTitleStyle } from "@/shared/styles/styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderWithActionsProps {
  title?: string;
  onBack?: () => void;
  onAction?: () => void;
  actionIcon?: keyof typeof Feather.glyphMap;
  children?: React.ReactNode; // 👈 allow custom content (like TextInput)
}

const HeaderWithActions: React.FC<HeaderWithActionsProps> = ({
  title,
  onBack,
  onAction,
  actionIcon = "search",
  children,
}) => {
  return (
    <View style={styles.headerRow}>
      {/* Left side: back + title/children */}
      <View style={styles.leftRow}>
        {onBack && (
          <Pressable onPress={onBack} style={{ marginRight: 5 }}>
            <MaterialIcons name="arrow-back-ios" size={20} color="black" />
          </Pressable>
        )}

        {/* If children provided, render that, else show title */}
        {children ? (
          <View style={{ flex: 1 }}>{children}</View>
        ) : (
          title && <Text style={HeaderTitleStyle.title}>{title}</Text>
        )}
      </View>

      {/* Right side action */}
      {onAction ? (
        <Pressable onPress={onAction}>
          <Feather name={actionIcon} size={24} color="black" />
        </Pressable>
      ) : (
        <View style={{ width: 24 }} /> // placeholder
      )}
    </View>
  );
};

export default HeaderWithActions;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 55,
    backgroundColor: Colors.white,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
