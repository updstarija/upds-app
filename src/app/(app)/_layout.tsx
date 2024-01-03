import React, { useEffect, useState } from "react";
import {
  Redirect,
  Slot,
  router,
  useNavigation,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { useAuth, useAuthContext } from "@/hooks";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";
import { Texto } from "@/ui";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Notifications from "expo-notifications";
import { PermissionsAndroid, Platform } from "react-native";
import { FirebaseNotification } from "~/constants/Firebase";

const AppLayout = () => {
  const { signOut } = useAuth();
  const { status } = useAuthContext();
  const isIos = Platform.OS === "ios";

  const [initialNotification, setInitialNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

  const navigationState = useRootNavigationState();

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

  const [[isLoadingToken, token], setToken] = useStorageState(
    keysStorage.JWT_TOKEN
  );

  useEffect(() => {
    if (!isLoadingToken) {
      if (!token) signOut();
    }
  }, [token, isLoadingToken]);

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
        // setNotificacionState(token);
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
        .subscribeToTopic(FirebaseNotification.NOTIFICATION_TOPIC)
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
    if (!navigationState.key) return;

    if (
      initialNotification &&
      initialNotification?.data &&
      initialNotification?.data.to &&
      initialNotification.data.to !== ""
    ) {
      console.log(initialNotification.data, "INITIAL NOTIFICATION");
      router.push(initialNotification.data.to as any);
    }
  }, [initialNotification, navigationState.key]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(remoteMessage);
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

    messaging()
      .getInitialNotification()
      .then((msg) => {
        if (msg?.data && msg?.data.to) {
          setInitialNotification(msg);
          /*  setTimeout(() => {
             router.push("/(home)/comunicados");
           }, 3000); */
          //@ts-ignore

          /* console.log(msg, "GET INITIAL NOTIFICATION AND REDIRECTO TO " + `/(home)${msg.data.to}`)
          router.push(`/(home)${msg.data.to}`) */
        }
      });
  }, []);

  if (isLoadingToken || status === "pending")
    return (
      <Texto>
        CARGANDO TOKEN2 ISLOADING {isLoadingToken ? "SI" : "NO"} STATUS:{" "}
        {status}
      </Texto>
    );

  return <Slot />;
};

export default AppLayout;
