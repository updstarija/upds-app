import { View, Text, Platform, Dimensions, BackHandler } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { Spinner, Texto } from '@/components';
import { useAuthContext, useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';
import CONSTANTS from 'expo-constants'

const Multipago = () => {
  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

  const isIos = Platform.OS == "ios"
  const isDark = useThemeColor() === "dark"
  const { width, height } = Dimensions.get("window")

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
    <View className='flex-1'>
      {/* {isLoading ? <View style={{ position: "absolute", height: height - CONSTANTS.statusBarHeight, width, zIndex: 999 }}>
        <Spinner />
      </View> : null}
 */}
      <View renderToHardwareTextureAndroid className='flex-1'>
        <WebView
          ref={webViewRef}
          onLoad={(x) => {
            console.log("FIN")
            setIsLoading(false)
          }}
          sharedCookiesEnabled
          renderError={(s) => <>{ }</>}
          //source={{ uri: "https://multipago.com/service/UPDS/first" }}
          source={{ uri: "https://tarija.upds.edu.bo/testMapa" }}
        // style={{ height: 500 }}
        />
      </View>
    </View>
  )
}

export default Multipago