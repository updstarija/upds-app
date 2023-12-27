import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export const configStack = (title: string) => {
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
    headerTitleStyle: {
      textTransform: "uppercase",
    },
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
