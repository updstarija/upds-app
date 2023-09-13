import { useEffect, useRef, useState } from 'react'
import { View, ActivityIndicator, Platform } from 'react-native'
import PagerView from 'react-native-pager-view'
import { Feather } from '@expo/vector-icons'
import { Texto } from '../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useColorWind } from 'nativewind'
import { COLORS } from '~/constants';
import { useThemeColor, useThemeContext } from '@/hooks';
import { ColorSchemeSystem } from 'nativewind/dist/style-sheet/color-scheme';

const typeThemes = {
    0: "light",
    1: "dark",
    2: "system"
}

enum ThemeEnum {
    "light" = 0,
    "dark" = 1,
    "system" = 2
}
export const ThemeConfig = () => {
    const { themeSelected, changeTheme } = useThemeContext()

    const { colorScheme, setColorScheme } = useColorWind()
    const isDark = useThemeColor() == "dark"
    const isDarkMode = colorScheme === "dark"
    const isIos = Platform.OS == "ios"


    const pagerViewRef = useRef<PagerView>(null)

    const onChangeTheme = async (id: number) => {
        //@ts-ignore
        changeTheme(typeThemes[id])
        //@ts-ignore
        await AsyncStorage.setItem('tema', typeThemes[id])
    }

    useEffect(() => {
        pagerViewRef.current?.setPage(ThemeEnum[themeSelected])
    }, [themeSelected])

    return (
        <View className='border-primario border rounded-full'>
            <PagerView ref={pagerViewRef} initialPage={ThemeEnum[themeSelected]} className='h-10'
                onPageSelected={(x) => onChangeTheme(x.nativeEvent.position)}  >
                <View key="1" >
                    <View className='flex-row items-center gap-2 justify-center mt-0.5'>
                        <Feather name='sun' color={isDarkMode ? "#FFF" : COLORS.light.background} size={20} style={{ zIndex: -999 }} />

                        <View>
                            <Texto className='text-primario dark:text-white' weight='Bold'>Claro</Texto>
                        </View>
                    </View>
                </View>
                <View key="2">
                    <View className='flex-row items-center gap-2 justify-center mt-0.5'>
                        <Feather name='moon' color={isDarkMode ? "#FFF" : COLORS.light.background} size={20} style={{ zIndex: -999 }} />
                        <View>
                            <Texto className='text-primario dark:text-white' weight='Bold'>Oscuro</Texto>
                        </View>
                    </View>
                </View>
                <View key="3">
                    <View className='flex-row items-center gap-2 justify-center mt-0.5'>
                        <Feather name='smartphone' color={isDarkMode ? "#FFF" : COLORS.light.background} size={20} style={{ zIndex: -999 }} />
                        <View>
                            <Texto className='text-primario dark:text-white' weight='Bold'>Sistema</Texto>
                        </View>
                    </View>
                </View>
            </PagerView>
        </View>
    )
}

