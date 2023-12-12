import { useEffect, useRef, useState } from 'react'
import { View, BackHandler, Alert, useWindowDimensions } from 'react-native'
import WebView from 'react-native-webview'
import CONSTANTS from 'expo-constants'
import { Spinner } from "@/components";

const Facturacion = () => {
    const { width, height } = useWindowDimensions()
    const [isLoading, setIsLoading] = useState(true)
    const [canGoBack, setCanGoBack] = useState(false)

    const webViewRef = useRef<WebView>(null);

    const handleBackButtonPress = () => {
        if (canGoBack) webViewRef?.current?.goBack()
        return canGoBack
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress
        );

        return () => backHandler.remove();
    }, [canGoBack]);

    const deletePaddingScript = `
        const sleep = (ms = 1500) => {
            return new Promise(resolve => {
                setTimeout(resolve, ms)
            })
        }

        const deletePadding = () => {
            const contenido = document.getElementById('contenido')

            if(contenido) {
                contenido.style.setProperty('padding', '70px 10px', 'important');
            }
        }

        (async () => {
               while(!document.getElementById('contenido')){
                await sleep()
               }

               deletePadding()   
        })()
    `

    useEffect(() => {
        Alert.alert("Datos de Facturación", "Aqui podras editar tus datos de facturación")
    }, [])


    return (
        <>
            {isLoading ? <View style={{ position: "absolute", height: height - CONSTANTS.statusBarHeight, width, zIndex: 999 }}>
                <Spinner />
            </View> : null}

            <View renderToHardwareTextureAndroid className='flex-1'>
                <WebView
                    ref={webViewRef}
                    onLoad={(x) => {
                        setIsLoading(false)
                    }}
                    injectedJavaScript={deletePaddingScript}
                    sharedCookiesEnabled
                    source={{ uri: "https://portal.upds.edu.bo/ClienteFactura/MisDatos" }}
                    onMessage={() => { }}
                    onNavigationStateChange={(x) => setCanGoBack(x.canGoBack)}
                />
            </View>
        </>
    )
}

export default Facturacion