import { useEffect, useRef, useState } from "react";
import { BackHandler, View, useWindowDimensions } from "react-native";
import WebView from "react-native-webview";
import CONSTANTS from "expo-constants";
import { Spinner } from "@/components";

const Updsnet = () => {
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

  const injectedJavascript = `
 /*  document.addEventListener('DOMContentLoaded', () => {
    const modalBanner = document.querySelector('#modal-id-banner > div > div > div.modal-header > button') 
    modalBanner.click()
    
    const buttonRegisterPage = document.querySelector('a[data-url="https://portal.upds.edu.bo/updsnet/5.8//home/registromateria"]') 
    buttonRegisterPage.click()
    
    const buttonRegisterMateria = document.getElementById('btn-float-register') 
    buttonRegisterMateria.click()
    
    
    const contentRegisterMateria = document.querySelector('#modal-register-materia > div') 
    contentRegisterMateria.style.margin = '0'
    
    const btnCloseModal = document.querySelector('#modal-register-materia > div > div > div.panel-heading > button')
    btnCloseModal?.remove()
    
    const modalRegisterMateria2 = document.querySelector('#modal-register-materia > div > div')   
    modalRegisterMateria2.style.minHeight = '100vh'
  }) */

  const selectors = {
    BANNER: "#modal-id-banner > div > div > div.modal-header > button",
    LINK_REGISTER:
      'a[data-url="https://portal.upds.edu.bo/updsnet/5.8//home/registromateria"]',
    BTN_FLOAT_REGISTER: "#btn-float-register",
    MODAL_REGISTER: "#modal-register-materia > div",
    MODAL_REGISTER_BODY: "#modal-register-materia > div > div",
    BTN_CLOSE_MODAL:
      "#modal-register-materia > div > div > div.panel-heading > button",
  };
  const sleep = (ms = 1000) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  
  const closeBanners = () => {
    const contenido = document.querySelector(selectors.BANNER);
  
    if (contenido) {
      contenido.click();
      contenido.remove();
    }
  };
  
  const toRegisterPage = () => {
    const contenido = document.querySelector(selectors.LINK_REGISTER);
  
    if (contenido) {
      contenido.click();
      contenido.remove();
    }
  };
  
  const openModalRegister = () => {
    const contenido = document.querySelector(selectors.BTN_FLOAT_REGISTER);
  
    if (contenido) {
      contenido.click();
      contenido.remove();
    }
  };
  
  const changeStyleModalRegister = () => {
    const btnCloseModal = document.querySelector(selectors.BTN_CLOSE_MODAL);
    btnCloseModal?.remove();
  
    const contentRegisterMateria = document.querySelector(
      selectors.MODAL_REGISTER
    );
    contentRegisterMateria.style.margin = "0";
  
    const modalRegisterMateriaBody = document.querySelector(
      selectors.MODAL_REGISTER_BODY
    );
    modalRegisterMateriaBody.style.minHeight = "100vh";
  };
  
  const comprobe = async () => {
    let comprobeBanner = setInterval(() => {
      if (document.querySelector(selectors.BANNER)) {
        closeBanners();
        clearInterval(comprobeBanner);
      }
    }, 3000);
  
    while (!document.querySelector(selectors.LINK_REGISTER)) {
      await sleep();
    }
  
    toRegisterPage();
  
    while (!document.querySelector(selectors.BTN_FLOAT_REGISTER)) {
      await sleep();
    }
  
    openModalRegister();
  
    while (!document.querySelector(selectors.MODAL_REGISTER)) {
            await sleep();
          }
        
          changeStyleModalRegister();
  };
  
  comprobe();
  
 
  `;
  return (
    <>
      <View className="flex-1">
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
            source={{ uri: "https://portal.upds.edu.bo/updsnet/5.8/" }}
            onMessage={(x) => {
              console.log(x);
            }}
            onNavigationStateChange={(x) => setCanGoBack(x.canGoBack)}
            injectedJavaScript={injectedJavascript}
          />
        </View>
      </View>
    </>
  );
};

export default Updsnet;
