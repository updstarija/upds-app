import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import configScreen from "@/helpers/configScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TourGuideProvider } from "rn-tourguide";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import { useAuthContext } from "@/hooks";
import { Texto } from "@/ui";

const RootLayout = () => {
  const { welcomeScreen } = useAuthContext();
  if (welcomeScreen.isLoading) {
    return <Texto>VERIFINGWELCOME SCREEN</Texto>;
  }

  if (!welcomeScreen.value) {
    return <Redirect href={"/welcome"} />;
  }
  return (
    <ProyeccionesProvider>
      <BottomSheetModalProvider>
        <TourGuideProvider>
          <Stack>
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(screens)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </TourGuideProvider>
      </BottomSheetModalProvider>
    </ProyeccionesProvider>
  );
};

export default RootLayout;
