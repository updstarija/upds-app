import { useEffect } from "react";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { toastConfig } from "@/config";
import messaging from "@react-native-firebase/messaging";
import { useTheme } from "@/hooks/useTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "@/store/useAuth.store";
import { FirebaseNotification } from "~/constants/Firebase";
import mmkvStorage from "@/lib/storage/mmkv.storage";
import CONSTANTS from "@/constants/CONSTANTS";

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
  const { changeTheme, theme } = useTheme();

  const { user, status, token } = useAuthStore();
  console.log(
    "🚀 ~ RootLayoutNav ~ infoStore:",
    status,
    user.documentoIdentidad
  );

  useEffect(() => {
    changeTheme(theme);
  }, []);

  useEffect(() => {
    const isProd = CONSTANTS.PROD;
    const isDev = CONSTANTS.DEV;

    if (isProd && !isDev) return;

    const modeRunning = CONSTANTS.MODE;

    const isFakeProduction =
      (modeRunning === "production" && isDev) || modeRunning === "prerelease";

    alert(`
Running App in ${modeRunning} mode
Firebase Notification Key ${FirebaseNotification.NOTIFICATION_TOPIC}
    `);

    isFakeProduction &&
      alert(
        "You are running in a pre production mode, all data changes will be saved in the production database, BE CAREFUL!!!!!"
      );
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
