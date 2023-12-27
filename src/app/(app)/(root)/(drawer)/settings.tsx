import { View, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Link } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Menu, menuAjustes } from "@/data";
import { useAuthContext, useThemeColor } from "@/hooks";
import { Texto } from "@/ui";

const Settings = () => {
  return (
    <View className="bg-white dark:bg-primario-dark flex-1 ">
      <View className="flex-1 max-w-2xl mx-auto w-full">
        <FlashList
          contentContainerStyle={{ padding: 10 }}
          data={menuAjustes}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="mb-2" />}
          renderItem={({ item }) => <EnlaceMenu {...item} />}
        />
      </View>

      {/* 
            <Button title='BORRAR LOCALSTORAGE ' onPress={async () => {
                await AsyncStorage.clear()
                router.replace("bienvenida")
            }} /> */}
    </View>
  );
};

const EnlaceMenu: React.FC<Menu> = ({ icon, text, link, to, auth }) => {
  const isDark = useThemeColor() == "dark";
  const isIos = Platform.OS == "ios";

  const { status } = useAuthContext();
  return (
    <>
      {/* @ts-ignore */}
      <Link
        //@ts-ignore
        href={auth && status !== "authenticated" ? "/auth/login" : to}
        asChild
      >
        <TouchableOpacity
          className={`flex-row bg-white dark:bg-secondary-dark  p-5 items-center rounded-lg border-[#ccc] border dark:border-[0px] ${
            isIos ? "shadow-lg" : ""
          }`}
          style={{ elevation: 5 }}
        >
          {icon == "notifications" ||
          icon == "grid-view" ||
          icon == "article" ? (
            <MaterialIcons
              name={icon}
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
          ) : //@ts-ignore
          icon == "shield-check" ? (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
          ) : (
            <FontAwesome
              //@ts-ignore
              name={icon}
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
          )}

          <Texto className="ml-3 text-black dark:text-white" weight="Bold">
            {text}
          </Texto>
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default Settings;