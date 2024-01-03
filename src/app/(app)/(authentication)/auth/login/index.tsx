import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import { useAuth, useAuthContext, useThemeColor } from "@/hooks";
import { IFormLogin } from "@/types";
import { COLORS } from "~/constants";
import { Button, TextField } from "@/components";
import { Texto } from "@/ui";
import { useEffect } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

const Login = () => {
  const isDarkMode = useThemeColor() === "dark";

  const { signIn } = useAuth();
  const { login: loginContext, callBack } = useAuthContext();

  const { control, handleSubmit, setValue } = useForm<IFormLogin>({
    mode: "onChange",
  });

  const [
    [isLoadingRememberCredentials, rememberCredentials],
    setRememberCredentials,
  ] = useStorageState<boolean>(keysStorage.CREDENTIALS_AUTH_REMEMBER);

  const [[isLoadingEmailStorage, emailStorage], setEmailStorage] =
    useStorageState<string>(keysStorage.EMAIL_AUTH_REMEMBER);

  const [[isLoadingPasswordStorage, passwordStorage], setPasswordStorage] =
    useStorageState<string>(keysStorage.PASSWORD_AUTH_REMEMBER);

  const onSubmit = async (data: IFormLogin) => {
    if (rememberCredentials) {
      setEmailStorage(data.usuario);
      setPasswordStorage(data.contraseña);
    } else {
      setEmailStorage(null);
      setPasswordStorage(null);
    }

    const user = await signIn.mutateAsync(data);
    console.log(user, "DESDE FRONT");
    if (user) {
      navigateScreen();
    }
  };

  const navigateScreen = (auth: boolean = false) => {
    if (auth && callBack.value?.auth) {
      router.replace(callBack.value?.auth as any);
      return;
    }

    if (!auth && callBack.value?.prev) {
      router.replace(callBack.value?.prev as any);
      return;
    }

    router.replace("/");
  };

  const skip = async () => {
    navigateScreen();
  };

  const skipAuthConfirmation = () => {
    Alert.alert(
      "Aviso",
      "Al omitir la autenticación no tendras acceso a varias funcionalidades. Si eres estudiante de la UPDS inicia sesion por favor.",
      [
        { text: "Ok", onPress: skip, style: "destructive" },
        { text: "Cancelar" },
      ],
      { cancelable: false }
    );
  };

  const forgetPasswordMessage = () => {
    Alert.alert(
      "Informacion",
      "Para acceder, utiliza tu correo académico como nombre de usuario y tu documento de identidad como contraseña",
      [],
      { cancelable: true }
    );
  };

  /* useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem("email-user");
      const contrasena = await AsyncStorage.getItem("contrasena-user");
      if (email) {
        setValue("usuario", email);
        setRecordar(true);
      }

      if (contrasena) {
        setValue("contraseña", contrasena);
        setRecordar(true);
      }
    })();
  }, []); */

  useEffect(() => {
    if (emailStorage) {
      setValue("usuario", emailStorage);
    }

    if (passwordStorage) {
      setValue("contraseña", passwordStorage);
    }
  }, [emailStorage, passwordStorage]);

  const handleBackButtonPress = () => {
    if (callBack.value?.prev) {
      router.push((callBack.value?.prev as any) || "/");
      callBack.clearCallback();
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => backHandler.remove();
  }, [callBack.value]);

  return (
    <>
      <StatusBar
        backgroundColor={
          isDarkMode ? COLORS.dark.background : COLORS.light.background
        }
        style="light"
      />

      <SafeAreaView className="flex-1 bg-primario dark:bg-primario-dark">
        <KeyboardAvoidingScrollView
          stickyFooter={
            <View className="px-8 py-2 bg-white">
              <Button
                classNameBtn=" rounded-xl bg-primario p-3"
                onPress={handleSubmit(onSubmit)}
                disabled={signIn.isLoading}
                showLoader
              >
                <Texto className="text-center text-xl text-white ">
                  INICIAR SESION
                </Texto>
              </Button>
            </View>
          }
          style={{ flex: 1 }}
          containerStyle={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View className="flex-end m-3 flex-row items-center justify-between">
            <View />

            <TouchableOpacity
              onPress={skipAuthConfirmation}
              className="p-4 pr-0"
            >
              <Texto className="text-white opacity-80">Omitir por ahora</Texto>
            </TouchableOpacity>
          </View>

          <View className="flex-column items-center">
            <Image
              source={require(`~/assets/images/app/logo-dark.png`)}
              style={{ width: 80, height: 80 }}
            />

            <Texto className="text-xl text-white lg:text-3xl" weight="Bold">
              Inicia sesion con tu cuenta
            </Texto>
          </View>

          <View
            className="bg-white dark:bg-secondary-dark mt-5 flex-1 px-8 pt-8 max-w-2xl mx-auto w-full"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <TextField
              control={control}
              label="Correo académico"
              name="usuario"
              placeholder="email@upds.net.bo"
              placeholderTextColor={"#ccc"}
              rules={{ required: "El usuario es requerido" }}
              autoComplete="email"
            />
            <TextField
              control={control}
              label="Documento de Identidad"
              name="contraseña"
              placeholder="********"
              placeholderTextColor={"#ccc"}
              rules={{ required: "La contraseña es requerida" }}
              secureTextEntry
            />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Checkbox
                  value={rememberCredentials || false}
                  className="mr-1"
                  onValueChange={() =>
                    setRememberCredentials(!rememberCredentials)
                  }
                  color={COLORS.light.background}
                  disabled={isLoadingRememberCredentials}
                />

                <Texto className="text-black dark:text-white">Recordarme</Texto>
              </View>

              <TouchableOpacity
                className="p-2"
                onPress={() => forgetPasswordMessage()}
              >
                <Texto className="text-black dark:text-white">
                  Olvidaste tus credenciales?
                </Texto>
              </TouchableOpacity>
            </View>

            {/* <Button
              onPress={() => {
                openURL("app-settings://notification/com.upds.tarija.com");
              }}
            >
              <Texto>HOILA</Texto>
            </Button> */}
          </View>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
