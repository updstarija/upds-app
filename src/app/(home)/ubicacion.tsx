import { View, Text, Image, ScrollView, Pressable, Linking } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import WebView from 'react-native-webview'
import { Texto, } from '../../components'
import { useThemeColor } from '@/hooks'
import { openBrowserAsync } from 'expo-web-browser'

const Ubicacion = () => {
    const isDark = useThemeColor() === "dark"
    return (
        <ScrollView className='bg-white dark:bg-primario-dark flex-1'>
            <View className='items-center'>
                {isDark ? (
                    <Image
                        source={require(`~/assets/images/app/logo-dark.png`)}
                        style={{ width: 200, height: 300 }}
                        resizeMode='contain'
                    />
                ) : (
                    <Image
                        source={require(`~/assets/images/app/logo-light.png`)}
                        style={{ width: 200, height: 300 }}
                        resizeMode='contain'
                    />
                )}
            </View>

            <Texto className='text-center p-4 text-2xl dark:text-white' weight='Bold'>NUESTRA UBICACION</Texto>
            <View className='h-96' renderToHardwareTextureAndroid>
                <WebView
                    containerStyle={{ height: 1000 }}
                    sharedCookiesEnabled
                    style={{ height: 1000 }}

                    /* 
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.2030431454186!2d-64.74297862744348!3d-21.536637767364162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x940647dfb7a7d803%3A0x9c955b696d54271a!2sUniversidad%20Privada%20Domingo%20Savio!5e0!3m2!1ses-419!2sbo!4v1693838113371!5m2!1ses-419!2sbo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    */
                    scrollEnabled={false}
                    source={{
                        uri: 'https://www.google.com/maps/place/Universidad+Privada+Domingo+Savio/@-21.5366378,-64.7429786,17.16z/data=!4m6!3m5!1s0x940647dfb7a7d803:0x9c955b696d54271a!8m2!3d-21.5370903!4d-64.7418212!16s%2Fg%2F1tyt6fn2?entry=ttu'
                    }}
                    //source={{ uri: "https://portal.upds.edu.bo/ev-docente/#/ev-est/evaluacion/32255" }}
                    javaScriptEnabled
                />
            </View>

            <View className='flex-1 px-2'>
                <View className='mb-5 mt-10'>
                    <CardUbicacion title='VISIÓN' content='Generar cambios en las personas para desarrollar emprendedores socialmente responsables capaces de responder a desafíos emergentes.' />
                </View>

                <CardUbicacion title='MISIÓN' content='Ser la red de educación universitaria referente a nivel nacional por su formación académica de excelencia basada en la investigación científica y su compromiso con la Internacionalización.' />
                {/*  <View className='px-2 py-7'>
                    <Texto className='text-center py-2 text-2xl' weight='Bold'>NUESTRA VISION</Texto>
                    <Texto className='text-justify text-lg'></Texto>
                </View> */}

                <View className='items-center'>
                    <Pressable onPress={async () => await openBrowserAsync("https://www.360virtualbo.com/tour/educacion/updstarija")}>
                        <Image
                            source={require(`~/assets/images/pages/tour.png`)}
                            style={{ width: 200, height: 300 }}
                            resizeMode='contain'
                        />
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default Ubicacion


interface PropCard {
    title: string, content: string, classNameCard?: string
}
const CardUbicacion: React.FC<PropCard> = ({ content, title, classNameCard }) => {
    return <View className={`p-4 bg-primario dark:bg-secondary-dark rounded-2xl ${classNameCard}`}>
        <Texto className='text-center mb-2 text-2xl text-white' weight='Bold'>{title}</Texto>
        <Texto className='text-justify text-lg text-white'>{content}</Texto>
    </View>
}