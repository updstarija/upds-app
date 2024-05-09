import { Redirect, Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TourGuideProvider } from "rn-tourguide";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import ModalAuthCaution from "@/views/ModalAuthCaution";
import { StatusBar } from "expo-status-bar";
import { useOnboardingStore } from "@/store/useOnboarding.store";
import DevMenuEnviroment from "@/modules/dev/dev-menu-enviroment";
import { useEffect } from "react";
import { rateApp } from "@/modules/store-review/lib/rate-app";
import CONSTANTS from "@/constants/CONSTANTS";
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from "sp-react-native-in-app-updates";
import { Platform } from "react-native";

const inAppUpdates = new SpInAppUpdates(
  false // isDebug
);

const RootLayout = () => {
  const { isViewed } = useOnboardingStore();

  if (!isViewed) {
    return <Redirect href={"/welcome"} />;
  }

  useEffect(() => {
    rateApp();
  }, []);

  useEffect(() => {
    inAppUpdates.checkNeedsUpdate().then((result) => {
      if (result.shouldUpdate) {
        let updateOptions: StartUpdateOptions = {};
        if (Platform.OS === "android") {
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    });
  }, []);

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

            {!CONSTANTS.PROD && <DevMenuEnviroment />}

            <ModalAuthCaution />
          </TourGuideProvider>
        </BottomSheetModalProvider>
      </ProyeccionesProvider>
    </>
  );
};

export default RootLayout;
