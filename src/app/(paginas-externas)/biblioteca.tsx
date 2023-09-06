import { View, Text, Platform, Dimensions, BackHandler } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { Spinner, Texto } from '@/components';
import { useAuthContext, useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';
import CONSTANTS from 'expo-constants'

const Biblioteca = () => {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

    const isIos = Platform.OS == "ios"
    const isDark = useThemeColor() === "dark"
    const { width, height } = Dimensions.get("window")
    const [isLoadingSession, setIsLoadingSession] = useState(true)
    const [isLoadingWeb, setIsLoadingWeb] = useState(true)
    const webViewRef = useRef<WebView>(null);


    const { userAuth: { usuario: { emailOffice365 } } } = useAuthContext()

    const [urlELibro, setUrlELibro] = useState("")

    const getSessionElibro = async () => {
        const dataTokens = await fetch("https://portal.upds.edu.bo/gapi/request/service/?path=updsnet/access/infoelibro/2")
        const accessTokens = await await dataTokens.json()

        const secret = accessTokens?.find((x: any) => x.Nombre === 'ELIBRO_SECRET')?.ValorCadena
        const channel_id = accessTokens?.find((x: any) => x.Nombre === 'ELIBRO_CHANNEL_ID')?.ValorCadena

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Token a70f0600234c22e6caf12e75df3e254f7fd2a1dc");

        const raw = JSON.stringify({
            secret,
            channel_id,
            user: emailOffice365 || "tj.user.cualquiera@upds.net.bo"
        });

        const requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const dataElibro = await fetch("https://auth.elibro.net/auth/sso/", requestOptions)
        const responseELibro = await dataElibro.json()
        setUrlELibro(responseELibro.url)
        console.log(responseELibro.url)
        setIsLoadingSession(false)
    }

    useEffect(() => {
        getSessionElibro()
    }, [])




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
        <View className='flex-1'>
            {!isLoadingSession && isLoadingWeb ? <View style={{ position: "absolute", height: height - CONSTANTS.statusBarHeight, width, zIndex: 999 }}>
                <Spinner />
            </View> : null}

            {isLoadingSession
                ? <Spinner />
                :
                <View renderToHardwareTextureAndroid className='flex-1'>
                    <WebView
                        ref={webViewRef}
                        sharedCookiesEnabled
                        scalesPageToFit={!isIos ? false : true}
                        injectedJavaScript={INJECTEDJAVASCRIPT}
                        scrollEnabled
                        cacheEnabled
                        onLoad={(x) => {
                            console.log("LOAD")
                            setIsLoadingWeb(false)
                        }}
                        style={{ backgroundColor: isDark ? COLORS.dark.background : "#FFF" }}
                        source={{ uri: urlELibro }}
                    />
                </View>}
        </View>
    )
}

export default Biblioteca