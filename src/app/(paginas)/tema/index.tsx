import { View, Text, TouchableOpacity, TouchableOpacityProps, Alert, ColorSchemeName } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useThemeColor, useThemeContext } from '@/hooks'
import { Menu } from '@/data'
import { Platform } from 'react-native'
import { Texto } from '../../../components'
import { Feather } from '@expo/vector-icons'

const Tema = () => {
    const { themeSelected, changeTheme } = useThemeContext()

    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            <View className='mx-1 mt-3'>
                <Opcion icon='moon' text='Oscuro' active={themeSelected == "dark"} onPress={() => changeTheme("dark")} />
                <View className='mb-2' />
                <Opcion icon='sun' text='Claro' active={themeSelected == "light"} onPress={() => changeTheme("light")} />
                <View className='mb-2' />
                <Opcion icon='smartphone' text='Sistema' active={themeSelected == "system"} onPress={() => changeTheme("system")} />
            </View>

        </View>
    )
}

interface Props extends TouchableOpacityProps {
    icon: string,
    text: string,
    active: boolean
}

const Opcion: React.FC<Props> = ({ icon, text, active, ...props }) => {
    const isDark = useThemeColor() == "dark"
    const isIos = Platform.OS == "ios"

    return <>

        <TouchableOpacity className={`flex-row bg-gray-50  ${active ? "border-[#6288f5] border-[1.5px]" : "border-[.5px] dark:border-[0px] border-gray-500"} dark:bg-secondary-dark  p-5 items-center rounded-lg`}
            style={[
                { elevation: 5 },
                active && {
                    borderWidth: 1,
                    borderColor: "#6288f5"
                }]} {...props}>

            <Feather
                //@ts-ignore
                name={icon} size={20} color={isDark ? "#fff" : "#000"} />


            <Texto className='ml-4 text-black dark:text-white' weight='Bold'>{text}</Texto>

        </TouchableOpacity>
    </>
}

export default Tema