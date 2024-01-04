import { CarreraProvider } from "@/context";
import configScreen from "@/helpers/configScreen";
import { useAuthContext } from "@/hooks";
import { Texto } from "@/ui";
import { Redirect, Stack, useFocusEffect } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { IStep, TooltipProps, TourGuideProvider } from "rn-tourguide";

import CONSTANS from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
interface ITourStep extends IStep {
  tourKey: string;
}

interface TourProps extends TooltipProps {
  currentStep: ITourStep;
}

const UnprotectedLayout = () => {
  const { status } = useAuthContext();
  const isIos = Platform.OS === "ios";

  if (status !== "authenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  const onSkipOrFinishTutorial = async (tooltipProps: TourProps) => {
    if (!tooltipProps.handleStop) return;
    tooltipProps.handleStop();

    await AsyncStorage.setItem(tooltipProps.currentStep.tourKey, "true");
  };

  const tooltipComponentTour = (tooltipProps: TourProps) => {
    const {
      isLastStep,
      isFirstStep,
      handleNext,
      handlePrev,
      handleStop,
      currentStep,
    } = tooltipProps;

    return (
      <View className="bg-primario dark:bg-secondary-dark p-2 rounded-xl w-72">
        <View className="p-2">
          {typeof currentStep?.text == "string" ? (
            <Texto className="text-white mb-2 text-center mt-2">
              {tooltipProps.currentStep.text}
            </Texto>
          ) : (
            <>{currentStep?.text}</>
          )}
        </View>

        <View className="flex-row gap-4 justify-evenly">
          {/* {<TouchableOpacity onPress={() => handleStop()} className="p-2">
            <Texto className="text-white">Saltar</Texto>
          </TouchableOpacity>} */}

          {!isFirstStep && (
            <TouchableOpacity onPress={tooltipProps.handlePrev} className="p-4">
              <Texto className="text-white">Anterior</Texto>
            </TouchableOpacity>
          )}

          {!isLastStep ? (
            <TouchableOpacity onPress={tooltipProps.handleNext} className="p-4">
              <Texto className="text-white">Siguiente</Texto>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onSkipOrFinishTutorial(tooltipProps)}
              className="p-4"
            >
              <Texto className="text-white">Terminar</Texto>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <AutocompleteDropdownContextProvider>
      <TourGuideProvider
        preventOutsideInteraction
        borderRadius={16}
        // {...{ borderRadius: 16 }}
        backdropColor="#000000b3"
        //backdropColor="rgba(0,0,0,0.4)"

        verticalOffset={isIos ? -0.1 : CONSTANS.statusBarHeight}
        tooltipComponent={(props) => tooltipComponentTour(props as TourProps)}
      >
        <CarreraProvider>
          <Stack>
            <Stack.Screen
              name="historical-academic/index"
              options={configScreen.Stack("Historico Registro")}
            />

            <Stack.Screen
              name="profile"
              options={configScreen.Stack("Perfil")}
            />

            <Stack.Screen
              name="projections"
              options={configScreen.Stack("Proyecciones")}
            />
          </Stack>
        </CarreraProvider>
      </TourGuideProvider>
    </AutocompleteDropdownContextProvider>
  );
};

export default UnprotectedLayout;
