import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialTopTabs } from "@/navigator/top-tabs";
import { COLORS } from "~/constants";
import { Layout as LayoutHome } from "@/layout/Layout";
import { Animated, useColorScheme } from "react-native";
import { useThemeColor } from "@/hooks";
import ModalPriorityNotices from "@/views/ModalPriorityNotices";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function Layout() {
  const isDarkMode = useThemeColor() === "dark";
  return (
    <>
      <StatusBar
        backgroundColor={
          isDarkMode ? COLORS.dark.secondary : COLORS.light.background
        }
        style="light"
      />

      <ModalPriorityNotices />

      <LayoutHome>
        <MaterialTopTabs
          screenListeners={{
            focus: () => {
              Animated.timing(av, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }).start();
            },
          }}
          tabBarPosition="bottom"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF",
            },
            tabBarLabelStyle: { margin: 0, padding: 0, fontSize: 12 },

            tabBarActiveTintColor: isDarkMode
              ? "#FFF"
              : COLORS.light.background,
          }}
        >
          <MaterialTopTabs.Screen
            name="index"
            options={{
              title: "Inicio",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" color={color} size={20} />
              ),
            }}
          />
          <MaterialTopTabs.Screen
            name="student"
            options={{
              title: "Estudiante",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="school" color={color} size={20} />
              ),
            }}
          />
        </MaterialTopTabs>
      </LayoutHome>
    </>
  );
}
