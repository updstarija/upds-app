import { useEffect } from "react";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/context";
import { toastConfig } from "@/config";
import { Theme, ThemeProvider } from "@/context/ThemeContext";
import { PopupWindowProvider } from "@/context/PopupWindowContext";
import messaging from "@react-native-firebase/messaging";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";
import { useColorScheme } from "nativewind";

const queryClient = new QueryClient();

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

//BACKGROUND NOTIFICATION
messaging().setBackgroundMessageHandler(async (msg) => {
  console.log("NOTIFICATION ON BACKGROUND", msg.data);
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("~/assets/fonts/SpaceMono-Regular.ttf"),
    LatoRegular: require("~/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("~/assets/fonts/Lato-Bold.ttf"),
    LatoLight: require("~/assets/fonts/Lato-Light.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PopupWindowProvider>
          <Slot />
        </PopupWindowProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
