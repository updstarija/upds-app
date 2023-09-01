import { View, Text, BackHandler, useColorScheme, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import Spinner from "@/components/ui/Spinner";
import { Texto } from "../../../components";
import { Redirect, useLocalSearchParams } from "expo-router";

const EvaluacionDocente = () => {
    const params = useLocalSearchParams<any>()

    if (!params.id) return <Redirect href={"/moodle"} />
    const { id } = params

    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true)

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

    const height = Dimensions.get("window").height

    console.log(id)
    return (
        <>
            <WebView
                ref={webViewRef}
                onLoad={(x) => {
                    setIsLoading(false)
                }}
                className="bg-primario-dark"
                sharedCookiesEnabled
                source={{ uri: `https://virtual.upds.edu.bo/course/view.php?id=${id}` }}
                renderError={(e) => (
                    <>
                        <Texto>Oh. Ha ocurrido un problema :(</Texto>
                        <Texto>Si el problema persiste contactanos</Texto>
                    </>
                )}
                onNavigationStateChange={handleNavigationStateChange}
            />

            {isLoading && <View style={{ position: "absolute", top: "50%", left: "50%" }}>
                <Spinner classNameContainer="" />
            </View>}
        </>
    );
};

export default EvaluacionDocente;
