import { View, Text, BackHandler, useColorScheme, Dimensions, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import Spinner from "@/components/ui/Spinner";
import { Texto } from "../../../components";
import { Redirect, useLocalSearchParams } from "expo-router";
import CONSTANTS from 'expo-constants';

const EvaluacionDocente = () => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true)

    const params = useLocalSearchParams<any>()

    const { width, height } = useWindowDimensions()

    if (!params.id) return <Redirect href={"/"} />
    const { id } = params

    const handleBackButtonPress = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
            return true; // Indica que el evento ha sido manejado
        }
        return false; // Permite el comportamiento predeterminado de retroceso de la aplicación
    };

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress
        );


        return () => backHandler.remove();
    }, []);

    const INJECTED_JAVASCRIPT = `
    document.querySelector('[data-elementor-type="header"]').remove()
    document.querySelector('[data-elementor-type="footer"]').remove()
   const secciones =  document.querySelectorAll('[data-elementor-type="single"] > section')
   secciones[0].remove()
   secciones[1].remove()
   secciones[2].remove()
   secciones[4].remove()
   secciones[11].remove()

   const xd = document.querySelectorAll('.fa-user-graduate')
   xd[0].parentElement.parentElement.parentElement.parentElement.remove()
   xd[1].parentElement.parentElement.parentElement.parentElement.remove()

    `

    return (
        <>
            <View className='flex-1'>
                {isLoading ? <View style={{ position: "absolute", height: height - CONSTANTS.statusBarHeight, width, zIndex: 999 }}>
                    <Spinner />
                </View> : null}


                <View renderToHardwareTextureAndroid className='flex-1'>
                    <WebView
                        ref={webViewRef}
                        onLoad={(x) => {
                            setIsLoading(false)
                        }}
                        sharedCookiesEnabled
                        cacheEnabled
                        injectedJavaScript={INJECTED_JAVASCRIPT}
                        source={{ uri: `https://www.upds.edu.bo/carrera/${id}` }}
                        javaScriptEnabled
                        onMessage={() => { }}
                    />
                </View>
            </View>
            {/*  <WebView
                ref={webViewRef}
                onLoad={(x) => {
                    setIsLoading(false)
                }}
                sharedCookiesEnabled
                injectedJavaScript={INJECTED_JAVASCRIPT}
                source={{ uri: `https://www.upds.edu.bo/carrera/${id}` }}
                javaScriptEnabled
                onMessage={() => { }}
            />

            {isLoading && <View style={{ position: "absolute", top: "50%", left: "50%" }}>
                <Spinner classNameContainer="" />
            </View>} */}
        </>
    );
};

export default EvaluacionDocente;

