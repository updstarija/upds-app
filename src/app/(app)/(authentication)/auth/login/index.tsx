import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Platform,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import { useAuth, useThemeColor } from "@/hooks";
import { IFormLogin } from "@/types";
import { COLORS } from "~/constants";
import { Button, TextField } from "@/components";
import { Texto } from "@/ui";
import { useEffect, useState } from "react";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import * as WebBrowser from "expo-web-browser";
import { openURL } from "expo-linking";
import { useLoginRememberCredentialsStore } from "@/store/useLoginRememberCredentials.store";
import { useCallbackUrlStore } from "@/store/useCallbackUrl.store";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const isDarkMode = useThemeColor() === "dark";
  const rememberCredentialsStore = useLoginRememberCredentialsStore();


  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/common/v2.0',
  );
  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: 'auth/login',
  });
  const clientId = '1006a296-8502-457c-ac0e-e4b25ed2f82f';

  // We store the JWT in here
  const [token, setToken] = useState<string | null>(null);

  // Request
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
    },
    discovery,
  );


  const defaultValues: Partial<IFormLogin> = {
    contraseña: rememberCredentialsStore.password,
    usuario: rememberCredentialsStore.email,
    remember: rememberCredentialsStore.remember,
  };

  const { signIn } = useAuth();
  const callBack = useCallbackUrlStore();

  const { control, handleSubmit } = useForm<IFormLogin>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (data: IFormLogin) => {
    const { usuario: email, contraseña: password, remember } = data;

    if (data.remember) {
      rememberCredentialsStore.setCredentials({
        email,
        password,
        remember,
      });
    } else {
      rememberCredentialsStore.clearCredentials();
    }

    const user = await signIn.mutateAsync(data);

    if (user) {
      navigateScreen(true);
    }
  };

  const navigateScreen = (auth: boolean = false) => {
    if (auth && callBack.url?.auth) {
      router.replace(callBack.url?.auth as any);
      callBack.clearUrl();
      return;
    }

    if (!auth && callBack.url?.prev) {
      router.replace(callBack.url?.prev as any);
      callBack.clearUrl();
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

  const handleBackButtonPress = () => {
    if (callBack.url?.prev) {
      router.push((callBack.url?.prev as any) || "/");
      callBack.clearUrl();
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
  }, [callBack.url]);

/*    return (
    <SafeAreaView>
      <Button
        disabled={!request}
        
        onPress={() => {
          promptAsync().then((codeResponse) => {
            if (request && codeResponse?.type === 'success' && discovery) {
              exchangeCodeAsync(
                {
                  clientId,
                  code: codeResponse.params.code,
                  extraParams: request.codeVerifier
                    ? { code_verifier: request.codeVerifier }
                    : undefined,
                  redirectUri,
                },
                discovery,
              ).then((res) => {
                setToken(res.accessToken);
              });
            }
          });
        }}
      ><Texto>OAUTH</Texto></Button>
      
      <TextInput
           value={token ?? ""}
            />
         
    </SafeAreaView>
  );
 */
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
            <View className="px-8 py-2 bg-white dark:bg-secondary-dark">
              {/*  <Button
                classNameBtn=" rounded-xl bg-orange-500 p-3 h-14 mb-2"
                onPress={async () => {
                  const result = await WebBrowser.openAuthSessionAsync(
                    "https://login-qa.upds.edu.bo/SAADS-WEB?returnUrlLogin=updstarija://auth/token",
                    "updstarija://auth/token"
                  );

                  if (result.type == "success" && Platform.OS == "ios") {
                    openURL(result.url);
                  }

                  console.log(result);
                }}
                //disabled={signIn.isLoading}
                showLoader
              >
                <Texto className="text-center text-xl text-white ">
                  OFFICE 365
                </Texto>
              </Button> */}
              <Button
                classNameBtn=" rounded-xl bg-primario p-3 h-14"
                onPress={handleSubmit(onSubmit)}
                disabled={signIn.isLoading}
                showLoader
              >
                <Texto className="text-center text-xl text-white ">
                  INICIAR SESIÓN
                </Texto>
              </Button>
            </View>
          }
          style={{ flex: 1 }}
          containerStyle={{
            flex: 1,
            backgroundColor: isDarkMode ? COLORS.dark.secondary : "#fff",
          }}
          //contentContainerStyle={{ flex: 1 }}
        >
          <View className="bg-primario dark:bg-primario-dark pb-16">
            <View className="flex-end m-3 flex-row items-center justify-between">
              <View />

              <TouchableOpacity
                onPress={skipAuthConfirmation}
                className="p-4 pr-0"
              >
                <Texto className="text-white opacity-80">
                  Omitir por ahora
                </Texto>
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
          </View>

          <View
            className="bg-white dark:bg-secondary-dark -mt-10 flex-1 px-8 pt-8 max-w-2xl mx-auto w-full"
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
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      value={field.value}
                      className="mr-1"
                      onValueChange={(e) => field.onChange(e)}
                      color={COLORS.light.background}
                      //disabled={isLoadingRememberCredentials}
                    />
                  )}
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
