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
    return (
        <>
            {isLoading ? <View style={{ position: "absolute", height: height - CONSTANTS.statusBarHeight, width, zIndex: 999 }}>
                <Spinner />
            </View> : null}

            <View renderToHardwareTextureAndroid className='flex-1'>
                <WebView
                    ref={webViewRef}
                    onLoad={(x) => {
                        console.log("FIN")
                        setIsLoading(false)
                    }}
                    sharedCookiesEnabled
                    cacheEnabled

                    renderError={(s) => <>{ }</>}
                    //source={{ uri: "https://multipago.com/service/UPDS/first" }}
                    source={{ uri: "https://portal.upds.edu.bo/ClienteFactura/MisDatos" }}
                // style={{ height: 500 }}
                />
            </View>
        </>
    )
}

export default Facturacion