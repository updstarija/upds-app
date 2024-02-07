import { Redirect, Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TourGuideProvider } from "rn-tourguide";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import ModalAuthCaution from "@/views/ModalAuthCaution";
import { StatusBar } from "expo-status-bar";
import { CarreraProvider } from "@/context";
import { useOnboardingStore } from "@/store/useOnboarding.store";

const RootLayout = () => {
  const { isViewed } = useOnboardingStore();

  if (!isViewed) {
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
