import { Texto } from '@/components';
import { LayoutScreen } from '@/layout/LayoutScreen';
import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';

const data = [
    {
        id: '1',
        title: 'MICROSOFT TEAMS ESTUDIANTES',
        description: 'Tutorial del uso de Microsoft Teams para estudiantes',
        image: require('~/assets/images/pages/estudiantes.png'),
        link: 'https://d1fdloi71mui9q.cloudfront.net/w3Cya9FQoKXosQljnSmT_Capacitacion%20-%20Plataformas%20Virtuales%20UPDS%20Oruro.pdf',
    },
    {
        id: '2',
        title: 'MICROSOFT TEAMS MOVIL',
        description: 'Tutorial del uso de Microsoft Teams Movil',
        image: require('~/assets/images/pages/movil.png'),
        link: 'https://d1fdloi71mui9q.cloudfront.net/w3Cya9FQoKXosQljnSmT_Capacitacion%20-%20Plataformas%20Virtuales%20UPDS%20Oruro.pdf',
    },
    {
        id: '3',
        title: 'MICROSOFT TEAMS INVITADO',
        description: 'Tutorial del uso de Microsoft Teams Invitado',
        image: require('~/assets/images/pages/invitado.png'),
        link: 'https://d1fdloi71mui9q.cloudfront.net/w3Cya9FQoKXosQljnSmT_Capacitacion%20-%20Plataformas%20Virtuales%20UPDS%20Oruro.pdf',
    },
    {
        id: '4',
        title: 'PLATAFORMA MOODLE ESTUDIANTES',
        description: 'Tutorial del uso de la plataforma moodle estudiantes',
        image: require('~/assets/images/pages/plataforma.png'),
        link: 'https://d1fdloi71mui9q.cloudfront.net/w3Cya9FQoKXosQljnSmT_Capacitacion%20-%20Plataformas%20Virtuales%20UPDS%20Oruro.pdf',
    },
];

const Tutorial = () => {

    const isIos = Platform.OS == "ios"
    return (
        <LayoutScreen title="Tutoriales">
            <View className='flex-1 items-center justify-center'>
                <FlatList
                    style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={data}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={item => {
                        return item.id;
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={styles.separator} />;
                    }}
                    renderItem={post => {
                        const item = post.item;
                        return (

                            <View className={`rounded-xl border border-[#223c8266]  bg-white dark:bg-[#0D1F46] ${isIos ? "shadow-lg" : ""}`}
                                style={[styles.card]}>
                                <TouchableOpacity onPress={() => {
                                    Linking.openURL(item.link)
                                }}>
                                    <View style={styles.imageContainer}>
                                        <Image style={styles.cardImage} source={item.image} />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text className="text-md text-center font-extrabold text-black dark:text-white">
                                            {item.title}
                                        </Text>
                                        <Text className="mt-2 text-center text-black dark:text-white">
                                            {item.description}{' '}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        );
                    }}
                />
            </View>
        </LayoutScreen>
    );
};

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

export default Tutorial
// import React from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import {globalColors} from '../theme/appTheme';
// import SubscribeCard from 'react-native-subscribe-card';

// // https://www.npmjs.com/package/react-native-subscribe-card

// export const TutorialScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           alignItems: 'center',
//           marginBottom: 10,
//         }}>
//         <Text style={styles.titleTutorials}>TUTORIALES</Text>
//       </View>
//       <ScrollView>
//         <SubscribeCard
//           title="1 year plan"
//           descriptionPrice="$224"
//           description=" billed every year"
//           currency="$"
//           price={12}
//           timePostfix="/mo"
//           onPress={() => {}}
//           style={styles.item}
//         />
//         <SubscribeCard
//           title="1 year plan"
//           descriptionPrice="$224"
//           description=" billed every year"
//           currency="$"
//           price={12}
//           timePostfix="/mo"
//           onPress={() => {}}
//           style={styles.item}
//         />
//         <SubscribeCard
//           title="1 year plan"
//           descriptionPrice="$224"
//           description=" billed every year"
//           currency="$"
//           price={12}
//           timePostfix="/mo"
//           onPress={() => {}}
//           style={styles.item}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontWeight: 'bold',
//     color: globalColors.primary,
//   },
//   item: {
//     // width: '100%',
//     // overflow: 'hidden',
//     // paddingVertical: 10,
//     marginBottom: 5,

//     // marginTop: 2,
//     // backgroundColor: globalColors.primary,
//     // borderRadius: 20,
//     // borderWidth: 1,
//     // borderColor: globalColors.primary,
//   },
//   titleTutorials: {
//     color: globalColors.primary,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });
