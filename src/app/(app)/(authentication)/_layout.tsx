import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuthContext } from '@/hooks'
import { Texto } from '@/ui'

const LayoutAuthentication = () => {
    const { status, welcomeScreen } = useAuthContext()

    if (status === "pending" || welcomeScreen.isLoading) {
        return <Texto>VERIFING SESSION AND WELCOME SCREEN</Texto>
    }

    if (welcomeScreen.value) {
        return <Redirect href={"/"} />
    }

    if (!welcomeScreen.value) {
        return <Redirect href={"/welcome"} />
    }

    return (
        <Stack>
            <Stack.Screen
                name='auth/login'
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}

export default LayoutAuthentication