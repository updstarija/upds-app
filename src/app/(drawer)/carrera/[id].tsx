import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'

const Carrera = () => {
    const params = useLocalSearchParams<any>()

    if (!params.id) return <Redirect href={"/(home)"} />
    const { id } = params
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

export default Carrera