import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import PagerView from 'react-native-pager-view'
import { Feather } from '@expo/vector-icons'
import { Texto } from '../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useColorWind } from 'nativewind'
import { COLORS } from '~/constants';

const typeThemes = {
    0: "light",
    1: "dark",
    2: "system"
}
export const ThemeConfig = () => {
    const { colorScheme, setColorScheme } = useColorWind()
    const isDarkMode = colorScheme === "dark"

    const [temaStorage, setTemaStorage] = useState(2)
    const [isLoading, setIsLoading] = useState(true)

    const onChangeTheme = async (id: number) => {
        //@ts-ignore
        setColorScheme(typeThemes[id])
        //@ts-ignore
        await AsyncStorage.setItem('tema', typeThemes[id])
    }

    const initialTheme = (): number => {

        if (colorScheme === "light") return 0;
        if (colorScheme === "dark") return 1;
        if (colorScheme == "system") return 2;

        return 0
    }

    const getTemaStorage = async () => {
        const tema = await AsyncStorage.getItem('tema')

        if (tema === "light") return 0;
        if (tema === "dark") return 1;
        if (tema == "system") return 2;

        return -1
    }



    useEffect(() => {
        (
            async () => {
                const tema = await AsyncStorage.getItem('tema')

                if (tema === "light") setTemaStorage(0);
                else if (tema === "dark") setTemaStorage(1);
                else if (tema == "system") setTemaStorage(2);

                setIsLoading(false)
            }
        )()
    }, [])

    return (
        <View className='border-primario border rounded-full'>
            {isLoading
                ? <View className='h-10 items-center  justify-center '><ActivityIndicator color={"#223B82"} /></View>
                : <PagerView initialPage={temaStorage} className='h-10'
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
                </PagerView>}
        </View>
    )
}

