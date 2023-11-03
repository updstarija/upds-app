import { useEffect, useRef, useState } from "react";
import { Pagination, Carousel } from "react-native-snap-carousel/src/";
import { SLIDER_WIDTH, ITEM_WIDTH, CarouselCardItem } from "./CarouselItem";

import { Pressable, View } from "react-native";
import { useNoticias, useThemeColor } from "@/hooks";
import { COLORS } from "~/constants";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Spinner from "./Spinner";
import { Texto } from "@/ui";

export const CarouselCards = () => {
    const [index, setIndex] = useState(0);
    const isCarousel = useRef<null>(null);

    const isDark = useThemeColor() === "dark";

    const { getData, isLoading, data } = useNoticias();

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) return <Spinner style={{ height: 200 }} />;
    if (data.length == 0) return null;

    return (
        <>
            <View className="flex-row justify-between">
                <Texto className="text ml-5 pt-2 dark:text-white" weight="Bold">
                    Mas Relevante
                </Texto>

                <Link href="/comunicados/" className="pt-2 mr-5 flex-row">
                    <View className="flex-row items-center justify-between">
                        <Texto className="dark:text-white ">Ver Mas</Texto>
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
                <Carousel
                    layout="default"
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={data}
                    renderItem={(x) => {
                        return (
                            <Pressable
                            //onPressIn={() => setVisibleModal(true)}
                            //onPressOut={() => Alert.alert("FUERA")}

                            // onPress={() => Alert.alert("DENTRp")}
                            //onPress={() => setVisibleModal(true)}
                            >
                                <CarouselCardItem {...x} />
                            </Pressable>
                        );
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
                        backgroundColor: isDark ? "#FFF" : COLORS.light.background,
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                />
            </View>
        </>
    );
};
