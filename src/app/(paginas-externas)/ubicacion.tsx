import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview';
import Spinner from '@/components/ui/Spinner';

const Biblioteca = () => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true)

    const handleNavigationStateChange = (newNavState: WebViewNavigation) => {

    };

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
            <WebView
                ref={webViewRef}
                onLoad={(x) => {
                    setIsLoading(false)
                }}
                sharedCookiesEnabled
                // source={{ uri: "https://virtual.upds.edu.bo" }}
                javaScriptEnabled
                source={{ uri: 'https://www.360virtualbo.com/tour/educacion/updstarija' }}
            />

            {isLoading && <View style={{ position: "absolute", top: "50%", left: "50%" }}>
                <Spinner classNameContainer="" />
            </View>}
        </>
    )
}

export default Biblioteca