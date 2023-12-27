import { Linking, Platform, View, Pressable } from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { COLORS } from "~/constants";
import { useAuthContext, useThemeColor } from "@/hooks";
import { Texto } from "../ui";
import { Menu } from "@/data";
import ProtectedAuthLink from "./ProtectedAuthLink";

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
      return (
        <AntDesign
          //@ts-ignore
          name={icon}
          size={80}
          color={isDarkMode ? "#fff" : COLORS.light.background}
        />
      );
    } else if (Object.keys(MaterialIcons.glyphMap).includes(icon)) {
      return (
        <MaterialIcons
          //@ts-ignore
          name={icon}
          size={80}
          color={isDarkMode ? "#fff" : COLORS.light.background}
        />
      );
    } else if (Object.keys(FontAwesome.glyphMap).includes(icon)) {
      return (
        <FontAwesome
          //@ts-ignore
          name={icon}
          size={80}
          color={isDarkMode ? "#fff" : COLORS.light.background}
        />
      );
    }
  };

  return (
    <ProtectedAuthLink auth={auth || false} isLink={link} to={to}>
      <View
        className={`bg-white dark:bg-secondary-dark h-40 w-40 lg:h-52  lg:w-52 rounded-xl justify-center p-8 items-center`}
        style={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 7.68,
          elevation: 10,
        }}
      >
        {getIcon()}

        <Texto className="mt-2 text-primario dark:text-white text-center lg:text-lg">
          {text}
        </Texto>
      </View>
    </ProtectedAuthLink>
  );
};
