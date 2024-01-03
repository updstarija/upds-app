import { useEffect } from "react";
import { Platform, useColorScheme, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TooltipProps, TourGuideProvider, IStep } from "rn-tourguide";
import CONSTANS from "expo-constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider, CarreraProvider } from "@/context";
import { configStack } from "@/helpers";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { toastConfig } from "@/config";
import { ThemeProvider } from "@/context/ThemeContext";
import { Texto } from "@/ui";
import { AntDesign } from "@expo/vector-icons";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import { PopupWindowProvider } from "@/context/PopupWindowContext";

const queryClient = new QueryClient();

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

messaging().setBackgroundMessageHandler(async (msg) => {
  console.log("notificacion on background", msg.data);
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("~/assets/fonts/SpaceMono-Regular.ttf"),
    LatoRegular: require("~/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("~/assets/fonts/Lato-Bold.ttf"),
    LatoLight: require("~/assets/fonts/Lato-Light.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
