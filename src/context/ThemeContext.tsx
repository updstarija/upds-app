import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { tieneTema } from "@/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";

export type Theme = "light" | "dark" | "system";

interface ThemeContext {
  //themeSelected: Theme;
  changeTheme: (theme: Theme) => void;
  isLoadingTheme: boolean;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC<
  PropsWithChildren<{ initialTheme: Theme }>
> = ({ children, initialTheme }) => {
  const { setColorScheme } = useColorScheme();

  const [[isLoadingTheme, theme], setTheme] = useStorageState<Theme>(
    keysStorage.THEME,
    {
      initialValue: initialTheme,
    }
  );

  const changeTheme = async (theme: Theme) => {
    setTheme(theme);
    //
    //setThemeSelected(theme);
    //await AsyncStorage.setItem("tema", theme);
    setColorScheme(theme);
  };

  /* useEffect(() => {
    (async () => {
      if (!(await tieneTema())) {
        await AsyncStorage.setItem("tema", "system");
        changeTheme("system");
      } else {
        const tema = await AsyncStorage.getItem("tema");
        changeTheme(tema as ColorSchemeSystem);
        setColorScheme(tema as ColorSchemeSystem);
      }
    })();
  }, []); */

  return (
    <ThemeContext.Provider
      value={{
        //themeSelected,
        changeTheme,
        isLoadingTheme,
        theme: theme || initialTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
