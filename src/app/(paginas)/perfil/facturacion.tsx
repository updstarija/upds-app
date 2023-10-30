import { View, Text, BackHandler, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { Spinner } from '@/components';
import CONSTANTS from 'expo-constants'

const Facturacion = () => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true)
    const { width, height } = Dimensions.get("window")

    const handleBackButtonPress = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
            return true;
        }
        return false;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress
        );


        return () => backHandler.remove();
    }, []);

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



    return (
        <>
            {isLoading ? <View style={{ position: "absolute", height: height - CONSTANTS.statusBarHeight, width, zIndex: 999 }}>
                <Spinner />
            </View> : null}

            <View renderToHardwareTextureAndroid className='flex-1'>
                <WebView
                    ref={webViewRef}
                    forceDarkOn
                    source={{ uri: "https://portal.upds.edu.bo/ClienteFactura/MisDatos" }}
                    onLoad={() => setIsLoading(false)}
                    sharedCookiesEnabled
                    injectedJavaScript={deletePaddingScript}
                    onMessage={(x) => {
                        console.log(x)
                    }}
                />
            </View>
        </>
    )
}

export default Facturacion