import { useEffect, useState } from "react";
import { Slot, router, useRootNavigationState } from "expo-router";
import { useAuth, useAuthContext } from "@/hooks";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";
import { Texto } from "@/ui";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Notifications from "expo-notifications";
import { PermissionsAndroid, Platform, View } from "react-native";
import { FirebaseNotification } from "~/constants/Firebase";
import * as Animatable from "react-native-animatable";
import LoaderSplash from "@/components/LoaderSplash";

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

const AppLayout = () => {
  const { signOut } = useAuth();
  const { status } = useAuthContext();
  const navigationState = useRootNavigationState();

  const isIos = Platform.OS === "ios";

  const [initialNotification, setInitialNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

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

  //CHECK IF THERE IS TOKEN: LOG OUT IF NOT
  useEffect(() => {
    if (!isLoadingToken) {
      if (!token) signOut();

      console.log(token, "MI TOKEN");
    }
  }, [token, isLoadingToken]);

  // REQUEST NOTIFICATION PERMISSIONS
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
        .subscribeToTopic(FirebaseNotification.NOTIFICATION_TOPIC)
        .then((x) => {
          console.log(
            `SUSCRIBE TO ${FirebaseNotification.NOTIFICATION_TOPIC} TOPIC NOTIFICATIONS`
          );
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

  // NOTIFICATION TOAST
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

  // ON OPENED APP NOTIFICATION
  useEffect(() => {
    messaging().onNotificationOpenedApp(async (data) => {
      if (data && data?.data && data?.data.to && data.data.to !== "") {
        router.push(data.data.to as any);
      }
    });
  }, []);

  //INITIAL NOTIFICATION
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((msg) => {
        if (msg?.data && msg?.data.to) {
          setInitialNotification(msg);
        }
      });
  }, []);

  // CHECK IF AN INITIAL NOTIFICATION EXISTS AND REDIRECT IF THERE IS A ROUTING SPECIFIED
  useEffect(() => {
    if (!navigationState?.key) return;
    if (isLoadingToken || status === "pending") return;

    if (
      initialNotification &&
      initialNotification?.data &&
      initialNotification?.data.to &&
      initialNotification.data.to !== ""
    ) {
      console.log("INITIAL NOTIFICATION", initialNotification.data);
      router.push(initialNotification.data.to as any);
    }
  }, [initialNotification, navigationState?.key, isLoadingToken, status]);

  if (isLoadingToken || status === "pending" || !navigationState?.key)
    return <LoaderSplash />;

  return <Slot />;
};

export default AppLayout;
