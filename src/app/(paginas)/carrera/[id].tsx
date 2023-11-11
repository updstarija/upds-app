import { View, Text, BackHandler, useColorScheme, Dimensions, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import Spinner from "@/components/Spinner";
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
        try {
            webViewRef.current?.goBack()
            return true
        } catch (err) {
            return false
        }
    }


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress)
        };
    }, []);

    const INJECTED_JAVASCRIPT = `
    document.querySelector('[data-elementor-type="header"]').remove()
    document.querySelector('[data-elementor-type="footer"]').remove()
   const secciones =  document.querySelectorAll('[data-elementor-type="single"] > section')

   /* secciones[5].scrollIntoView({
    block: 'start' // Puedes ajustar esto según tu preferencia (start, center, end, nearest)
  }); */


  setTimeout(() => {

    secciones[0].remove()
  secciones[1].remove()
  secciones[2].remove()
  secciones[3].remove()
  secciones[4].remove()
  secciones[11].remove()  

   const xd = document.querySelectorAll('.fa-user-graduate')
xd[0].parentElement.parentElement.parentElement.parentElement.remove()
 xd[1].parentElement.parentElement.parentElement.parentElement.remove() 

  }, 1000);

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
                        injectedJavaScript={INJECTED_JAVASCRIPT}
                        source={{ uri: `https://www.upds.edu.bo/carrera/${id}` }}
                        onMessage={() => { }}
                        onNavigationStateChange={(x) => {
                            console.log(x);
                        }}
                    />
                </View>
            </View>
        </>
    );
};

export default EvaluacionDocente;

