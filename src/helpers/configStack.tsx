import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS } from "../../constants";

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
  };
};
