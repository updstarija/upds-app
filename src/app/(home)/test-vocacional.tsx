import { View, Text } from 'react-native'
import React from 'react'
import { Texto } from '../../components'

const TestVocacional = () => {
    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            <Texto className='text-white text-center text-xl mt-10' weight='Bold'> UN TEST VOCACIONAL</Texto>
        </View>
    )
}

export default TestVocacional