import { useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { useForm } from "react-hook-form";
import { firebase } from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "~/constants";
import { useAuth, useChat, useThemeColor } from "@/hooks";
import { Button, Spinner, TextField } from "@/components";
import { CustomModal, Texto } from "@/ui";
import { keysStorage } from "@/data/storage/keys";
import Actions from "@/modules/chat/components/actions";

//TODO ADD GUEST USER STORE
const ChatScreen = () => {
  {
    const { status, user, guestUser, setGuestUser } = useAuth();

    const [chatId, setChatId] = useState<null | string>(
      status === "authenticated"
        ? user.documentoIdentidad
        : status === "guest"
        ? guestUser.deviceToken
        : null
    );

    const [sendImage, setSendImage] = useState<string | null>(null);

    const getTokenDevice = async () => {
      return await firebase.messaging().getToken();
    };

    const { data, setData, enviarMensage, getMensages, isLoading } = useChat({
      CHAT_ID: chatId,
    });

    const [visibleModal, setVisibleModal] = useState(false);

    const { control, handleSubmit } = useForm<{ fullName: "string" }>({
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

    const startChat = async () => {
      console.log("🚀 ~ startChat ~ status:", status);
      if (status === "authenticated") {
        setChatId(user.documentoIdentidad);
      } else {
        const { deviceToken, fullName } = guestUser;
        console.log("🚀 ~ startChat ~ guestUser:", guestUser);

        if (deviceToken) setChatId(deviceToken);
        else {
          setVisibleModal(true);
        }
      }
    };

    useEffect(() => {
      startChat();
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

    const onSubmit = async (data: any) => {
      const deviceToken = await getTokenDevice();
      setGuestUser({
        fullName: data.fullName,
        deviceToken,
      });
      setChatId(deviceToken);

      setVisibleModal(false);
    };

    const onSendFromUser = useCallback((messages: any[] = []) => {
      console.log("🚀 ~ onSendFromUser ~ messages:", messages);
      /* const createdAt = new Date();

      const messagesToUpload = messages.map((message) => ({
        ...message,
        user,
        createdAt,
        _id: Math.round(Math.random() * 1000000),
      }));
 */
      //onSend(messagesToUpload)
    }, []);

    const renderActions = useCallback(
      (props: any) =>
        Platform.OS === "web" ? null : (
          <Actions {...props} onSend={onSendFromUser} />
        ),
      [onSendFromUser]
    );

    return (
      <View className="bg-white dark:bg-primario-dark flex-1">
        {isLoading ? (
          <Spinner />
        ) : (
          <GiftedChat
            messages={[
              {
                _id: 6,
                text: "Paris",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "React Native",
                },
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/280px-Paris_-_Eiffelturm_und_Marsfeld2.jpg",
                sent: true,
                received: true,
              },
              {
                _id: 4,
                text: "",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "React Native",
                },
                sent: true,
                received: true,
              },
              ...data,
            ]}
            onQuickReply={(s) => {
              // console.log(s);
            }}
            onSend={(messages: any) => onSend(messages)}
            user={{
              _id: 1,
            }}
            infiniteScroll
            alwaysShowSend
            renderSend={(props) => <BotonEnviar {...props} />}
            placeholder="Escribe algo..."
            renderBubble={(props) => <Burbuja {...props} />}
            renderInputToolbar={(props) => <Input {...props} />}
            renderActions={renderActions}
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
              name="fullName"
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

const Burbuja = (props: any) => {
  const isDark = useThemeColor() === "dark";
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
  const isDark = useThemeColor() === "dark";
  return (
    <InputToolbar
      {...props}
      optionTintColor="#fff"
      renderComposer={(x) => (
        <Composer {...x} textInputStyle={{ color: isDark ? "#FFF" : "#000" }} />
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
  const isDark = useThemeColor() === "dark";
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

export default ChatScreen;
