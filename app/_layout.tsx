// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import Splash from "../components/screen/SplashScreen";

// Prevent auto-hide until we're ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Sans: require("../assets/fonts/InriaSans-Regular.ttf"),
    SansBold: require("../assets/fonts/InriaSans-Bold.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoSemiBold: require("../assets/fonts/Roboto-SemiBold.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
        // keep splash visible for a moment
        setTimeout(() => setAppReady(true), 800);
      }
    };
    prepareApp();
  }, [loaded]);

  useEffect(() => {
    if (appReady) {
      router.replace("/pet-owner/(tabs)/menu"); // replace so user can't go back to splash
    }
  }, [appReady]);

  if (!appReady) {
    return <Splash />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationRoot />
    </ThemeProvider>
  );
}

function NavigationRoot() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="StartScreen" />
      <Stack.Screen name="pet-owner/(tabs)" />
      <Stack.Screen name="pet-owner/(home)" />
      <Stack.Screen name="pet-owner/(market)" />
      <Stack.Screen name="pet-owner/(friends)" />
      <Stack.Screen name="usable" />

      <Stack.Screen name="auth" options={{ headerShown: false }} />

      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
