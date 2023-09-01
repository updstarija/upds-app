import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Texto } from './ui'

interface Props {
    max: number
}

const Counter: React.FC<Props> = ({ max }) => {
    const [currentValue, setCurrentValue] = useState(0)


    useEffect(() => {
        if (currentValue < max) {
            const inverval = setInterval(() => {
                setCurrentValue((prev) => Math.min(prev + 1, max))
            }, 0.5)
            return () => clearInterval(inverval)
        }

    }, [currentValue, max])

    useEffect(() => {
        setCurrentValue(0)
    }, [max])
    return (
        <View>
            <View style={{ width: "100%" }}>

                <Texto className='text-[80px] text-black dark:text-white' weight='Bold'>{Math.round(currentValue)}</Texto>

            </View>

        </View>
    )
}

export default Counter