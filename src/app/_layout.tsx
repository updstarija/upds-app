import { toastConfig } from '@/config';
import { AuthProvider, CarreraProvider } from '@/context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { configStack } from '@/helpers';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('~/assets/fonts/SpaceMono-Regular.ttf'),
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

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CarreraProvider>
            <BottomSheetModalProvider>
              <AutocompleteDropdownContextProvider>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

                  <Stack.Screen name="(paginas)/notificacion"

                    //@ts-ignore
                    options={{ ...configStack('Notificaciones') }} />

                  <Stack.Screen name="(paginas)/perfil"

                    //@ts-ignore
                    options={{ ...configStack('Perfil') }} />

                  <Stack.Screen
                    name="(home)/redes-sociales"
                    //@ts-ignore
                    options={configStack('Redes Sociales')}
                  />

                  <Stack.Screen
                    name="(home)/comunicados/index"
                    //@ts-ignore
                    options={configStack('Comunicados')}
                  />

                  <Stack.Screen
                    name="(home)/comunicados/[id]"
                    //@ts-ignore
                    options={configStack('Comunicado')}
                  />


                  <Stack.Screen
                    name="(home)/upds-responde"
                    //@ts-ignore
                    options={configStack('UPDS Responde')}
                  />

                  <Stack.Screen
                    name="(home)/chat"
                    //@ts-ignore
                    options={configStack('Chat UPDS')}
                  />

                  <Stack.Screen
                    name="(home)/test-vocacional"
                    //@ts-ignore
                    options={configStack('Test Vocacional')}
                  />

                  <Stack.Screen
                    name="(estudiante)/proyecciones"
                    //@ts-ignore
                    options={configStack('Proyecciones')}
                  />

                  <Stack.Screen
                    name="(estudiante)/proyecciones2"
                    //@ts-ignore
                    options={configStack('Proyecciones2')}
                  />

                  <Stack.Screen
                    name="(estudiante)/historico-materias"
                    //@ts-ignore
                    options={configStack('Historico de Materias')}
                  />

                  <Stack.Screen
                    name="(paginas-externas)/moodle"
                    //@ts-ignore
                    options={configStack('Plataforma Moodle')}
                  />
                  <Stack.Screen
                    name="(paginas-externas)/updsnet"
                    //@ts-ignore
                    options={configStack('UpdsNet')}
                  />

                  <Stack.Screen
                    name="(paginas-externas)/biblioteca"
                    //@ts-ignore
                    options={configStack('Biblioteca')}
                  />
                </Stack>
              </AutocompleteDropdownContextProvider>

            </BottomSheetModalProvider>

          </CarreraProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
