import { View, Text } from 'react-native'
import React from 'react'
import { nativeApplicationVersion, nativeBuildVersion, } from 'expo-application'
import { Texto } from '../../../components'

const About = () => {
    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            <Text>UPDS Tarija</Text>

            <Texto>VERSION {nativeApplicationVersion}</Texto>
            <Texto>VERSION BUILD {nativeBuildVersion}</Texto>
        </View>
    )
}

export default About