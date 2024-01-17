import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useThemeColor } from "@/hooks";
import { CardCircle } from "@/components";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { Image } from "expo-image";

import { openURL } from "expo-linking";
const data = [
  {
    id: "1",
    title: "UPDS NET",
    description: "Registra tu materia.",
    icon: "language",
    to: "/web/upds-net",
    link: false,
  },
  {
    id: "2",
    title: "MULTIPAGOS",
    description: "Realiza tus pagos de manera rápida y sencilla",
    icon: "dollar",
    to: "https://multipago.com/service/UPDS/first",
    // to: '/multipagos',
    link: true,
  },
];

const Servicios = () => {
  const isDark = useThemeColor() === "dark";
  return (
    <View className="items-center justify-center flex gap-20 flex-1 dark:bg-primario-dark">
      {/* <View style={styles.boxStyle}>
          <Text>Horario de atencion</Text>
        </View> */}

      <Link href="/web/upds-net" asChild>
        <Pressable>
          <View style={styles.touchableStyle}>
            <View
              className="bg-primario dark:bg-secondary-dark"
              style={styles.buttonStyle}
            >
              <MaterialIcons name="language" size={100} color={"#fff"} />
            </View>

            <Texto
              className="text-xl  text-primario dark:text-white text-center"
              weight="Bold"
            >
              REGISTRA TU MATERIA
            </Texto>
          </View>
        </Pressable>
      </Link>

      <View style={styles.touchableStyle}>
        <CustomBottomSheetModal
          contentProps={{
            style: { alignItems: "center", justifyContent: "center" },
          }}
          content={
            <>
              <View
                className="bg-primario dark:bg-secondary-dark"
                style={styles.buttonStyle}
                /*   onPress={async () => {
            await openBrowserAsync("https://multipago.com/service/UPDS/first");
          }} */
                // activeOpacity={1}
              >
                <FontAwesome name="dollar" size={100} color="#FFF" />
              </View>
              <Texto
                className="text-xl text-primario dark:text-white text-center max-w-xs"
                weight="Bold"
              >
                REALIZA TUS PAGOS DE MANERA RÁPIDA Y SENCILLAS
              </Texto>
            </>
          }
        >
          <View className="  ">
            <Texto className="text-center text-xl my-4" weight="Bold">
              Selecciona el método de pago
            </Texto>
            <View className="flex-row justify-evenly  gap-5 mb-5">
              <TouchableOpacity
                onPress={async () => {
                  await openURL("https://wa.me/59177775677");
                }}
                activeOpacity={0.7}
              >
                <Image
                  source={require("~/assets/images/icons/luka.jpg")}
                  style={{ width: 100, height: 100 }}
                  contentFit="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await openBrowserAsync(
                    "https://multipago.com/service/UPDS/first"
                  );
                }}
                activeOpacity={0.7}
              >
                <Image
                  source={require("~/assets/images/icons/multipago.png")}
                  contentFit="contain"
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </CustomBottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: "center",
  },
  buttonStyle: {
    padding: 40,
    borderRadius: 150,
    marginBottom: 10,
    shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    width: 180,
    height: 180,
  },
});

export default Servicios;
