import { BackHandler, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { Texto } from "@/components";

const Updsnet = () => {
  const webViewRef = useRef<WebView>(null);

  const handleNavigationStateChange = (newNavState: WebViewNavigation) => {
    // Verifica si el WebView puede retroceder o no
    const canGoBack = newNavState.canGoBack;

    // Actualiza el estado de retroceso o realiza otras acciones según sea necesario
    // ...
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
    <WebView
      ref={webViewRef}
      sharedCookiesEnabled
      onNavigationStateChange={handleNavigationStateChange}
      javaScriptEnabled
      source={{ uri: "https://portal.upds.edu.bo/updsnet/5.8/" }}
    />
  );
};

export default Updsnet;
