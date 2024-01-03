import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { PermissionStatus, requestPermissionsAsync } from "expo-notifications";
import Checkbox from "expo-checkbox";
import { COLORS } from "~/constants";
import { Texto } from "@/ui";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks";
import messagin from "@react-native-firebase/messaging";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { FirebaseNotification } from "~/constants/Firebase";
import { openSettings } from "expo-linking";

const Notifications = () => {
  const isDark = useThemeColor() === "dark";

  const [activeNotifications, setActiveNotifications] = useState(false);

  const verificarNotificaciones = async () => {
    const { status } = await requestPermissionsAsync();
    if (status === "granted") setActiveNotifications(true);
    else setActiveNotifications(false);
  };

  const toggleNotifications = async (x: boolean) => {
    if (x) {
      const { status } = await requestPermissionsAsync();
      if (status === "denied") {
        Alert.alert(
          "Alerta",
          "Activa las notificacions desde los ajustes de tu dispositivo",
          [
            {
              text: "Ok",
              onPress: async () => {
                await openSettings();
                await verificarNotificaciones();
              },
            },
          ]
        );
      }
      await messagin().requestPermission();
      await messagin().subscribeToTopic(
        FirebaseNotification.NOTIFICATION_TOPIC
      );
      setActiveNotifications(x);
      return;
    }

    Alert.alert(
      "Alerta",
      "Desactiva las notificacions desde los ajustes de tu dispositivo",
      [
        {
          text: "Ok",
          onPress: async () => {
            await openSettings();
            await verificarNotificaciones();
          },
        },
      ]
    );
  };
  useEffect(() => {
    verificarNotificaciones();
  }, []);
  return (
    <ScrollView className="bg-white dark:bg-primario-dark flex-1 ">
      <View className="m-2">
        <Texto
          className=" dark:text-white m-4 uppercase text-center"
          weight="Bold"
        >
          ¡Activa las notificaciones para aprovechar al máximo nuestra
          aplicación!
        </Texto>
        <Texto className=" dark:text-white  mb-3">
          Al habilitar las notificaciones, te mantendremos al día con
          información importante y útil, como:
        </Texto>
        <Texto className=" dark:text-white ">
          <FontAwesome
            name="check"
            size={20}
            color={isDark ? "#FFF" : COLORS.light.background}
          />{" "}
          Comunicados sobre eventos exclusivos.
        </Texto>
        <Texto className=" dark:text-white ">
          <FontAwesome
            name="check"
            size={20}
            color={isDark ? "#FFF" : COLORS.light.background}
          />{" "}
          Fechas límites de pago y recordatorios.
        </Texto>
        <Texto className=" dark:text-white ">
          <FontAwesome
            name="check"
            size={20}
            color={isDark ? "#FFF" : COLORS.light.background}
          />{" "}
          Actualizaciones críticas y novedades.
        </Texto>
      </View>

      <View className="mt-4 mx-2 py-1 flex-row items-center justify-between border border-primario p-4 rounded-xl">
        <Texto className="text-black dark:text-white">
          Recibir Notificaciones
        </Texto>

        <Checkbox
          value={activeNotifications}
          className="mr-1"
          onValueChange={(x) => {
            toggleNotifications(x);
            //setActiveNotifications(x);
          }}
          color={COLORS.light.background}
        />
      </View>
    </ScrollView>
  );
};

export default Notifications;
