import { BackHandler, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import Spinner from "@/components/Spinner";

const Updsnet = () => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true)

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
