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
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    document.querySelector('[data-elementor-type="header"]').remove()
    document.querySelector('[data-elementor-type="footer"]').remove()
   const secciones =  document.querySelectorAll('[data-elementor-type="single"] > section')

   secciones[3].scrollIntoView({
    block: 'start' // Puedes ajustar esto según tu preferencia (start, center, end, nearest)
  });


  setTimeout(() => {
    secciones[2].style.display = 'none'
   /*  secciones[0].style.visibility = 'hidden'
  secciones[1].style.visibility = 'hidden'
  secciones[2].style.visibility = 'hidden'
  secciones[4].style.visibility = 'hidden'
  secciones[11].style.visibility = 'hidden'  */

  const xd = document.querySelectorAll('.fa-user-graduate')
xd[0].parentElement.parentElement.parentElement.parentElement.remove()
 xd[1].parentElement.parentElement.parentElement.parentElement.remove()

  }, 2000);






  // const xd = document.querySelectorAll('.fa-user-graduate')
  // xd[0].parentElement.parentElement.parentElement.parentElement.remove()
  // xd[1].parentElement.parentElement.parentElement.parentElement.remove()

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

