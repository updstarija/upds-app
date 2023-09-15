import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Pressable, Linking } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser'
import { COLORS } from '~/constants';
import { useThemeColor } from '@/hooks';

const data = [
    {
        id: '1',
        title: 'UPDS NET',
        description: 'Plataforma universitaria académica',
        icon: "language",
        to: '/updsnet',
        link: false,
    },
    {
        id: '2',
        title: 'MULTIPAGOS',
        description: 'Realiza tus pagos de manera rápida y sencilla',
        icon: "dollar",
        to: 'https://multipago.com/service/UPDS/first',
        // to: '/multipagos',
        link: true,
    }
];


const Servicios = () => {
    const isDark = useThemeColor() === "dark"
    return (

        <View className='flex-1 items-center justify-center bg-white  dark:bg-primario-dark'>
            <FlatList
                //  style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={data}
                numColumns={2}
                keyExtractor={item => {
                    return item.id;
                }}
                renderItem={post => {
                    const item = post.item;
                    return (

                        <Link
                            onPress={async (e) => {
                                if (item.link) {
                                    e.preventDefault();
                                    await openBrowserAsync(item.to)
                                    return;
                                }
                            }}

                            //@ts-ignore
                            href={item.to} asChild>
                            <Pressable >
                                <View className={`w-40 rounded-xl border m-3 border-[#223c8266]  bg-white dark:bg-[#0D1F46]  p-4`}
                                    style={{ elevation: 20 }}
                                >
                                    <View className='items-center h-36 justify-center'>
                                        {
                                            item.icon === "dollar"
                                                ?
                                                <>
                                                    <FontAwesome

                                                        //@ts-ignore
                                                        name={item.icon} size={110} color={isDark ? "#FFF" : COLORS.light.background}
                                                    />
                                                </>
                                                :
                                                <MaterialIcons
                                                    //@ts-ignore
                                                    name={item.icon} size={130} color={isDark ? "#FFF" : COLORS.light.background} />
                                        }
                                    </View>

                                    <View >
                                        <Text className="text-md text-center font-extrabold text-black dark:text-white">
                                            {item.title}
                                        </Text>
                                        <Text className="mt-2 text-center text-black dark:text-white">
                                            {item.description}{' '}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        </Link>

                    );
                }}
            />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 10,
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        marginVertical: 8,
        flexBasis: '45%',
        marginHorizontal: 10,
        elevation: 10
    },
    cardContent: {
        paddingVertical: 17,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    cardImage: {
        // height: 150,
        // width: 0,
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
    imageContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        alignItems: 'center',
    },
});



export default Servicios

