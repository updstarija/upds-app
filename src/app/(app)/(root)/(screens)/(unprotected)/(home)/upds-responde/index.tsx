import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { useForm } from "react-hook-form";
import Modal from "react-native-modal";
import { firebase } from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "~/constants";
import { useAuthContext, useChat, useThemeColor } from "@/hooks";
import { Button, Spinner, TextField } from "@/components";
import { CustomModal, Texto } from "@/ui";
import { keysStorage } from "@/data/storage/keys";
import { TextInput } from "react-native-gesture-handler";

const ChatScreen = () => {
  {
    const isDark = useThemeColor() === "dark";

    const { status, user, setNameGuestUser } = useAuthContext();

    const [chatId, setChatId] = useState<null | string>(
      user.documentoIdentidad
    );

    const getTokenDevice = async () => {
      return await firebase.messaging().getToken();
    };

    const { data, setData, enviarMensage, getMensages, isLoading } = useChat({
      CHAT_ID: chatId,
    });

    const [visibleModal, setVisibleModal] = useState(false);

    const { control, handleSubmit } = useForm<{ nombreCompleto: "string" }>({
      mode: "onChange",
    });

    const onSend = useCallback(
      (messages = []) => {
        /* @ts-ignore */
        enviarMensage(messages[0].text);

        setData((previousMessages: any) =>
          GiftedChat.append(previousMessages, messages)
        );
      },
      [chatId]
    );

    const Burbuja = (props: any) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: isDark
                ? COLORS.dark.secondary
                : COLORS.light.background,
            },
            left: {
              backgroundColor: isDark ? "#3b70ff" : "#cccccc49",
            },
          }}
          textStyle={{
            right: {
              color: "#fff",
            },
            left: {
              color: isDark ? "#FFF" : "#000",
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
          renderComposer={(x) => (
            <Composer
              {...x}
              textInputStyle={{ color: isDark ? "#FFF" : "#000" }}
            />
          )}
          containerStyle={{
            backgroundColor: isDark ? COLORS.dark.secondary : "#fff",
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
            <MaterialCommunityIcons
              name="send-circle"
              size={35}
              color={isDark ? "#FFF" : COLORS.light.background}
              style={{ padding: 5 }}
            />
          </View>
        </Send>
      );
    };

    useEffect(() => {
      (async () => {
        if (status === "authenticated") {
          setChatId(user.documentoIdentidad);
        } else {
          const tokenStorage = await AsyncStorage.getItem(
            keysStorage.DEVICE_TOKEN
          );

          // console.log(tokenStorage);

          if (tokenStorage) {
            const nameGuestUser = await AsyncStorage.getItem(
              keysStorage.GUEST_USER_NAME
            );
            setNameGuestUser(nameGuestUser || "GUEST_USER");
            setChatId(tokenStorage);
          } else {
            setVisibleModal(true);
          }
        }
      })();
      // console.log("GET MENSAJES")
      // getMensages()
    }, []);

    useEffect(() => {
      if (chatId) getMensages();
    }, [chatId]);

    /* useEffect(() => {
      //console.log(chatId, "USE EFET")
      if (chatId && chatId.length > 0) {
        if (status === "autenticado") {
          setChatId(user.usuario.documentoIdentidad)
          //console.log(chatId)
        } else {
          setVisibleModal(true)
        }
        getMensages()
      }
    }, [chatId]) */

    const setChatIdDevice = async () => {
      const deviceToken = await getTokenDevice();
      await AsyncStorage.setItem(keysStorage.DEVICE_TOKEN, deviceToken);
      setChatId(deviceToken);
    };

    const onSubmit = async (data: any) => {
      console.log(22222222);
      await AsyncStorage.setItem(
        keysStorage.GUEST_USER_NAME,
        data.nombreCompleto
      );
      setNameGuestUser(data.nombreCompleto);
      setChatIdDevice();
      setVisibleModal(false);
    };

    return (
      <View className="bg-white dark:bg-primario-dark flex-1">
        {isLoading ? (
          <Spinner />
        ) : (
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
            scrollToBottomComponent={() => (
              <View>
                <FontAwesome name="chevron-down" />
              </View>
            )}
          />
        )}

        <CustomModal isVisible={visibleModal}>
          <View className="bg-white dark:bg-secondary-dark p-4 rounded-lg">
            <Texto
              className="text-2xl dark:text-white text-center mt-3 mb-4"
              weight="Bold"
            >
              Datos Personales
            </Texto>
            <TextField
              control={control}
              label="Nombre Completo"
              name="nombreCompleto"
              rules={{ required: "El nombre es obligatorio" }}
            />
            {/*  <TextInput /> */}
            <View className="flex-row items-center justify-between">
              <Button
                classNameBtn="mt-5 rounded-xl bg-white border p-3"
                onPress={() => {
                  router.back();
                }}
              >
                <Texto className="text-center  text-black ">Cancelar</Texto>
              </Button>
              <Button
                classNameBtn="mt-5 rounded-xl bg-primario p-3"
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                showLoader
              >
                <Texto className="text-center  text-white ">CONTINUAR</Texto>
              </Button>
            </View>
          </View>
        </CustomModal>
      </View>
    );
  }
};

export default ChatScreen;
