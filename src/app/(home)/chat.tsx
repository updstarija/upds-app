import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Composer
} from "react-native-gifted-chat";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthContext, useChat, useThemeColor } from "@/hooks";
import messagin, { firebase } from "@react-native-firebase/messaging";
import { COLORS } from "~/constants";
import { Button, Spinner, TextField, Texto } from "../../components";
import { FontAwesome } from "@expo/vector-icons";
import Modal from 'react-native-modal'
import { useForm } from "react-hook-form";
import { nombreCompleto } from '../../helpers/nombreCompleto';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = () => {
  {
    const isDarkMode = useThemeColor() === "dark";
    const { status, userAuth, setNombreUsuarioNoAuth } = useAuthContext()
    const [chatId, setChatId] = useState<null | string>(userAuth?.usuario?.documentoIdentidad)


    const getTokenDevice = async () => {
      return await firebase.messaging().getToken()
    }

    const { data, setData, enviarMensage, getMensages, isLoading } = useChat({
      CHAT_ID: chatId
    });


    const [visibleModal, setVisibleModal] = useState(false)

    const { control, handleSubmit } = useForm<{ nombreCompleto: "string" }>({ mode: 'onChange' });


    const onSend = useCallback((messages = []) => {
      /* @ts-ignore */
      enviarMensage(messages[0].text);

      setData((previousMessages: any) =>
        GiftedChat.append(previousMessages, messages)
      );
    }, [chatId]);

    const Burbuja = (props: any) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: isDarkMode
                ? COLORS.dark.secondary
                : COLORS.light.background,
            },
            left: {
              backgroundColor: isDarkMode ? "#3b70ff" : "#cccccc49",
            },
          }}
          textStyle={{
            right: {
              color: "#fff",
            },
            left: {
              color: isDarkMode ? "#FFF" : "#000",
            },
          }}
        />
      );
    };

    const Input = (props: any) => {
      return (
        <InputToolbar
          {...props}
          optionTintColor="#fff"
          renderActions={() => <></>}

          renderComposer={(x) => <Composer {...x} textInputStyle={{ color: isDarkMode ? "#FFF" : "#000" }} />}
          containerStyle={{
            backgroundColor: isDarkMode ? COLORS.dark.secondary : "#fff",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderRadius: 25,
            borderWidth: 0.2,
          }}
        />
      );
    };

    const BotonEnviar = (props: any) => {
      return (
        <Send {...props} containerStyle={{ borderWidth: 0 }}>
          <View>
            <Icon
              name="send-circle"
              size={35}
              color={isDarkMode ? "#FFF" : COLORS.light.background}
              style={{ padding: 5 }}
            />
          </View>
        </Send>
      );
    };

    useEffect(() => {

      (async () => {
        if (status === "autenticado") {
          setChatId(userAuth.usuario.documentoIdentidad)
        } else {
          const tokenStorage = await AsyncStorage.getItem("device-token")

          if (tokenStorage) {
            const nombreUsuario = await AsyncStorage.getItem("user-no-auth")
            setNombreUsuarioNoAuth(nombreUsuario)
            setChatId(tokenStorage)
          } else {
            setVisibleModal(true)
          }
        }
      })()
      // console.log("GET MENSAJES")
      // getMensages()

    }, [])

    useEffect(() => {
      if (chatId) getMensages()
    }, [chatId])

    /* useEffect(() => {
      console.log(chatId, "USE EFET")
      if (chatId && chatId.length > 0) {
        if (status === "autenticado") {
          setChatId(userAuth.usuario.documentoIdentidad)
          console.log(chatId)
        } else {
          setVisibleModal(true)
        }
        getMensages()
      }
    }, [chatId]) */


    const setChatIdDevice = async () => {
      const tokenDevice = await getTokenDevice()
      await AsyncStorage.setItem("device-token", tokenDevice)
      setChatId(tokenDevice)
    }

    const onSubmit = async (data: any) => {
      await AsyncStorage.setItem("user-no-auth", data.nombreCompleto)
      setNombreUsuarioNoAuth(data.nombreCompleto)
      setChatIdDevice()
      setVisibleModal(false)
    }

    return (
      <View className="bg-white dark:bg-primario-dark flex-1">
        {isLoading
          ?
          <Spinner />
          :
          <GiftedChat
            messages={data}
            onQuickReply={(s) => {
              // console.log(s);
            }}
            onSend={(messages: any) => onSend(messages)}
            user={{
              _id: 1,
            }}
            infiniteScroll
            alwaysShowSend
            renderSend={BotonEnviar}
            placeholder="Escribe algo..."
            renderBubble={Burbuja}
            renderInputToolbar={Input}
            scrollToBottom
            scrollToBottomComponent={() => <View>
              <FontAwesome name="chevron-down" />
            </View>}
          />
        }

        <Modal isVisible={visibleModal}>
          <View className="bg-white p-4 rounded-lg">
            <Texto className="text-2xl text-center mt-3 mb-4" weight="Bold">Datos Personales</Texto>
            <TextField
              control={control}
              label="Nombre Completo"
              name="nombreCompleto"
              rules={{ required: 'El nombre es obligatorio' }}
            />

            <View className="flex-row items-center justify-between">


              <Button
                classNameBtn="mt-5 rounded-xl bg-white border p-3"
                onPress={() => { router.back() }}
              >
                <Texto className="text-center  text-black ">
                  Cancelar
                </Texto>
              </Button>



              <Button
                classNameBtn="mt-5 rounded-xl bg-primario p-3"
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading} showLoader>
                <Texto className="text-center  text-white ">
                  CONTINUAR
                </Texto>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

export default ChatScreen;
