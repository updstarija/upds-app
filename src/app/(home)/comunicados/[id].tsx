import { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    View
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, IconLabel, Texto } from '../../../components';
import { Platform, Dimensions } from 'react-native'
import Share from 'react-native-share';
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useNoticias, useThemeColor } from '@/hooks';
import { INotificacionNotice } from '@/types';
import { COLORS } from '~/constants';
import Spinner from '@/components/ui/Spinner';
import { openBrowserAsync } from 'expo-web-browser'

export const NoticeDetail = () => {
    const params = useLocalSearchParams<any>()

    if (!params.id) return <Redirect href={"/(home)"} />
    const { id } = params

    const isIos = Platform.OS === "ios"
    const isDark = useThemeColor() === "dark"
    const width = Dimensions.get("screen").width

    const { getOneData, isLoading } = useNoticias()
    const [noticia, setNoticia] = useState({} as INotificacionNotice)

    const [islike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(noticia?.like || 0)

    const [height, setHeight] = useState(0)

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
                console.log(likes)
                setLikes(likes + increment);
                console.log('increnmet')
            })
            .catch(error => {
                console.log('Error al incrementar like:', error);
            });
    };

    useEffect(() => {
        async function init() {
            const data = await getOneData(id)
            //@ts-ignore
            Image.getSize(data.imagen, (w, h) => {
                setHeight(h * (width / w))
            })
            //@ts-ignore
            setNoticia(data)
            //@ts-ignore
            setLikes(data.like)
            const liked = await checkIfLiked();
            setIsLike(liked);
        }
        init();
    }, []);

    const render = () => {

        if (noticia.id) {
            return <View className='flex-1'>
                <View className=''>
                    <Image className='mb-6' source={{ uri: noticia.imagen, }} height={height} width={width} resizeMode='contain' />

                    <View className='mb-10 flex-1'>
                        <View className='flex-row justify-evenly'>
                            <View className='flex-row items-center'>
                                <TouchableOpacity onPress={() => likeNotice()}>
                                    {islike
                                        ? <AntDesign name='like1' size={25} color={isDark ? "#FFF" : COLORS.light.background} />
                                        :
                                        <AntDesign name='like2' size={25} color={isDark ? "#FFF" : "#000"} />}
                                </TouchableOpacity>

                                <Texto className='ml-1 text-black dark:text-white' weight='Bold'>{likes}</Texto>
                            </View>

                            <View className='flex-row items-center'>
                                <AntDesign name='calendar' size={20} color={isDark ? "#FFF" : "#000"} />
                                <Texto className='ml-1  text-black dark:text-white' weight='Bold'>{new Date(Number(noticia.fecha)).toLocaleDateString("es-Es")}</Texto>
                            </View>
                        </View>
                    </View>
                </View>

                <View className={`flex-1 bg-white dark:bg-secondary-dark border border-gray-100 dark:border-primario shadow-sm shadow-primario `} style={{
                    borderTopLeftRadius: 50, borderTopRightRadius: 50, elevation: 40, borderBottomWidth: 0
                }}>
                    <View className='bg-primario w-80 rounded-xl p-1 mt-[-20px] relative mx-auto'>
                        <Texto className={`text-${noticia.texto.length > 30 ? "xl" : "xl"} uppercase text-white text-center`} weight='Bold'>{noticia.titulo}</Texto>

                        {noticia.prioridad && <>

                            <View style={{ position: "absolute", top: -5, right: -5, zIndex: 1 }}>
                                <FontAwesome name={"star"} color={isDark ? "#FFF" : "#3498db"} size={20} />
                            </View>
                        </>}
                    </View>

                    <View className='p-4'>
                        <IconLabel iconName={"view-dashboard"} textButton={noticia.categoria} />
                        <Texto className=' dark:text-white mt-4' > {noticia.texto}</Texto>
                    </View>


                    <View className='mx-2  flex-1 justify-end my-2'>
                        <Button
                            classNameBtn="w-full rounded-xl bg-primario p-2 "
                            onPress={() => { openBrowserAsync(noticia.url) }}
                            disabled={isLoading} showLoader>
                            <Texto className="text-center text-white ">
                                MAS INFORMACION   <FontAwesome name='send' size={20} />
                            </Texto>
                        </Button>
                    </View>

                </View>
            </View >
        }


        return <Texto>NO HAY DATA</Texto>

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
            console.log('Error al compartir la imagen:', error);
        }
    }

    if (isLoading) return <Spinner size={50} text='Cargando Noticia' showText />

    return (
        <View className='flex-1 bg-white dark:bg-secondary-dark'>
            <ScrollView style={{ flex: 1 }} scrollsToTop contentContainerStyle={{ flexGrow: 1 }}>
                <View className='bg-white dark:bg-primario-dark flex-1'>
                    <View className='flex-1'>
                        {render()}
                    </View>
                </View>
            </ScrollView>

            <View style={{ position: "absolute", bottom: 50, right: 30 }}>
                <TouchableOpacity onPress={compartirNoticia} className='bg-primario p-4 rounded-full' activeOpacity={0.8} style={{ elevation: 20 }}>
                    <AntDesign name='sharealt' size={20} color={"#FFF"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default NoticeDetail