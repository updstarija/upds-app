import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { requestPermissionsAsync } from "expo-notifications"
import { request } from 'react-native-permissions'
import Checkbox from 'expo-checkbox'
import { COLORS } from '~/constants'
import { Texto } from '../../../components'
import { FontAwesome } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks'
import messagin from '@react-native-firebase/messaging';


const Notificaciones = () => {
    const isDark = useThemeColor() === "dark"

    const [activeNotifications, setActiveNotifications] = useState(false)

    const verificarNotificaciones = async () => {
        const { status } = await requestPermissionsAsync()
        if (status === "granted") setActiveNotifications(true)
    }

    const toggleNotifications = async (x: boolean) => {
        /*  if (x) {
             const result = await messagin().registerDeviceForRemoteMessages()
             console.log(result)
             return
         }
         const result = await messagin().unregisterDeviceForRemoteMessages()
         console.log(result) */
    }
    useEffect(() => {
        verificarNotificaciones()
    }, [])
    return (
        <ScrollView className='bg-white dark:bg-primario-dark flex-1 '>
            <View className='m-2'>
                <Texto className=' dark:text-white m-4 uppercase text-center' weight='Bold'>¡Activa las notificaciones para aprovechar al máximo nuestra aplicación!</Texto>
                <Texto className=' dark:text-white  mb-3' >Al habilitar las notificaciones, te mantendremos al día con información importante y útil, como:</Texto>
                <Texto className=' dark:text-white ' >
                    <FontAwesome name='check' size={20} color={isDark ? "#FFF" : COLORS.light.background} /> Comunicados sobre eventos exclusivos.
                </Texto>
                <Texto className=' dark:text-white ' >
                    <FontAwesome name='check' size={20} color={isDark ? "#FFF" : COLORS.light.background} /> Fechas límites de pago y recordatorios.
                </Texto>
                <Texto className=' dark:text-white ' >
                    <FontAwesome name='check' size={20} color={isDark ? "#FFF" : COLORS.light.background} /> Actualizaciones críticas y novedades.
                </Texto>
            </View>

            <View className="mt-4 mx-2 py-1 flex-row items-center justify-between border border-primario p-4 rounded-xl" >
                <Texto className="text-black dark:text-white">Recibir Notificaciones</Texto>

                <Checkbox
                    value={activeNotifications}
                    className='mr-1'
                    onValueChange={(x) => {
                        // toggleNotifications(x)
                        setActiveNotifications(x)
                    }}
                    color={COLORS.light.background}
                />


            </View>


        </ScrollView>
    )
}

export default Notificaciones