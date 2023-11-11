import { useEffect, useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot'
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useNoticias } from '@/hooks';
import { CustomModal, Texto } from '@/ui';
import { COLORS } from '~/constants';


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
            <CustomModal isVisible={isVisible}>
                <View
                    className="max-w-lg mx-auto w-full"
                >
                    <View className=''>
                        <Carousel
                            style={
                                {
                                    width: "100%",
                                    justifyContent: "center",
                                    maxWidth: 500,
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
                            width={width > 1000 ? 500 : width - 40}
                            height={height - 200}
                            autoPlay
                            data={data}
                            autoPlayInterval={data.length == 1 ? 999999 : 3000}
                            scrollAnimationDuration={1500}
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

            </CustomModal>
        </>
    )
}





export default ModalPriorityNotices

