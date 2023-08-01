import { useThemeColor } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseToast, BaseToastProps } from "react-native-toast-message";
import { COLORS } from "~/constants";

const toastColors = {
  success: "#07bc0c",
  error: "#e74c3c",
  warning: "#f1c40f",
  info: "3498db",
};

interface Props extends BaseToastProps {
  type: "success" | "error" | "warning" | "info";
}

export const Toast: React.FC<Props> = ({ type, ...props }) => {
  const isDarkMode = useThemeColor() === "dark";

  return (
    <SafeAreaView>
      <BaseToast
        {...props}
        text2NumberOfLines={4}
        text1Style={{
          color: !isDarkMode ? COLORS.dark.background : "white",
          fontSize: 15,
        }}
        text2Style={{
          color: !isDarkMode ? COLORS.dark.background : "white",
          fontSize: 12,
          opacity: 0.9,
        }}
        style={{
          borderLeftColor: toastColors[type],
          backgroundColor: isDarkMode ? COLORS.dark.background : "#fff",
          borderTopColor: COLORS.light.background,
          borderBottomColor: COLORS.light.background,
          borderRightColor: COLORS.light.background,
          borderWidth: 0.4,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </SafeAreaView>
  );
};
