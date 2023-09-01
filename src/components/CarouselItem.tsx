import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import Modal from 'react-native-modal'
export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)


export const CarouselCardItem = ({ item, index }: { item: any, index: number }) => {
    // const [visibleModal, setVisibleModal] = useState(false)

    return (
        <>


            <View style={styles.container} key={index}>
                <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                    resizeMode='cover'

                />
                {/* <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text> */}
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: ITEM_WIDTH,

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

