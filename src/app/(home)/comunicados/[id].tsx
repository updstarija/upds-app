import { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Image,
    ScrollView,
    View,
    Platform, Dimensions, useWindowDimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Share from 'react-native-share';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser'
import { COLORS } from '~/constants';
import { useNoticias, useThemeColor } from '@/hooks';
import { Button, IconLabel, Spacer, Spinner } from '@/components';
import { INotificacionNotice } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomSkeleton, Texto } from '@/ui';
import { FloatingAction, IActionProps } from 'react-native-floating-action';

const actionsFloatButton: IActionProps[] = [
    {
        text: "Compartir",
        name: "share",
        icon: <AntDesign name='sharealt' size={20} color={"#FFF"} />,

    },
    {
        text: "Más Información",
        name: "more-info",
        icon: <FontAwesome name="send" color="#fff" size={20} />,
    },

];



export const NoticeDetail = () => {
    const params = useLocalSearchParams<any>()

    if (!params.id) return <Redirect href={"/(home)"} />
    const { id } = params

    const isIos = Platform.OS === "ios"
    const isDark = useThemeColor() === "dark"
    const { width } = useWindowDimensions()

    const { getOneData, } = useNoticias()
    const [noticia, setNoticia] = useState({} as INotificacionNotice)
    const [isLoading, setIsLoading] = useState(true)

    const [islike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(noticia?.like || 0)

    const [height, setHeight] = useState(0)
    const [widthImage, setWidthImage] = useState(0)

    const [dimensionsImage, setDimensionsImage] = useState({
        width: 0,
        height: 0
    })

    const checkIfLiked = async (): Promise<boolean> => {
        const liked = await AsyncStorage.getItem(`liked_noticia_${id}`);
        return liked === 'true';
    };

    const likeNotice = async () => {
        setIsLike(!islike);
        const liked = await checkIfLiked();
        const increment = liked ? -1 : 1;

        const noticiaRef = firestore().collection('Noticia').doc(id);

        noticiaRef
            .update({
                like: firestore.FieldValue.increment(increment),
            })
            .then(async () => {
                await AsyncStorage.setItem(`liked_noticia_${id}`, (!liked).toString());
                //console.log(likes)
                setLikes(likes + increment);
            })
            .catch(error => {
                // console.log('Error al incrementar like:', error);
            });
    };

    useEffect(() => {
        setHeight(dimensionsImage.height * (width / dimensionsImage.width))
    }, [width])

    useEffect(() => {
        async function init() {
            const data = await getOneData(id)
            //@ts-ignore
            Image.getSize(data.imagen, (w, h) => {
                setWidthImage(w)
                setHeight(h * (width / w))

                setDimensionsImage({
                    width: w,
                    height: h
                })
            })
            //@ts-ignore
            setNoticia(data)
            //@ts-ignore
            setLikes(data.like)
            const liked = await checkIfLiked();
            setIsLike(liked);
            setIsLoading(false)
        }
        init();
    }, []);

    console.log(isLoading)

    const render = () => {
        return <View className='flex-1'>
            <View className=''>
                {isLoading
                    ?
                    <CustomSkeleton width={width} height={width} />

                    :
                    <Image className='mb-6' source={{ uri: noticia.imagen, }} height={height} width={width} resizeMode='contain' />}


                <Spacer height={20} />


                <View className='mb-10 flex-1'>
                    <View className='flex-row justify-evenly'>
                        <View className='flex-row items-center'>
                            <TouchableOpacity onPress={() => likeNotice()} disabled={isLoading}>
                                {islike
                                    ? <AntDesign name='like1' size={25} color={isDark ? "#FFF" : COLORS.light.background} />
                                    :
                                    <AntDesign name='like2' size={25} color={isDark ? "#FFF" : "#000"} />}
                            </TouchableOpacity>

                            {
                                isLoading ?
                                    <View className='ml-2'>
                                        <CustomSkeleton width={20} height={20} />
                                    </View>
                                    :
                                    <Texto className='ml-1 text-black dark:text-white' weight='Bold'>{likes}</Texto>
                            }
                        </View>

                        <View className='flex-row items-center'>
                            <AntDesign name='calendar' size={20} color={isDark ? "#FFF" : "#000"} />
                            {
                                isLoading ?
                                    <View className='ml-2'>
                                        <CustomSkeleton width={100} height={20} />
                                    </View>
                                    :
                                    <Texto className='ml-1  text-black dark:text-white' weight='Bold'>{new Date(Number(noticia.fecha)).toLocaleDateString("es-Es")}</Texto>
                            }

                        </View>
                    </View>
                </View>
            </View>

            <View className={`flex-1 bg-white dark:bg-secondary-dark border border-gray-100 dark:border-primario shadow-sm shadow-primario `} style={{
                borderTopLeftRadius: 50, borderTopRightRadius: 50, elevation: 40, borderBottomWidth: 0
            }}>
                <View className='bg-primario w-80 rounded-xl p-1 mt-[-20px] relative mx-auto'>
                    {
                        isLoading ?
                            <View className='p-2'>
                                <CustomSkeleton width={"100%"} height={20} colors={["#243E89", "#2F489C", "#3752AD"]} />
                            </View>
                            :
                            <Texto className={`text-${noticia.texto.length > 30 ? "xl" : "xl"} uppercase text-white text-center`} weight='Bold'>{noticia.titulo}</Texto>
                    }


                    {isLoading && noticia.prioridad && <>
                        <View style={{ position: "absolute", top: -5, right: -5, zIndex: 1 }}>
                            <FontAwesome name={"star"} color={isDark ? "#FFF" : "#3498db"} size={20} />
                        </View>
                    </>}
                </View>

                <View className='p-4'>
                    <IconLabel iconName={"view-dashboard"} textButton={noticia.categoria} loader={isLoading ? <CustomSkeleton width={100} height={20} /> : undefined} />

                    <Spacer height={20} />
                    {
                        isLoading ?

                            <CustomSkeleton width={"100%"} height={50} />

                            :
                            <Texto className=' dark:text-white ' > {noticia.texto}</Texto>

                    }



                </View>
            </View>
        </View >
    }

    const compartirNoticia = async () => {
        const ImageBase64 = noticia.imagen;
        try {
            const shareOptions = {
                message: `📰 *${noticia.titulo}*
🗓️ *${new Date(noticia.fecha).toLocaleDateString("es-ES")}*
📚 *${noticia.categoria}*

${noticia.texto}

Mas Informacion: ${noticia.url}
                `,
                url: ImageBase64,
            };

            await Share.open(shareOptions);
        } catch (error) {
            //console.log('Error al compartir la imagen:', error);
        }
    }

    const actionsEvents: { [key: string]: Function } = {
        "share": compartirNoticia,
        "more-info": () => {
            openBrowserAsync(noticia.url)
        },
    }

    /*  if (isLoading) return <Spinner size={50} text='Cargando Comunicado' showText />
  */
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "transparent"
                    }
                }}
            />

            <SafeAreaView className='flex-1 bg-white dark:bg-secondary-dark'>
                <ScrollView style={{ flex: 1 }} scrollsToTop contentContainerStyle={{ flexGrow: 1 }}>
                    <View className='bg-white dark:bg-primario-dark flex-1'>
                        <View className='flex-1'>
                            {render()}
                        </View>
                    </View>
                </ScrollView>

                {/* <View style={{ position: "absolute", bottom: 50, right: 30 }}>
                    <TouchableOpacity onPress={compartirNoticia} className='bg-primario p-4 rounded-full' activeOpacity={0.8} style={{ elevation: 20 }}>
                        <AntDesign name='sharealt' size={20} color={"#FFF"} />
                    </TouchableOpacity>
                </View>
 */}
                <FloatingAction
                    overlayColor="#0000006a"
                    actions={actionsFloatButton}
                    distanceToEdge={{ horizontal: 40, vertical: 40 }}
                    onPressItem={(name) => {
                        if (!name) return;

                        if (Object.keys(actionsEvents).includes(name)) {
                            actionsEvents[name]()
                        }

                    }}
                />
            </SafeAreaView>
        </>
    );
};


export default NoticeDetail