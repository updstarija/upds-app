import React, { useEffect, useMemo, useState } from 'react'
import { Pagination, Carousel } from 'react-native-snap-carousel/src/'
import { SLIDER_WIDTH, ITEM_WIDTH, CarouselCardItem } from './CarouselItem'
import { Texto } from './ui'
import Modal from 'react-native-modal'
import { Alert, Image, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useNoticias, useThemeColor } from '@/hooks'
import { Data } from '../types/responses/detalleGrupo';
import { INotificacion, INotificacionNotice } from '@/types'
import { COLORS } from '~/constants'

const dataPrev = [
    {
        title: "Aenean leo",
        body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
        imgUrl: "https://scontent.fsrz4-1.fna.fbcdn.net/v/t39.30808-6/371915467_688653793298804_8000936480075782193_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=3F2R6qvUYLcAX-vaDyX&_nc_ht=scontent.fsrz4-1.fna&oh=00_AfDBsXWk8fFG5prX2bL9lDPeCnV3-SbrJTXEJVwG_2RD2A&oe=64F376CF"
    },
    {
        title: "In turpis",
        body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
        imgUrl: "https://scontent.fsrz4-1.fna.fbcdn.net/v/t39.30808-6/369745424_686748326822684_3761517989508833906_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=P7w-ako_lR4AX_1sQaT&_nc_ht=scontent.fsrz4-1.fna&oh=00_AfDxwiPD5W6oXHQH0H20qEfBC3zi6jjPB0jGYthATEi1Og&oe=64F4044E"
    },
    {
        title: "Lorem Ipsum",
        body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
        imgUrl: "https://scontent.fsrz4-1.fna.fbcdn.net/v/t45.1600-4/368519414_6437335141109_1873884950835785808_n.jpg?stp=cp0_dst-jpg_p526x296_q75_spS444&_nc_cat=105&ccb=1-7&_nc_sid=67cdda&_nc_ohc=2nPQIBfmyEwAX_Ea6OP&_nc_ht=scontent.fsrz4-1.fna&oh=00_AfAp6jlUCuysRNpn9jaOn4tUDYYO8kDKk5andAS5HQh3Qw&oe=64F27D3F"
    },
    {
        title: "Lorem Ipsum",
        body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
        imgUrl: "https://scontent.fsrz4-1.fna.fbcdn.net/v/t39.30808-6/369796928_686742833489900_475610376522106744_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=5xjBsT1Klg0AX8pSDgm&_nc_ht=scontent.fsrz4-1.fna&oh=00_AfAfpceIjiBvldydqlxDvxltFqkRwpj9k_awT23IvZ0Xcg&oe=64F3B439"
    }
]


export const CarouselCards = () => {
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef<null>(null)

    const [data, setData] = useState<INotificacionNotice[]>([])

    const isDark = useThemeColor() === "dark"

    const { getData } = useNoticias()

    const getNoticias = async () => {
        const notis = await getData()

        setData(notis)
    }
    useEffect(() => {
        getNoticias()
    }, [])

    if (data.length == 0) return null

    return (
        <>
            <View>
                <Carousel
                    layout="default"
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={data}
                    renderItem={(x) => {
                        return <Pressable
                        //onPressIn={() => setVisibleModal(true)}
                        //onPressOut={() => Alert.alert("FUERA")}

                        // onPress={() => Alert.alert("DENTRp")}
                        //onPress={() => setVisibleModal(true)}
                        >
                            <CarouselCardItem {...x} />
                        </Pressable>
                    }}
                    // itemHeight={500}
                    sliderWidth={SLIDER_WIDTH}
                    //  sliderHeight={500}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem={(index) => setIndex(index)}
                    autoplay
                    containerCustomStyle={{ marginTop: 20 }}
                    autoplayDelay={1000}
                    autoplayInterval={5000}
                    loop
                    vertical={false}

                //  useScrollView={true}


                />

                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={index}
                    //@ts-ignore
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        backgroundColor: isDark ? "#FFF" : COLORS.light.background
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                />
            </View>

        </>

    )
}

