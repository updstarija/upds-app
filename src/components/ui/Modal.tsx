import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { PropsWithChildren } from 'react'
import RNModal, { ModalProps } from 'react-native-modal'


interface Props {
    isVisible: boolean
    modalProps?: ModalProps
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({ children, isVisible, modalProps }) => {
    return (
        <RNModal isVisible={isVisible} {...modalProps} >
            <View className="bg-white dark:bg-secondary-dark p-4 rounded-2xl">
                {children}
            </View>
        </RNModal>
    )
}

