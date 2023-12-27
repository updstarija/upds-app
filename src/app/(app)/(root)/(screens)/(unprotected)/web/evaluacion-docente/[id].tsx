import { useEffect, useRef, useState } from "react";
import { View, BackHandler, useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Redirect, useLocalSearchParams } from "expo-router";
import CONSTANTS from "expo-constants";
import { Spinner } from "@/components";
import { Texto } from "@/ui";

const EvaluacionDocenteDetail = () => {
  const params = useLocalSearchParams<any>();

  if (!params.id) return <Redirect href={"/moodle"} />;
  const { id } = params;

  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const webViewRef = useRef<WebView>(null);

  const handleBackButtonPress = () => {
    if (canGoBack) webViewRef?.current?.goBack();
    return canGoBack;
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
      <View className="flex-1 bg-white dark:bg-primario-dark">
        {isLoading ? (
          <View
            style={{
              position: "absolute",
              height: height - CONSTANTS.statusBarHeight,
              width,
              zIndex: 999,
            }}
          >
            <Spinner />
          </View>
        ) : null}

        <View renderToHardwareTextureAndroid className="flex-1">
          <WebView
            ref={webViewRef}
            onLoad={(x) => {
              setIsLoading(false);
            }}
            sharedCookiesEnabled
            source={{
              uri: `https://portal.upds.edu.bo/ev-docente/#/ev-est/evaluacion/${id}`,
            }}
            renderError={(e) => (
              <View>
                <Texto>Oh. Ha ocurrido un problema :(</Texto>
                <Texto>Si el problema persiste contactanos</Texto>
              </View>
            )}
            onMessage={() => {}}
            onNavigationStateChange={(x) => setCanGoBack(x.canGoBack)}
          />
        </View>
      </View>
    </>
  );
};

export default EvaluacionDocenteDetail;