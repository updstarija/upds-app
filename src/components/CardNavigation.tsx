import React from "react";
import { Linking, Platform, View, Image, Pressable } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Texto } from "./ui";
import { COLORS } from "~/constants";
import { Link } from "expo-router";
import { useAuthContext, useThemeColor } from "@/hooks";
import { Menu } from "@/data";





export const CardNavigation: React.FC<Menu> = ({
  icon,
  text,
  link,
  to,
  auth,
}) => {
  const isDarkMode = useThemeColor() === "dark";
  const { status } = useAuthContext();

  const isIos = Platform.OS === "ios";

  return (
    <Link
      //@ts-ignore
      href={auth && status !== "autenticado" ? "/auth/login" : to}
      onPress={(e) => {
        if (link) {
          e.preventDefault();
          Linking.openURL(to);
          return;
        }
      }}
      asChild
    >
      <Pressable>
        <View
          className={`bg-white dark:bg-secondary-dark h-[150px] w-40 rounded-xl justify-center p-8 items-center ${isIos ? "shadow-md" : ""}`}
          style={{ elevation: 5 }}
        >
          {icon == "servicios"
            ? <>
              <Image
                source={require("~/assets/images/pages/servicios.png")}
                width={50}
                height={50}
                style={{ width: 90, height: 90 }}
              />
            </>
            :
            icon == "institution"
              ? <FontAwesome
                name={icon}
                size={80}
                color={isDarkMode ? "#fff" : COLORS.light.background}
              />
              : <MaterialIcons
                //@ts-ignore
                name={icon}
                size={80}
                color={isDarkMode ? "#fff" : COLORS.light.background}
              />}



          <Texto className="mt-2 text-primario dark:text-white text-center">
            {text}
          </Texto>
        </View>
      </Pressable>
    </Link>
  );
};
