import { Redirect, Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TourGuideProvider } from "rn-tourguide";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import { useAuthContext } from "@/hooks";
import { Texto } from "@/ui";
import ModalAuthCaution from "@/views/ModalAuthCaution";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  const { welcomeScreen } = useAuthContext();

  if (welcomeScreen.isLoading) {
    return <Texto>VERIFINGWELCOME SCREEN</Texto>;
  }

  if (!welcomeScreen.value) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <>
      <StatusBar style="light" />

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

            <ModalAuthCaution />
          </TourGuideProvider>
        </BottomSheetModalProvider>
      </ProyeccionesProvider>
    </>
  );
};

export default RootLayout;
