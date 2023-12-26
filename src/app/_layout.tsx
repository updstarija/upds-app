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
      // SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

interface ITourStep extends IStep {
  tourKey: string;
}

interface TourProps extends TooltipProps {
  currentStep: ITourStep;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isIos = Platform.OS == "ios";

  const onSkipOrFinishTutorial = async (tooltipProps: TourProps) => {
    if (!tooltipProps.handleStop) return;

    tooltipProps.handleStop();
    AsyncStorage.setItem(tooltipProps.currentStep.tourKey, "true");
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
            <TouchableOpacity onPress={handlePrev} className="p-4">
              <Texto className="text-white">Anterior</Texto>
            </TouchableOpacity>
          )}

          {!isLastStep ? (
            <TouchableOpacity onPress={handleNext} className="p-4">
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CarreraProvider>
          <ProyeccionesProvider>
            <AutocompleteDropdownContextProvider>
              <BottomSheetModalProvider>
                <TourGuideProvider
                  preventOutsideInteraction
                  borderRadius={16}
                  // {...{ borderRadius: 16 }}
                  tooltipStyle={{
                    zIndex: 99999999,
                  }}
                  backdropColor="#000000b3"
                  //backdropColor="rgba(0,0,0,0.4)"
                  verticalOffset={isIos ? -0.1 : CONSTANS.statusBarHeight}
                  tooltipComponent={(props) =>
                    tooltipComponentTour(props as TourProps)
                  }
                >
                  <ThemeProvider>
                    <Stack>
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="auth/login"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(drawer)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="bienvenida"
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="(paginas)/carrera/[id]"
                        //@ts-ignore
                        options={configStack("Carrera")}
                      />

                      <Stack.Screen
                        name="(paginas)/notificacion"
                        //@ts-ignore
                        options={{ ...configStack("Notificaciones") }}
                      />

                      <Stack.Screen
                        name="(paginas)/perfil"
                        //@ts-ignore
                        options={{ ...configStack("Perfil") }}
                      />

                      <Stack.Screen
                        name="(paginas)/about/index"
                        //@ts-ignore
                        options={{ ...configStack("Acerca de la aplicacion") }}
                      />

                      <Stack.Screen
                        name="(paginas)/politica/index"
                        //@ts-ignore
                        options={{ ...configStack("Politica de Privacidad") }}
                      />

                      <Stack.Screen
                        name="(paginas)/notificacionConfig/index"
                        //@ts-ignore
                        options={{ ...configStack("Ajuste de Notificaciones") }}
                      />

                      <Stack.Screen
                        name="(paginas)/terminos/index"
                        //@ts-ignore
                        options={{ ...configStack("Terminos de Uso") }}
                      />
                      <Stack.Screen
                        name="(paginas)/tema/index"
                        //@ts-ignore
                        options={{ ...configStack("Ajustes de Tema") }}
                      />

                      <Stack.Screen
                        name="(paginas)/tutorialConfig/index"
                        //@ts-ignore
                        options={{ ...configStack("Ajustes de Tutoriales") }}
                      />

                      <Stack.Screen
                        name="(paginas)/calendario-academico/index"
                        //@ts-ignore
                        options={{ ...configStack("Calendario Académico") }}
                      />

                      <Stack.Screen
                        name="(paginas)/tutorial/index"
                        //@ts-ignore
                        options={{ ...configStack("Tutoriales") }}
                      />

                      <Stack.Screen
                        name="(paginas)/faq/index"
                        //@ts-ignore
                        options={{ ...configStack("Preguntas Frecuentes") }}
                      />

                      <Stack.Screen
                        name="(home)/redes-sociales"
                        //@ts-ignore
                        options={configStack("Redes Sociales")}
                      />

                      <Stack.Screen
                        name="(home)/comunicados/index"
                        //@ts-ignore
                        options={configStack("Comunicados")}
                      />

                      <Stack.Screen
                        name="(home)/comunicados/[id]"
                        //@ts-ignore
                        options={{
                          ...configStack("Comunicado"),
                          headerShown: false,
                        }}
                      />

                      {/* FIX: NO DISPONINLE */}
                      <Stack.Screen
                        name="(home)/upds-responde"
                        //@ts-ignore
                        options={configStack("UPDS Responde")}
                      />

                      <Stack.Screen
                        name="(home)/chat"
                        //@ts-ignore
                        options={configStack("UPDS Responde")}
                      />

                      <Stack.Screen
                        name="(home)/test-vocacional"
                        //@ts-ignore
                        options={configStack("Test Vocacional")}
                      />

                      <Stack.Screen
                        name="(home)/ubicacion"
                        //@ts-ignore
                        options={configStack("Ubicación")}
                      />

                      <Stack.Screen
                        name="(estudiante)/ayuda"
                        //@ts-ignore
                        options={configStack("AYUDA")}
                      />

                      <Stack.Screen
                        name="(estudiante)/servicios"
                        //@ts-ignore
                        options={configStack("Registro y Pagos")}
                      />

                      <Stack.Screen
                        name="(estudiante)/proyecciones"
                        //@ts-ignore
                        options={configStack("Proyecciones")}
                      />

                      {/*              <Stack.Screen
                        name="(estudiante)/proyecciones"
                        //@ts-ignore
                        options={configStack("Proyecciones")}
                      />
 */}
                      <Stack.Screen
                        name="(estudiante)/historico-materias"
                        //@ts-ignore
                        options={configStack("Histórico de Materias")}
                      />

                      <Stack.Screen
                        name="(estudiante)/registro-materia"
                        //@ts-ignore
                        options={configStack("Registro de Materia")}
                      />

                      <Stack.Screen
                        name="(paginas-externas)/moodle/index"
                        //@ts-ignore
                        options={configStack("Plataforma Moodle")}
                      />

                      <Stack.Screen
                        name="(paginas-externas)/multipagos"
                        //@ts-ignore
                        options={configStack("Multipagos")}
                      />

                      <Stack.Screen
                        name="(paginas-externas)/moodle/[id]"
                        //@ts-ignore
                        options={configStack("Moodle Aula")}
                      />

                      <Stack.Screen
                        name="(paginas-externas)/evaluacion/index"
                        //@ts-ignore
                        options={configStack("Plataforma Moodle")}
                      />
                      <Stack.Screen
                        name="(paginas-externas)/evaluacion/[id]"
                        //@ts-ignore
                        options={configStack("Evaluacion Docente")}
                      />

                      <Stack.Screen
                        name="(paginas-externas)/updsnet"
                        //@ts-ignore
                        options={configStack("UpdsNet")}
                      />

                      {/*     <Stack.Screen
                    name="(paginas-externas)/ubicacion"
                    //@ts-ignore
                    options={configStack('Ubicacion')}
                  />
 */}

                      <Stack.Screen
                        name="(paginas-externas)/biblioteca"
                        //@ts-ignore
                        options={configStack("Biblioteca")}
                      />
                    </Stack>
                  </ThemeProvider>
                </TourGuideProvider>
              </BottomSheetModalProvider>
            </AutocompleteDropdownContextProvider>
          </ProyeccionesProvider>
        </CarreraProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
