import { useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useColorScheme as useColorWind } from "nativewind";
import { useThemeColor, useThemeContext } from "@/hooks";
import { COLORS } from "~/constants";
import { Texto } from "../ui";
import { Theme } from "@/context/ThemeContext";

const typeThemes: { [key: number]: string } = {
  0: "light",
  1: "dark",
  2: "system",
};

enum ThemeEnum {
  "light" = 0,
  "dark" = 1,
  "system" = 2,
}
export const ThemeConfig = () => {
  const { theme, changeTheme } = useThemeContext();

  const { colorScheme } = useColorWind();
  const isDarkMode = colorScheme === "dark";

  const pagerViewRef = useRef<PagerView>(null);

  const onChangeTheme = async (id: number) => {
    changeTheme(typeThemes[id] as Theme);
  };

  useEffect(() => {
    if (!theme) return;

    pagerViewRef.current?.setPageWithoutAnimation(ThemeEnum[theme]);
  }, [theme]);

  return (
    <View className="border-primario border rounded-full">
      <PagerView
        ref={pagerViewRef}
        initialPage={ThemeEnum[theme]}
        className="h-10"
        shouldRasterizeIOS
        orientation={"horizontal"}
        onPageSelected={(x) => {
          //console.log(x.nativeEvent.position);
          onChangeTheme(x.nativeEvent.position);
        }}
      >
        <View key="1">
          <View className="flex-row items-center gap-2 justify-center mt-0.5">
            <Feather
              name="sun"
              color={isDarkMode ? "#FFF" : COLORS.light.background}
              size={20}
              style={{ zIndex: -999 }}
            />

            <View>
              <Texto className="text-primario dark:text-white" weight="Bold">
                Claro
              </Texto>
            </View>
          </View>
        </View>

        <View key="2">
          <View className="flex-row items-center gap-2 justify-center mt-0.5">
            <Feather
              name="moon"
              color={isDarkMode ? "#FFF" : COLORS.light.background}
              size={20}
              style={{ zIndex: -999 }}
            />
            <View>
              <Texto className="text-primario dark:text-white" weight="Bold">
                Oscuro
              </Texto>
            </View>
          </View>
        </View>

        <View key="3">
          <View className="flex-row items-center gap-2 justify-center mt-0.5">
            <Feather
              name="smartphone"
              color={isDarkMode ? "#FFF" : COLORS.light.background}
              size={20}
              style={{ zIndex: -999 }}
            />
            <View>
              <Texto className="text-primario dark:text-white" weight="Bold">
                Sistema
              </Texto>
            </View>
          </View>
        </View>
      </PagerView>
    </View>
  );
};
