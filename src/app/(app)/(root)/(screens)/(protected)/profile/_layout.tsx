import { StatusBar } from "expo-status-bar";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { MaterialTopTabs } from "@/navigator/top-tabs";
import { COLORS } from "~/constants";
import { Layout as LayoutHome } from "@/layout/Layout";
import { Animated, useColorScheme } from "react-native";
import { useThemeColor } from "@/hooks";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function Layout() {
  const isDarkMode = useThemeColor() === "dark";
  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={{
        lazy: true,
        //tabBarItemStyle: { padding: 6 },

        tabBarStyle: {
          backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF",
        },
        tabBarLabelStyle: { margin: 0, padding: 0, fontSize: 12 },
        tabBarItemStyle: { padding: 15 },
        tabBarActiveTintColor: isDarkMode ? "#FFF" : COLORS.light.background,

        // API Reference: https://reactnavigation.org/docs/material-top-tab-navigator#options
      }}
      screenListeners={{
        focus: () => {
          Animated.timing(av, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "MI PERFIL",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" color={color} size={20} />
          ),
        }}
      />
      {/* 
    <MaterialTopTabs.Screen
        name="two"
        options={{
            title: 'Estudiante',
            tabBarIcon: ({ color }) => <MaterialIcons name="school" color={color} size={20} />,
        }}
    />

    <MaterialTopTabs.Screen
        name="perfil"
        options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <FontAwesome name="user-circle" color={color} size={20} />,

        }}
    />
*/}
      <MaterialTopTabs.Screen
        name="stats"
        options={{
          title: "STATS",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              color={color}
              size={20}
            />
          ),
        }}
      />

      <MaterialTopTabs.Screen
        name="facturacion"
        options={{
          title: "Facturacion",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="file-invoice-dollar" color={color} size={20} />
          ),
        }}
      />

      {/**
<MaterialTopTabs.Screen
name="perfil"
options={{
  title: 'Perfil',
  tabBarIcon: ({color}) => (
    <MaterialIcons name="verified-user" color={color} size={20} />
  ),
}}
/> 


*/}
    </MaterialTopTabs>
  );
}
