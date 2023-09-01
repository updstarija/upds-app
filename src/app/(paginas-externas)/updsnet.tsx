import { BackHandler, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { Texto } from "@/components";
import Spinner from "@/components/ui/Spinner";

const Updsnet = () => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true)

  const handleNavigationStateChange = (newNavState: WebViewNavigation) => {

  };

  const handleBackButtonPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // Indica que el evento ha sido manejado
    }
    return false; // Permite el comportamiento predeterminado de retroceso de la aplicación
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
        //source={{ uri: "https://portal.upds.edu.bo/ev-docente/#/ev-est/evaluacion/32255" }}
        javaScriptEnabled
        source={{ uri: "https://portal.upds.edu.bo/updsnet/5.8/" }}
        renderError={(s) => <>{ }</>}
      />

      {isLoading && <View style={{ position: "absolute", top: "50%", left: "50%" }}>
        <Spinner classNameContainer="" />
      </View>}
    </>
  );
};

export default Updsnet;
