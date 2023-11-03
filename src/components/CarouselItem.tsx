import { INotificacion, INotificacionNotice } from '@/types'
import React, { useState } from 'react'
import { Image, Pressable } from 'react-native'
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Texto } from '../ui'
import { Link } from 'expo-router'

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = SLIDER_WIDTH > 1000 ? Math.round(SLIDER_WIDTH * 0.4) : Math.round(SLIDER_WIDTH * 0.7)


export const CarouselCardItem = ({ item, index }: { item: INotificacionNotice, index: number }) => {
    // const [visibleModal, setVisibleModal] = useState(false)

    return (
        <Link href={`/comunicados/${item.id}`} asChild>
            <Pressable>
                <View style={styles.container} key={index}>
                    <Image
                        source={{ uri: item.imagen, width: 500 }}
                        style={styles.image}
                        resizeMode='cover'

                    />
                    <View className='absolute bottom-0 left-0 bg-black/70 w-full p-2 rounded-b-lg'>
                        <Texto className='text-white' numberOfLines={1}>{item.titulo}</Texto>
                    </View>

                </View>
            </Pressable>
        </Link>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: ITEM_WIDTH,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        marginHorizontal: "auto",
        elevation: 13,
        // marginBottom: 20,
        // paddingBottom: 0
    },
    image: {
        width: ITEM_WIDTH,
        borderRadius: 10,
        height: 250
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20
    }
})

