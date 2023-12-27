import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import configScreen from "@/helpers/configScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TourGuideProvider } from "rn-tourguide";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import { useAuthContext } from "@/hooks";
import { CustomBottomSheetModal, Texto } from "@/ui";
import FormAuth from "@/views/FormAuth";
import { Spacer } from "@/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const RootLayout = () => {
  const { welcomeScreen, modalAuthRef } = useAuthContext();
  if (welcomeScreen.isLoading) {
    return <Texto>VERIFINGWELCOME SCREEN</Texto>;
  }

  if (!welcomeScreen.value) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <>
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

          <CustomBottomSheetModal
            content={<></>}
            ref={modalAuthRef}
            detached
            bottomInset={50}
            keyboardBehavior="fillParent"
            keyboardBlurBehavior="restore"
            style={{
              marginHorizontal: 24,
            }}
          >
            <View className="px-3 pt-2 pb-5">
              <Texto weight="Bold" className="text-2xl text-center">
                Inicia sesion para continuar
              </Texto>
              <Spacer />
              <Texto className="text-md">
                Para ingresar a esta seccion es necesario que estes autenticado,
                si eres estudiante inicia sesion{" "}
                <Link href={"/auth/login/"} asChild>
                  <Pressable>
                    <Texto className="text-primario" weight="Bold">
                      aqui
                    </Texto>
                  </Pressable>
                </Link>
              </Texto>
            </View>
          </CustomBottomSheetModal>
        </BottomSheetModalProvider>
      </ProyeccionesProvider>
    </>
  );
};

export default RootLayout;
