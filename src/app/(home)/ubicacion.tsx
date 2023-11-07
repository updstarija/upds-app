import { View, Image, ScrollView, Pressable } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useThemeColor } from '@/hooks'
import { openBrowserAsync } from 'expo-web-browser'
import { Texto } from '@/ui'
import MapUpds from '@/views/MapUpds'
import WebView from 'react-native-webview'

const Ubicacion = () => {
    const isDark = useThemeColor() === "dark"
    return (
        <ScrollView className='bg-white dark:bg-primario-dark flex-1'>
            <View className='max-w-2xl mx-auto w-full'>
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
                {/*   <MapView provider={PROVIDER_GOOGLE}
                    style={{ width: "100%", height: 500 }} /> */}
                {/* <MapUpds /> */}
                <View className='h-96' renderToHardwareTextureAndroid>
                    <WebView
                        containerStyle={{ height: 1000 }}
                        sharedCookiesEnabled
                        style={{ height: 1000 }}

                        geolocationEnabled
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
        <Texto className='text-lg text-white'>{content}</Texto>
    </View>
}