import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "@/components";
import { COLORS } from "~/constants";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks";
import configScreen from "@/helpers/configScreen";
import { StatusBar } from "expo-status-bar";

const LayoutDrawer = () => {
  return (
    <>
      <StatusBar style="light" />

      <Drawer
        screenOptions={{
          swipeEnabled: false,
          drawerType: "slide",
          drawerActiveBackgroundColor: COLORS.light.background,
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#9e9d9d",
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: "LatoRegular",
            fontSize: 15,
          },
        }}
        drawerContent={(x) => <CustomDrawer {...x} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Inicio",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={configScreen.Drawer("Ajustes")}
        />

        <Drawer.Screen
          name="testing"
          options={configScreen.Drawer("Testing", {
            drawerItemStyle: {
              display: process.env.EXPO_PUBLIC_DEV ? "flex" : "none",
            },
          })}
        />
      </Drawer>
    </>
  );
};

export default LayoutDrawer;
