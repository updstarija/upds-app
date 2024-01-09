import { useEffect } from "react";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
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

  const [[isLoadingTheme, theme]] = useStorageState<Theme>(keysStorage.THEME);
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isLoadingTheme) {
      setColorScheme(theme || "system");

      SplashScreen.hideAsync();
    }
  }, [loaded, isLoadingTheme]);

  if (!loaded || isLoadingTheme) {
    return null;
  }

  return (
    <ThemeProvider initialTheme={theme || "system"}>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PopupWindowProvider>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        </PopupWindowProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
