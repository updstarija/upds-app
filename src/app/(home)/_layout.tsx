import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { configStack } from '@/helpers'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                //@ts-ignore
                options={configStack("Comunicados")}
                name='comunicados/index' />
            <Stack.Screen
                //@ts-ignore
                options={{
                    ...configStack("Comunicado"),
                    headerShown: false,
                }}
                name='comunicados/[id]' />

            <Stack.Screen
                name="upds-responde"
                //@ts-ignore
                options={configStack("UPDS Responde")}
            />

            <Stack.Screen
                name="chat"
                //@ts-ignore
                options={configStack("UPDS Responde")}
            />

            <Stack.Screen
                name="test-vocacional"
                //@ts-ignore
                options={configStack("Test Vocacional")}
            />

            <Stack.Screen
                name="ubicacion"
                //@ts-ignore
                options={configStack("Ubicación")}
            />


            <Stack.Screen
                name="redes-sociales"
                //@ts-ignore
                options={configStack("Redes Sociales")}
            />
        </Stack>
    )
}

export default Layout