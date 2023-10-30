import { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal'
import { Texto } from '../components';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';

import Carousel from 'react-native-reanimated-carousel';
import { useNoticias } from '@/hooks';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const sliders = [
    {
        title: true,
        image: require("~/assets/images/pages/bienvenida.png"),
        text: "Descubre, aprende y conecta con nosotros."
    },
    {
        title: false,
        image: require("~/assets/images/pages/bienvenida.png"),
        text: "Realiza tu proyeccion de materias."
    },
    {
        title: false,
        image: require("~/assets/images/pages/bienvenida.png"),
        text: " Consulta tu registro academico."
    },
    {
        title: false,
        image: require("~/assets/images/pages/bienvenida.png"),
        text: "Chatea con Nosotros.\nRecibe notificaciones sobre nuestros eventos o comunicados.\n Y mucho mas"
    },
]


const ModalPriorityNotices = () => {
    const [isVisible, setIsVisible] = useState(true)
    const { width, height } = useWindowDimensions()

    const { getPriorityNotices, data, isLoading } = useNoticias()

    useEffect(() => {
        getPriorityNotices()
    }, [])

    if (isLoading || data.length == 0) return null

    return (
        <>
            <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                <View
                //className='bg-primario dark:bg-secondary-dark rounded-xl'
                >
                    {/*  <FlashList
                        horizontal
                        data={sliders}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={{ width: width - 70, height: height / 2 }}>
                                <Image
                                    source={item.image}
                                    className='w-[90%] h-[90%]'
                                    contentFit='contain'

                                />

                                <Texto className='text-white'>dwadwd awdaw</Texto>
                            </View>
                        )}
                        // estimatedListSize={{``}}
                        estimatedItemSize={400}
                        pagingEnabled
                    /> */}

                    <View className=''>
                        <Carousel
                            style={
                                {
                                    width: "100%",
                                    justifyContent: "center"
                                    ,
                                    alignItems: "center"
                                }
                            }
                            vertical
                            mode='vertical-stack'

                            modeConfig={{
                                snapDirection: "left",
                                stackInterval: 200,
                                moveSize: 500

                            }}
                            loop
                            width={width - 40}
                            height={height - 200}
                            autoPlay
                            data={data}
                            autoPlayInterval={data.length == 1 ? 999999 : 3000}
                            scrollAnimationDuration={3000}
                            //  onSnapToItem={(index) => console.log('current index:', index)}
                            renderItem={({ index, item }) => (
                                <View
                                    className='flex-1 relative'

                                >
                                    <Image
                                        source={item.imagen}
                                        className='w-full h-full opacity-100'
                                        contentFit='cover'


                                    />

                                    <View className='absolute bottom-0 left-0 bg-black/60 w-full p-3 '>
                                        <Texto numberOfLines={2} weight='Bold' className='text-white uppercase'>{item.titulo}</Texto>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View className='absolute top-[-10] z-10 right-[-20] '>
                        <AntDesign.Button name='closecircle' size={30} color={"#FFF"} backgroundColor={"transparent"} style={{ padding: 0 }} onPress={() => setIsVisible(false)} />
                    </View>
                </View>

            </Modal>
        </>
    )
}

export default ModalPriorityNotices