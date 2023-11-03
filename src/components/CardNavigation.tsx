import React from "react";
import { Linking, Platform, View, Image, Pressable } from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Texto } from "../ui";
import { COLORS } from "~/constants";
import { Link } from "expo-router";
import { useAuthContext, useThemeColor } from "@/hooks";
import { Menu } from "@/data";
import { M } from "ts-toolbelt";





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


  const getIcon = () => {
    if (Object.keys(AntDesign.glyphMap).includes(icon)) {
      return <AntDesign
        //@ts-ignore
        name={icon}
        size={80}
        color={isDarkMode ? "#fff" : COLORS.light.background}
      />
    } else if (Object.keys(MaterialIcons.glyphMap).includes(icon)) {
      return <MaterialIcons
        //@ts-ignore
        name={icon}
        size={80}
        color={isDarkMode ? "#fff" : COLORS.light.background}
      />
    }
    else if (Object.keys(FontAwesome.glyphMap).includes(icon)) {
      return <FontAwesome
        //@ts-ignore
        name={icon}
        size={80}
        color={isDarkMode ? "#fff" : COLORS.light.background}
      />
    }

  }

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
          className={`bg-white dark:bg-secondary-dark h-40 w-40 lg:h-52  lg:w-52 rounded-xl justify-center p-8 items-center ${isIos ? "shadow-md" : ""}`}
          style={{ elevation: 5 }}
        >
          {getIcon()}

          <Texto className="mt-2 text-primario dark:text-white text-center lg:text-lg">
            {text}
          </Texto>
        </View>
      </Pressable>
    </Link>
  );
};
