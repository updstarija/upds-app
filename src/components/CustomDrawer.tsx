import { View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Texto } from './ui'

import { ThemeConfig } from '@/views'
import { useAuthContext, useThemeColor } from '@/hooks'
import { router } from 'expo-router'

const CustomDrawer = (props: any) => {
    const isDarkMode = useThemeColor() === "dark"



    const { status, userAuth, logout } = useAuthContext();

    const cerrarSesion = async () => {
        router.push('/auth/login');
        logout();
    };



    return (
        <View className='flex-1 bg-white dark:bg-primario-dark border-r border-[.6px] border-secondary-dark'>
            <DrawerContentScrollView {...props} className=''>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>


            <View className='px-4 mb-4'>
                <ThemeConfig />
            </View>

            <View className='border-t p-4 border-[#ccc]'>

                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View className='flex-row items-center'>
                        <AntDesign name="questioncircleo" size={22} color={isDarkMode ? "#FFF" : "#000"} />
                        <Texto className='text-black dark:text-white ml-2'>
                            Acerca de
                        </Texto>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={cerrarSesion} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} color={isDarkMode ? "#FFF" : "#000"} />
                        <Texto className='text-black dark:text-white ml-2'>
                            Cerrar Sesion
                        </Texto>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer