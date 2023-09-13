import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useColorScheme } from 'nativewind'
import { tieneTema } from "@/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";

type Theme = "light" | "dark" | "system";

interface ThemeContext {
    themeSelected: Theme;
    changeTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);


export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [themeSelected, setThemeSelected] = useState<Theme>("system")
    const { setColorScheme } = useColorScheme()

    const changeTheme = async (theme: Theme) => {
        setThemeSelected(theme)
        await AsyncStorage.setItem('tema', theme)
        setColorScheme(theme)
    }

    useEffect(() => {
        (async () => {
            if (!await tieneTema()) {
                await AsyncStorage.setItem('tema', 'system')
                changeTheme("system")
            } else {
                const tema = await AsyncStorage.getItem('tema')
                changeTheme(tema as ColorSchemeSystem)
                setColorScheme(tema as ColorSchemeSystem)
            }
        })()
    }, [])

    return <ThemeContext.Provider value={{
        themeSelected,
        changeTheme
    }}>
        {children}
    </ThemeContext.Provider>
}