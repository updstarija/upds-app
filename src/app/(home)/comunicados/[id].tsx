import { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
    Alert,
    View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
    CommonActions,
    RouteProp,
    useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Texto } from '../../../components';
import { Platform, Dimensions } from 'react-native'
import Share from 'react-native-share';
import { AntDesign } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useNoticias, useThemeColor } from '@/hooks';
import { INotificacionNotice } from '@/types';
import { COLORS } from '~/constants';
import Spinner from '@/components/ui/Spinner';

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

    const navigator = useNavigation();

    const checkIfLiked = async (): Promise<boolean> => {
        //FIX ID
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

    const shareNotice = async () => {
        /*  const ImageBase64 = notice.imagen;
         try {
             const shareOptions = {
                 message: notice.texto,
                 url: ImageBase64,
             };
 
             await Share.open(shareOptions);
         } catch (error) {
             console.log('Error al compartir la imagen:', error);
         } */
    };

    const regresar = () => {
        /*  navigator.dispatch(
             CommonActions.navigate({
                 name: 'NoticeScreen',
             }),
         ) */
    }

    useEffect(() => {


        async function init() {
            const data = await getOneData(id)
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
            return <View className='flex'>
                <Image className='my-6' source={{ uri: noticia.imagen }} height={300} width={width} resizeMode='contain' />
                <View className='items-center'>
                </View>

                <View className='mb-10 '>
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
                            <Texto className='ml-1  text-black dark:text-white' weight='Bold'>{noticia.fecha}</Texto>
                        </View>
                    </View>
                </View>

                <View className={`bg-white dark:bg-secondary-dark items-center border border-gray-100 dark:border-primario shadow-lg shadow-primario`} style={{
                    borderTopLeftRadius: 50, borderTopRightRadius: 50, elevation: 5
                }}>
                    <View className='bg-primario w-80 rounded-xl p-1 mt-[-20px]'>
                        <Texto className={`text-${noticia.texto.length > 30 ? "lg" : "xl"} uppercase text-white text-center`} weight='Bold'>{noticia.titulo}</Texto>
                    </View>
                    <View className='p-4'>
                        <Texto className='text-justify dark:text-white' weight='Light'> {noticia.texto}</Texto>
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
                message: noticia.texto,
                url: ImageBase64,
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error al compartir la imagen:', error);
        }
    }

    if (isLoading) return <Spinner size={50} text='Cargando Noticia' showText />

    return (
        <View className='flex-1'>
            <ScrollView className='bg-white dark:bg-primario-dark flex-1'>
                <View >
                    {render()}
                </View>

                <View style={styles.contentSize}>
                    {/*@ts-ignore*/}
                    <TouchableOpacity className=" bg-[#223B82] dark:bg-[#0D1F46]"
                        style={styles.btnSize}
                        onPress={() => {
                            Linking.openURL('https://www.instagram.com/upds_tarija/?hl=es');
                        }}>
                        <Image
                            source={require('~/assets/images/pages/instagram.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                    {/*@ts-ignore*/}
                    <TouchableOpacity className=" bg-[#223B82] dark:bg-[#0D1F46]"
                        style={styles.btnSize}
                        onPress={() => {
                            Linking.openURL(
                                'https://es-la.facebook.com/universidadprivadadomingosaviotarija/',
                            );
                        }}>
                        <Image
                            source={require('~/assets/images/pages/facebook.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    {/*@ts-ignore*/}
                    <TouchableOpacity className=" bg-[#223B82] dark:bg-[#0D1F46]"
                        style={styles.btnSize}
                        onPress={() => {
                            Linking.openURL(
                                'https://www.youtube.com/@universidadprivadadomingos3411/videos',
                            );
                        }}>
                        <Image
                            source={require('~/assets/images/pages/youtube.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>


            </ScrollView>
            <View style={{ position: "absolute", bottom: 30, right: 30 }}>
                <TouchableOpacity onPress={compartirNoticia} className='bg-primario p-4 rounded-full' activeOpacity={0.8}>
                    <AntDesign name='sharealt' size={20} color={"#FFF"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productImg: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },// OK
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginTop: 10,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 0,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 100
    },
    statContainer: {
        alignItems: 'center',

    },
    contentSize: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginVertical: 30
    },
    btnSize: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#778899',
        borderWidth: 1,
        marginHorizontal: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default NoticeDetail