import React from "react";
import { Linking, Platform, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Texto } from "./ui";
import { COLORS } from "~/constants";
import { Link } from "expo-router";
import { useAuthContext, useThemeColor } from "@/hooks";

interface Props {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  link?: boolean;
  to: string;
  auth?: boolean;
}

export const CardNavigation: React.FC<Props> = ({
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
    >
      <View
        className={`bg-white dark:bg-secondary-dark h-[150px] w-40 rounded-xl justify-center p-8 items-center ${isIos ? "shadow-md" : ""}`}
        style={{ elevation: 5 }}
      >
        <MaterialIcons
          name={icon}
          size={80}
          color={isDarkMode ? "#fff" : COLORS.light.background}
        />

        <Texto className="mt-2 text-primario dark:text-white text-center">
          {text}
        </Texto>
      </View>
    </Link>
  );
};
