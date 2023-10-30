import { View, Text, BackHandler, useColorScheme, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import Spinner from "@/components/ui/Spinner";
import { Texto } from "../../../components";

const Moodle = () => {
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

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );


    return () => backHandler.remove();
  }, []);

  const height = Dimensions.get("window").height

  return (
    <>
      <WebView
        ref={webViewRef}
        onLoad={(x) => {
          setIsLoading(false)
        }}
        sharedCookiesEnabled
        // injectedJavaScript="alert(2)"
        source={{ uri: "https://virtual.upds.edu.bo" }}
        //source={{ uri: "https://portal.upds.edu.bo/ev-docente/#/ev-est/evaluacion/32255" }}
        javaScriptEnabled
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={() => { }}
      />

      {isLoading && <View style={{ position: "absolute", top: "50%", left: "50%" }}>
        <Spinner classNameContainer="" />
      </View>}
    </>
  );
};

export default Moodle;
