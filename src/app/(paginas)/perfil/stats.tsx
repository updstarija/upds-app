import { View, Text } from 'react-native'
import React from 'react'
import { Texto } from '../../../components'
import { SelectCarrera } from '@/views'

const Stats = () => {
    return (
        <View className='bg-white dark:bg-primario-dark flex-1 p-2'>
            <Texto className='text-black dark:text-white'>Stats</Texto>

            <SelectCarrera />
        </View>
    )
}

export default Stats