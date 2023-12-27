import { useEffect, useRef, useState } from "react";
import { View, BackHandler, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";
import CONSTANTS from 'expo-constants'
import { Spinner } from "@/components";

const Moodle = () => {
  const { width, height } = useWindowDimensions()
  const [isLoading, setIsLoading] = useState(true)
  const [canGoBack, setCanGoBack] = useState(false)

  const webViewRef = useRef<WebView>(null);

  const handleBackButtonPress = () => {
    if (canGoBack) webViewRef?.current?.goBack()
    return canGoBack
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => backHandler.remove();
  }, [canGoBack]);

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
            source={{ uri: "https://virtual.upds.edu.bo" }}
            onMessage={() => { }}
            onNavigationStateChange={(x) => setCanGoBack(x.canGoBack)}
          />
        </View>
      </View>
    </>
  );
};

export default Moodle;