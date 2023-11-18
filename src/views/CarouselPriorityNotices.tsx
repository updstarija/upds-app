import { useEffect, useRef, useState } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { useNoticias, useThemeColor } from "@/hooks";
import { COLORS } from "~/constants";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Texto } from "@/ui";
import { Spinner } from "@/components";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";
import PaginationDot from 'react-native-animated-pagination-dot'
const CarouselPriorityNotices = () => {
    const isDark = useThemeColor() === "dark"
    const { width } = useWindowDimensions()
    const { getData, data, isLoading } = useNoticias()
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        getData()
    }, [])

    if (isLoading || data.length == 0) return null

    return (
        <View className="mb-5">
            <View className="flex-row justify-between">
                <Texto className="text ml-5 pt-2 dark:text-white" weight="Bold">
                    Más Relevante
                </Texto>

                <Link href="/comunicados/" className="pt-2 mr-5 flex-row">
                    <View className="flex-row items-center justify-between">
                        <Texto className="dark:text-white ">Ver Más</Texto>
                        <View style={{ marginLeft: 10 }}>
                            <FontAwesome
                                name="chevron-right"
                                size={15}
                                color={isDark ? "#FFF" : "#000"}
                            />
                        </View>
                    </View>
                </Link>
            </View>

            <View>
                <View className='w-full items-center justify-center'>
                    <Carousel
                        style={{
                            width
                        }}
                        mode="parallax"
                        loop
                        autoPlay
                        width={width > 1000 ? 500 : width}
                        height={250}
                        data={data}
                        autoPlayInterval={data.length == 1 ? 999999 : 3000}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => setActiveIndex(index)}
                        renderItem={({ item }) => (
                            <Link href={`/comunicados/${item.id}`} asChild>
                                <Pressable className='flex-1'>
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

                <View className='items-center'>
                    <PaginationDot
                        activeDotColor={COLORS.light.background}
                        inactiveDotColor='#CCC'
                        curPage={activeIndex}
                        maxPage={data.length}
                    />

                </View>
            </View>
        </View>
    );
};

export default CarouselPriorityNotices;
