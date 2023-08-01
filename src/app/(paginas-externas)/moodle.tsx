import { View, Text, BackHandler, useColorScheme } from "react-native";
import React, { useEffect, useRef } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";

const Moodle = () => {
  const webViewRef = useRef<WebView>(null);

  const color = useColorScheme();

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

  React.useEffect(() => {
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
      source={{ uri: "https://virtual.upds.edu.bo" }}
      javaScriptEnabled
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default Moodle;
