import { View, ActivityIndicator, Alert, Platform, PermissionsAndroid } from 'react-native';
import { useEffect, useState } from 'react';
import {
  SplashScreen,
  router,
  useNavigation,
  useRootNavigationState,
  useSegments,
} from 'expo-router';
import { tieneToken, yaPasoLaBienvenida, tieneTema } from '@/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind'
import messaging from '@react-native-firebase/messaging';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as Notifications from 'expo-notifications';
import { useAuth, useAuthContext } from '@/hooks';




const Index = () => {
  const registerForPushNotification = async () => {

    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync('default', {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF23F7C"
      })
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }
  const { logout, login } = useAuthContext()

  const isIos = Platform.OS == "ios"

  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [navegarAHome, setNavegarAHome] = useState(true);
  const [notificacionState, setNotificacionState] = useState<any>(null)

  const { refreshLogin } = useAuth()
  const { setColorScheme } = useColorScheme()

  const verificacion = async () => {
    if (!isIos) {
      if (!await tieneTema()) {
        await AsyncStorage.setItem('tema', 'system')
        setColorScheme("system")
      } else {
        const tema = await AsyncStorage.getItem('tema')
        //@ts-ignore
        setColorScheme(tema)
      }
    } else {
      setColorScheme("system")
    }

    if (!(await yaPasoLaBienvenida())) {
      setNavegarAHome(false);
      setIsLoading(false);
      SplashScreen.hideAsync()
      router.replace('/bienvenida');
      return;
    }
    if (!(await tieneToken())) {
      setNavegarAHome(false);
      setIsLoading(false);
      router.replace('/auth/login');
    } else {
      const data = await refreshLogin()
      console.log(data, "DATA")
      if (!data) {
        logout()
      } else login(data)
    }

    SplashScreen.hideAsync()

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
      router.replace('(drawer)')
      //@ts-ignore
      navigation.navigate('(drawer)')
    };

  }, [navegarAHome, isLoading]);


  const requestPermissionIos = async () => {
    const result = await messaging().requestPermission({ announcement: true })

    if (result === messaging.AuthorizationStatus.AUTHORIZED) {
      Alert.alert("NOTIFICACIONES ACTIVADAS")
    } else if (result === messaging.AuthorizationStatus.PROVISIONAL) {
      Alert.alert("NOTIFICACIONES PROVISIONALES")
    } else if (result === messaging.AuthorizationStatus.DENIED) {
      Alert.alert("NOTIFICACIONES DENEGADAS")
    }
  }

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
        await requestPermissionIos()
      } else {
        await requestPermissionsAndroid()
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((x) => {
          console.log("PERMISOS NOTIFICAION ANDROID: ", x)
        })
      }

      if (isIos && !__DEV__) {
        await messaging().registerDeviceForRemoteMessages()
        const token = await messaging().getToken();
        setNotificacionState(token)
      }

      if (!isIos) {
        console.log("OBTENIENDO TOKEN!!!!")


        try {
          const token = await messaging().getToken();
          console.log(token)
        } catch {
          console.log("FALLO AL OBTENER EL TOKEN")
          // Alert.alert("FALLO AL OBTENER EL TOKEN")
        }
      }

      // Alert.alert("EMPEZANDO A SUSCRIBIR !!!!")

      messaging()
        .subscribeToTopic('upds')
        .then((x) => {
          console.log(x)
          //Alert.alert("SUSCRITO")
        })
        .catch((e) => {
          // Alert.alert(e.message)
        }).finally(() => {

          // Alert.alert("SUSCRITO SIN ERRORES")
        })

    };

    identi()
  }, [])

  useEffect(() => {
    messaging().onMessage(async msg => {
      Toast.show({
        type: "success",
        text1: msg.notification?.title,
        text2: msg.notification?.body,
        visibilityTime: 7000,
      })
    });
  }, [])

  useEffect(() => {
    messaging().onNotificationOpenedApp(
      async ({ data }) => {
        if (data && data?.to && data.to.length > 0) {
          const datos = data.to.split("|")  //[0] ruta [1] id
          if (datos[0] === "comunicados") {
            Alert.alert("redirect to noticias")
            router.push({
              pathname: `/(home)/comunicados/[id]`, params: {
                id: datos[1]
              }
            })
          } else if (datos[0] == "chat") {
            Alert.alert('redirect to chat')
            router.push("/chat")
          }
        }
      },
    );

    messaging().getInitialNotification()
      .then(msg => {
        console.log(msg, "GET INITIAL NOTIFICATION")
      })
  }, []);

  if (isLoading) return null

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
