import { Theme, useThemeStore } from "@/store/useTheme.store";
import { useColorScheme } from "nativewind";

export const useTheme = () => {
  const { setColorScheme } = useColorScheme();
  const { changeTheme: changeThemeStore, theme } = useThemeStore();

  const changeTheme = (theme: Theme) => {
    changeThemeStore(theme);
    setColorScheme(theme);
  };

  return {
    changeTheme,
    theme,
  };
};
