import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Texto } from '@/ui'
import { COLORS_ALERT } from '~/constants'
import clsx from 'clsx'
import Collapsible from 'react-native-collapsible'
import Spacer from './Spacer'


type Props = {
    variant: "success" | "warning" | "danger",
    header: string;
    content: string;
}
const AlertCard: React.FC<React.PropsWithChildren<Props>> = ({ variant, content, header }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapsible = () => {
        setIsCollapsed(!isCollapsed)
    }
    return (
        <TouchableOpacity
            onPress={toggleCollapsible}
            activeOpacity={0.8} className={
                clsx([
                    'bg-green-400  rounded-xl p-4 border-gray-50  border-[.5px] dark:border-[0px]',
                    {
                        'bg-green-300 dark:bg-green-400': variant === 'success',
                        'bg-yellow-300 dark:bg-yellow-300': variant === 'warning',
                        'bg-red-300 dark:bg-red-400': variant === 'danger'
                    }
                ])
            }
        >
            <Texto
                numberOfLines={isCollapsed ? 1 : undefined}
                className={
                    clsx([
                        'dark:text-black uppercase text-ellipsis ',
                        {
                            'text-white': variant === "danger"
                        }
                    ])
                } weight='Bold'>{header}</Texto>
            <Collapsible collapsed={isCollapsed}>
                <Spacer />

                <Texto className={
                    clsx([
                        'dark:text-black',
                        {
                            'text-white': variant === "danger"
                        }
                    ])
                }>{content}</Texto>

            </Collapsible>
        </TouchableOpacity>

    )
}

export default AlertCard