import { router } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS } from "../../constants";

const Stack = (
  title: string,
  options?: NativeStackNavigationOptions
): NativeStackNavigationOptions | undefined => {
  const isDarkMode = useThemeColor() === "dark";

  return {
    title,
    headerShown: true,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: isDarkMode
        ? COLORS.dark.secondary
        : COLORS.light.background,
    },
    headerTintColor: "#fff",
    /*   headerTitleStyle: {
      textTransform: "uppercase",
    }, */
    headerLeft: () => {
      return (
        <AntDesign
          name="left"
          onPress={() => router.back()}
          size={25}
          color={"#FFF"}
          style={{ padding: 10, marginRight: 15 }}
        />
      );
    },
  };
};

const Drawer = (
  title: string,
  options?: DrawerNavigationOptions
): DrawerNavigationOptions | undefined => {
  const isDark = useThemeColor() === "dark";

  return {
    title,
    headerStyle: {
      backgroundColor: isDark ? COLORS.dark.secondary : COLORS.light.background,
    },
    headerTintColor: "#fff",
    /*   headerTitleStyle: {
      textTransform: "uppercase",
    }, */
    drawerIcon: ({ color }) => (
      <Ionicons name="settings-outline" size={20} color={color} />
    ),
    ...options,
  };
};

export default {
  Drawer,
  Stack,
};
