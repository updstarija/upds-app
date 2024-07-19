import {
	View,
	TouchableOpacity,
	Image,
	Alert,
	BackHandler,
	Platform,
	TextInput,
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
} from "expo-auth-session";
import { updsApi } from "@/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const isDarkMode = useThemeColor() === "dark";
	const rememberCredentialsStore = useLoginRememberCredentialsStore();

	const discovery = useAutoDiscovery(
		"https://login.microsoftonline.com/common/v2.0",
	);
	const redirectUri = makeRedirectUri({
		scheme: undefined,
		path: "auth/login",
	});
	const clientId = "1006a296-8502-457c-ac0e-e4b25ed2f82f";

	// We store the JWT in here
	const [token, setToken] = useState<string | null>(null);

	// Request
	const [request, , promptAsync] = useAuthRequest(
		{
			clientId,
			scopes: ["openid", "profile", "email", "offline_access"],
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

	const navigateScreen = (auth = false) => {
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
			{ cancelable: false },
		);
	};

	const forgetPasswordMessage = () => {
		Alert.alert(
			"Informacion",
			"Para acceder, utiliza tu correo académico como nombre de usuario y tu documento de identidad como contraseña",
			[],
			{ cancelable: true },
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
			handleBackButtonPress,
		);

		return () => backHandler.remove();
	}, [callBack.url]);

	/* return (
		<SafeAreaView>
			<Button
				disabled={!request}
				onPress={() => {
					promptAsync().then((codeResponse) => {
						if (request && codeResponse?.type === "success" && discovery) {
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
			>
				<Texto>OAUTH</Texto>
			</Button>

			<Button
				onPress={async () => {
					updsApi.post(
						"/auth/oauth",
						"eyJ0eXAiOiJKV1QiLCJub25jZSI6IjhFRlE3U1J6WUI4Tkl2VVltNzlkcFdJSUdxcHRmSEh4VXY5ZmFOeklDS1UiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jZjI2MzAzOC1mMTFjLTQ5ZDItOTE4My01NTZhMzRiNzQ3ZTIvIiwiaWF0IjoxNzIxMjUyNzEyLCJuYmYiOjE3MjEyNTI3MTIsImV4cCI6MTcyMTI1ODA2NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhYQUFBQWVOMWlIWENHTlhZT2NVdFVENW9jTUMvdjFOWlAzWWpuQUo2TldRU0JRNXZDaGlDV1RJVEJSNGlFUTIyeS9sNy9SZGNMMElUaHRmYnZqNFU1cnlaaVNCbS9iRGRoZ2lscWdqTlAzbC9GeGZjPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiVVBEUy1BUFAiLCJhcHBpZCI6IjEwMDZhMjk2LTg1MDItNDU3Yy1hYzBlLWU0YjI1ZWQyZjgyZiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiYXJpYXMgdGFyaWZhIiwiZ2l2ZW5fbmFtZSI6ImRhbnRlIGVtYW51ZWwiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODEuMTE1LjE4OS4yMTMiLCJuYW1lIjoiZGFudGUgZW1hbnVlbCBhcmlhcyB0YXJpZmEiLCJvaWQiOiIzYmQ3ZjZiYi05OTc1LTQzNDItYmFlNi05MGI2N2Q3YzljNzMiLCJwbGF0ZiI6IjEiLCJwdWlkIjoiMTAwMzIwMDE2ODk2MzA3MSIsInB3ZF9leHAiOiI2NTc2MCIsInB3ZF91cmwiOiJodHRwczovL3BvcnRhbC5taWNyb3NvZnRvbmxpbmUuY29tL0NoYW5nZVBhc3N3b3JkLmFzcHgiLCJyaCI6IjAuQVRRQU9EQW16eHp4MGttUmcxVnFOTGRINGdNQUFBQUFBQUFBd0FBQUFBQUFBQUEwQVA0LiIsInNjcCI6ImVtYWlsIG9wZW5pZCBwcm9maWxlIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiOUo2MWZReG9rTlRZejBHVUN4NHpFS2V2bVhtVUhHU2x4SGdWaThBM2pHayIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJTQSIsInRpZCI6ImNmMjYzMDM4LWYxMWMtNDlkMi05MTgzLTU1NmEzNGI3NDdlMiIsInVuaXF1ZV9uYW1lIjoidGouZGFudGUuYXJpYXMudEB1cGRzLm5ldC5ibyIsInVwbiI6InRqLmRhbnRlLmFyaWFzLnRAdXBkcy5uZXQuYm8iLCJ1dGkiOiJvZGVIYzlHemVVMldOX1VBSVRNaUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMTggMSIsInhtc19zdCI6eyJzdWIiOiIxbWtjOU5NQV90cTlPOUxORFY0ZmNXZlg3V1ZoNGRsbmkyRUd2SXBvS1E4In0sInhtc190Y2R0IjoxNDEyODYxOTcxfQ.vEyPHUSaqM-7o921GTMrSKbgQoUobQXzNFOrSIss9S0gB6bzeWIw9uAd_WXUDeHQVyiXSQJ2GM4g7Pn35zKJDi5R-p-suIJFEX-lc41FUG2j_XHBac3Eld7ToYzA0m_dTXoAQNVR330oxHqq0TYrYxhKYGFL5d5JvfFWoXeORdmL8zqyZGNcVQQXgyCi2mTRFf_IBY5L8yPpl3SGwZ4PZabB7maBL4aMqmGgG4fHlWuVHbeJ-SlZN0YiUR7LolabxpuXDcJmGa9W3f2AjsT_YBis4LIhLWph5_TkJGM_ge9Q0AFg-kFg80qRqLjffp63oVaU_LwF_uUVWRIGETnWkg",
					);
				}}
			>
				<Texto>TEST API</Texto>
			</Button>

			<Button
				onPress={() => {
					router.push("/auth/oauth/123456");
				}}
			>
				<Texto>OAUTH PAGE</Texto>
			</Button>
			<TextInput multiline value={token ?? ""} />
		</SafeAreaView>
	); */

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
								classNameBtn=" rounded-xl bg-primario  h-14 justify-center items-center"
								onPress={handleSubmit(onSubmit)}
								disabled={signIn.isLoading}
								showLoader
							>
								<Texto className="text-center text-xl text-white items-center ">
									INICIAR SESIÓN
								</Texto>
							</Button>

							<Button
								disabled={!request}
								classNameBtn=" rounded-xl bg-orange-500  h-14 mt-2 items-center justify-center flex-row "
								onPress={() => {
									promptAsync().then((codeResponse) => {
										if (
											request &&
											codeResponse?.type === "success" &&
											discovery
										) {
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
												router.push(`/auth/oauth/${res.accessToken}`);
											});
										}
									});
								}}
							>
								<Texto className="text-xl text-white">OFFICE 365</Texto>
								<MaterialCommunityIcons
									name="microsoft-office"
									color="#FFF"
									size={25}
								/>
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
									Olvidaste tus credencialses?
								</Texto>
							</TouchableOpacity>
						</View>

						{/* <Button
							classNameBtn="bg-red-400"
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
