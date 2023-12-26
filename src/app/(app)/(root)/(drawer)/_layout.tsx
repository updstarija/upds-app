import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "@/components";
import { COLORS } from "~/constants";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks";
import configScreen from "@/helpers/configScreen";

const LayoutDrawer = () => {
  const isDark = useThemeColor() === "dark";
  return (
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

      <Drawer.Screen name="settings" options={configScreen.Drawer("Ajustes")} />

      <Drawer.Screen
        name="testing"
        options={configScreen.Drawer("Testing")}
        //@ts-ignore
        /*  options={{
         ...configStack("Testing"),
         drawerItemStyle: {
           //display: "none"
         },
         drawerIcon: ({ color }) => (
           <Ionicons name='shield' size={20} color={color} />
         )
       }} */
      />
    </Drawer>
  );
};

export default LayoutDrawer;
