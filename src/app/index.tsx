import {
  View,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import {
  SplashScreen,
  router,
  useNavigation,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { tieneToken, yaPasoLaBienvenida, tieneTema } from "@/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Notifications from "expo-notifications";
import { useAuth, useAuthContext } from "@/hooks";

const Index = () => {
  const { logout, login } = useAuthContext();

  const [initialNotification, setInitialNotification] = useState<FirebaseMessagingTypes.RemoteMessage | null>(null)

  const isIos = Platform.OS == "ios";

  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [navegarAHome, setNavegarAHome] = useState(true);
  const [notificacionState, setNotificacionState] = useState<any>(null);

  const { refreshLogin } = useAuth();
  const { setColorScheme } = useColorScheme();

  const verificacion = async () => {
    if (!(await yaPasoLaBienvenida())) {
      setNavegarAHome(false);
      setIsLoading(false);
      SplashScreen.hideAsync();
      router.replace("/bienvenida");
      return;
    }
    if (!(await tieneToken())) {
      setNavegarAHome(false);
      setIsLoading(false);
      router.replace("/auth/login");
    } else {
      const data = await refreshLogin();
      if (!data) {
        logout();
      } else login(data);
    }

    SplashScreen.hideAsync();
    setIsLoading(false);
  };

  useEffect(() => {
    verificacion();
  }, []);

  useEffect(() => {
    if (!navigationState.key) return;
  }, [segments, navigationState.key]);

  useEffect(() => {
    if (isLoading) return;

    if (navegarAHome) {
      router.replace("(drawer)");
      //@ts-ignore
      navigation.navigate("(drawer)");
    }
  }, [navegarAHome, isLoading]);

  const requestPermissionIos = async () => {
    const result = await messaging().requestPermission({ announcement: true });

    if (result === messaging.AuthorizationStatus.AUTHORIZED) {
      // ? DEBUG
      //Alert.alert("NOTIFICACIONES ACTIVADAS")
    } else if (result === messaging.AuthorizationStatus.PROVISIONAL) {
      // ? DEBUG
      // Alert.alert("NOTIFICACIONES PROVISIONALES")
    } else if (result === messaging.AuthorizationStatus.DENIED) {
      // ? DEBUG
      // Alert.alert("NOTIFICACIONES DENEGADAS")
    }
  };

  async function requestPermissionsAndroid() {
    return await Notifications.requestPermissionsAsync({
      android: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }

  useEffect(() => {
    const identi = async () => {
      if (isIos) {
        await requestPermissionIos();
      } else {
        await requestPermissionsAndroid();
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        ).then((x) => {
          console.log("PERMISOS NOTIFICATION ANDROID: ", x);
        });
      }

      if (isIos && !__DEV__) {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        setNotificacionState(token);
      }

      if (!isIos) {
        try {
          const token = await messaging().getToken();
          console.log(`TOKEN NOTIFICATIONS ${token}`);
        } catch {
          console.log("FALLO AL OBTENER EL TOKEN");
          // Alert.alert("FALLO AL OBTENER EL TOKEN")
        }
      }

      // Alert.alert("EMPEZANDO A SUSCRIBIR !!!!")

      messaging()
        //! FIX: CAMBIAR upds-test POR upds
        //.subscribeToTopic('upds')
        .subscribeToTopic("upds-test")
        .then((x) => {
          //alert("SUSCRITO A UPDS-TEST NOTIFICATIONS");
          console.log("SUSCRIBE TO UPDS-TEST TOPIC NOTIFICATIONS");
          //Alert.alert("SUSCRITO")
        })
        .catch((e) => {
          // Alert.alert(e.message)
        })
        .finally(() => {
          // Alert.alert("SUSCRITO SIN ERRORES")
        });
    };

    identi();
  }, []);

  useEffect(() => {
    messaging().onMessage(async (msg) => {
      Toast.show({
        type: "success",
        text1: msg.notification?.title,
        text2: msg.notification?.body,
        visibilityTime: 7000,
      });
    });
  }, []);

  useEffect(() => {
    if (!navigationState.key || isLoading) return

    if (initialNotification &&
      initialNotification?.data && initialNotification?.data.to) {
      router.push(initialNotification.data.to);
    }
  }, [initialNotification, navigationState.key, isLoading])

  useEffect(() => {


    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(remoteMessage)
      /* if (data && data?.to && data.to.length > 0) {
        const datos = data.to.split("|"); //[0] ruta [1] id
        if (datos[0] === "comunicados") {
          Alert.alert("redirect to noticias");
          router.push({
            pathname: `/(home)/comunicados/[id]`,
            params: {
              id: datos[1],
            },
          });
        } else if (datos[0] == "chat") {
          Alert.alert("redirect to chat");
          router.push("/chat");
        }
      } */
    });

    messaging().getInitialNotification()
      .then(msg => {

        if (msg?.data && msg?.data.to) {
          setInitialNotification(msg)
          /*  setTimeout(() => {
             router.push("/(home)/comunicados");
           }, 3000); */
          //@ts-ignore

          /* console.log(msg, "GET INITIAL NOTIFICATION AND REDIRECTO TO " + `/(home)${msg.data.to}`)
          router.push(`/(home)${msg.data.to}`) */
        }
      })
  }, []);

  if (isLoading) return null;

  return (
    <View className="flex-1 items-center justify-center">
      {!navigationState.key || isLoading ? (
        <ActivityIndicator size={50} />
      ) : (
        <View />
      )}
    </View>
  );
};

export default Index;
