import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../colors/Colors";

interface IHeaderLayoutProps {
  children?: React.ReactNode;
  height?: number;
  noBorderRadius?: boolean;
  noShadowStyle?: boolean; // optional prop to disable shadow
  withLogo?: boolean; // ✅ new prop
}

const HeaderLayout = ({
  children,
  height = 100,
  noBorderRadius = false,
  withLogo = false, // default: no logo
}: IHeaderLayoutProps) => {
  return (
    <View
      style={[
        styles.header,
        {
          height,
          borderBottomLeftRadius: noBorderRadius ? 0 : 25,
          borderBottomRightRadius: noBorderRadius ? 0 : 25,
        },
      ]}
    >
      {withLogo && (
        <Image
          source={require("../../assets/images/logo/headerlogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 50,
    alignSelf: "flex-start",
    top: 35,
    marginLeft: 5,
  },
});

export default HeaderLayout;
