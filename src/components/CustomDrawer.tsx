import { useState } from "react";
import { Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useAuthContext, useThemeColor } from "@/hooks";
import { ThemeConfig } from "@/views/ThemeConfig";
import { Texto } from "@/ui";
import { menuFacultades } from "@/data";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const isDarkMode = useThemeColor() === "dark";
  const { status, user, logout } = useAuthContext();

  const [menuActual, setMenuActual] = useState(menuFacultades);
  const [historyMenu, setHistoryMenu] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const cerrarSesion = async () => {
    logout();
    router.replace("/auth/login");
  };

  const LabelSubItem = (
    title: string,
    link: string | undefined,
    color: string
  ) => {
    return (
      <View
        style={{ marginLeft: -25 }}
        className=" flex-1 justify-between items-center flex-row"
      >
        <Text
          style={{
            color,
            fontFamily: "LatoRegular",
            fontSize: 15,
          }}
        >
          {title}
        </Text>

        {!link ? (
          <Ionicons name="chevron-forward" size={15} color={color} />
        ) : null}
      </View>
    );
  };

  const handleMenuClick = (menu: any) => {
    if (menu?.items) {
      setTitle(menu.label);
      setMenuActual(menu.items);
      setHistoryMenu([...historyMenu, menu]);
      if (historyMenu == null) {
      } else {
        //setHistoryMenu([...historyMenu, menu])
      }
    }
  };

  const handleBackMenuClick = () => {
    if (historyMenu?.length == 1) {
      setMenuActual(menuFacultades);
      setHistoryMenu([]);
      return;
    }

    const newMenu = historyMenu[historyMenu.length - 2];
    setTitle(newMenu.label);
    setMenuActual(newMenu.items);
    const newHistori = historyMenu.slice(0, historyMenu.length - 1);
    setHistoryMenu(newHistori);
  };

  return (
    <View className="flex-1 bg-white dark:bg-primario-dark border-r border-[.6px] border-secondary-dark">
      <DrawerContentScrollView {...props} className="">
        {historyMenu.length != 0 && (
          <View className="flex-row justify-between p-4">
            <TouchableOpacity onPress={handleBackMenuClick}>
              <AntDesign
                name="left"
                size={20}
                color={isDarkMode ? "#FFF" : "#000"}
              />
            </TouchableOpacity>

            <Texto>{title}</Texto>

            <View />
          </View>
        )}

        {menuActual.map((x) => (
          <DrawerItem
            //style={{ justifyContent: "space-between", display: "flex", flexDirection: "row", alignItems: "center", flex: 1 }}
            key={x.label}
            activeBackgroundColor={"#ebeffa"}
            activeTintColor="#9e9d9d"
            inactiveTintColor={
              historyMenu.length == 0 ? "#9e9d9d" : isDarkMode ? "#FFF" : "#000"
            }
            onPress={() => {
              if (x?.link) {
                //@ts-ignore
                router.push(x.link);
              } else handleMenuClick(x);
            }}
            icon={({ color, focused, size }) => {
              {
                /* <Ionicons name='home-sharp' color={color} size={20} /> */
              }
              return (
                <MaterialCommunityIcons name={x.icon} color={color} size={20} />
              );
            }}
            label={({ color }) => LabelSubItem(x.label, x?.link, color)}
          />
        ))}

        {historyMenu.length == 0 && <DrawerItemList {...props} />}
      </DrawerContentScrollView>

      <View className="px-4 mb-4">
        <ThemeConfig />
      </View>
      <View className="border-t p-4 border-[#ccc]">
        {status === "authenticated" ? (
          <TouchableOpacity
            onPress={cerrarSesion}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="exit-outline"
                size={22}
                color={isDarkMode ? "#FFF" : "#000"}
              />
              <Text className="text-black dark:text-white ml-2">
                Cerrar Sesion
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Link href={"/auth/login"} asChild>
            <TouchableOpacity style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="log-in"
                  size={22}
                  color={isDarkMode ? "#FFF" : "#000"}
                />
                <Text className="text-black dark:text-white ml-2 text-center">
                  Iniciar Sesion
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
};

export default CustomDrawer;
