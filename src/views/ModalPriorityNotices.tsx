import { useEffect, useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal'
import { Texto } from '../components';
import { Image } from 'expo-image';

import Carousel from 'react-native-reanimated-carousel';
import { useNoticias } from '@/hooks';
import { AntDesign } from '@expo/vector-icons';
import PaginationDot from 'react-native-animated-pagination-dot'
import { COLORS } from '~/constants';
import { Link } from 'expo-router';

const ModalPriorityNotices = () => {
    const [isVisible, setIsVisible] = useState(true)
    const { width, height } = useWindowDimensions()
    const { getPriorityNotices, data, isLoading } = useNoticias()
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        getPriorityNotices()
    }, [])

    if (isLoading || data.length == 0) return null

    return (
        <>
            <Modal isVisible={isVisible}>
                <View
                //className='bg-primario dark:bg-secondary-dark rounded-xl'
                >
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

                            // onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
                            modeConfig={{
                                snapDirection: "left",
                                stackInterval: 18,
                                scaleInterval: 0.08,
                                moveSize: width + 100,
                            }}
                            loop
                            width={width - 40}
                            height={height - 200}
                            autoPlay
                            data={data}
                            autoPlayInterval={data.length == 1 ? 999999 : 3000}
                            scrollAnimationDuration={2000}
                            onSnapToItem={(index) => setActiveIndex(index)}
                            renderItem={({ index, item }) => (
                                <Link href={`/comunicados/${item.id}`} asChild>
                                    <Pressable className='flex-1' onPress={() => setIsVisible(false)}>
                                        <View
                                            className='flex-1 relative'

                                        >
                                            <Image
                                                source={item.imagen}
                                                className='w-full h-full opacity-100 rounded-lg'
                                                contentFit='cover'


                                            />

                                            <View className='absolute bottom-0 left-0 bg-black/60 w-full p-3 '>
                                                <Texto numberOfLines={2} weight='Bold' className='text-white uppercase'>{item.titulo}</Texto>
                                            </View>
                                        </View>
                                    </Pressable>
                                </Link>
                            )}
                        />
                    </View>
                    <View className='absolute top-[-10] z-10 right-[-20] '>
                        <AntDesign.Button name='closecircle' size={30} color={"#FFF"} backgroundColor={"transparent"} style={{ padding: 0 }} onPress={() => setIsVisible(false)} />
                    </View>


                    <View className='items-center'>
                        <PaginationDot
                            activeDotColor={COLORS.light.background}
                            inactiveDotColor='#ccc'
                            curPage={activeIndex}
                            maxPage={data.length}
                        />

                    </View>
                </View>

            </Modal>
        </>
    )
}





export default ModalPriorityNotices

