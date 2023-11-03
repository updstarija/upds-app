import { View, Text, TouchableOpacity, TouchableOpacityProps, Alert, ColorSchemeName } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useThemeColor, useThemeContext } from '@/hooks'
import { Menu } from '@/data'
import { Platform } from 'react-native'
import { Option } from '../../../components'
import { Feather } from '@expo/vector-icons'

const Tema = () => {
    const { themeSelected, changeTheme } = useThemeContext()


    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            <View className='mx-1 mt-3'>
                <Option icon='moon' text='Oscuro' active={themeSelected == "dark"} onPress={() => changeTheme("dark")} />
                <View className='mb-2' />
                <Option icon='sun' text='Claro' active={themeSelected == "light"} onPress={() => changeTheme("light")} />
                <View className='mb-2' />
                <Option icon='smartphone' text='Sistema' active={themeSelected == "system"} onPress={() => changeTheme("system")} />
            </View>

        </View>
    )
}



export default Tema