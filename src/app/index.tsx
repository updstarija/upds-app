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


const Index = () => {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [navegarAHome, setNavegarAHome] = useState(true);

  const { setColorScheme } = useColorScheme()

  const verificacion = async () => {
    if (!await tieneTema()) {
      await AsyncStorage.setItem('tema', 'system')
      setColorScheme("system")
    } else {
      const tema = await AsyncStorage.getItem('tema')
      //@ts-ignore
      setColorScheme(tema)
    }

    if (!(await yaPasoLaBienvenida())) {
      setNavegarAHome(false);
      setIsLoading(false);
      router.replace('/bienvenida');
      return;
    }
    if (!(await tieneToken())) {
      setNavegarAHome(false);
      setIsLoading(false);
      router.replace('/auth/login');
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    verificacion();
  }, []);

  useEffect(() => {
    if (!navigationState.key) return;

    //@ts-ignore
    SplashScreen.hideAsync();
  }, [segments, navigationState.key]);

  useEffect(() => {
    if (isLoading) return;

    if (navegarAHome) {
      router.replace('(drawer)')
      //@ts-ignore
      navigation.navigate('(drawer)')
    };

  }, [navegarAHome, isLoading]);

  useEffect(() => {
    /* const permisos = async () => {
      const result = await messagin().requestPermission()

      console.log(result, 'PERMISOS')
    }

    permisos() */
  })


  useEffect(() => {
    const isIos = Platform.OS == "ios"


    if (!isIos) {
      const identi = async () => {


        if (isIos) {

          await messaging().requestPermission()
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((x) => {
            console.log("PERMISOS NOTIFICAION: ", x)
          })
        }
        const token = await messaging().getToken();
        console.log(token);
      };

      const topicSuscribe = messaging()
        .subscribeToTopic('upds')
        .then(() => { }); //console.log('suscrito a upds')

      //Notificacion cuando esta activo en la app
      const foregroundSuscribe = messaging().onMessage(async msg => {
        //showToast(msg.notification?.title || '', msg.notification?.body || '');

        Alert.alert(msg.notification?.title || "")
      });

      //Notificacion cuando esta inactivo en la app
      const backgroudSuscribe = messaging().setBackgroundMessageHandler(
        async msg => {
          console.log('notificacion backrround', msg.data);
        },
      );


      const onOpenApp = messaging().onNotificationOpenedApp(
        async ({ data }) => {

          console.log(data, 'datos')

          if (data && data?.to && data.to.length > 0) {
            const datos = data.to.split("|")  //[0] ruta [1] id

            console.log(datos, 'datos')
            if (datos[0] === "comunicados") {


              router.push({
                pathname: `/(home)/comunicados/[id]`, params: {
                  id: datos[1]
                }
              })
            } else if (datos[0] == "chat") {
              console.log('redirect')
              router.push({
                pathname: `/(home)/chat`
              })
            }
          }
        },
      );

      identi();

      return () => {
        foregroundSuscribe;
        topicSuscribe;
        backgroudSuscribe;
        onOpenApp;
      };
    }
  }, []);
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
