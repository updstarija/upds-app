import { useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Composer,
  IChatMessage,
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
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useStorage } from "@/modules/shared/hooks/use-storage";
import Toast from "react-native-toast-message";

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

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

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

    const { uploadFileMutation } = useStorage();

    const onSend = useCallback(
      async (messages: IChatMessage[] = []) => {
        let _id = Math.floor(Math.random() * 1000000);

        try {
          if (selectedImages.length) {
            const payload = {
              message: messages[0]?.text,
              type: "image",
              image: selectedImages[0],
            } as const;

            const parsedPayload: IChatMessage = {
              _id,
              text: messages[0]?.text,
              user: {
                _id: 1,
              },
              createdAt: new Date(),
              image: payload.image,
            };

            setSelectedImages([]);

            setData((previousMessages: IChatMessage[]) =>
              GiftedChat.append(previousMessages, [parsedPayload])
            );

            const urlImage = await uploadFileMutation.mutateAsync({
              uri: payload.image,
              folderName: "chat",
            });

            await enviarMensage({
              ...payload,
              image: urlImage,
            });
          } else if (messages[0]?.text) {
            const payload = {
              message: messages[0]?.text,
              type: "text",
            } as const;

            const parsedPayload: IChatMessage = {
              _id,
              text: messages[0]?.text,
              user: {
                _id: 1,
              },
              createdAt: new Date(),
            };

            setData((previousMessages: IChatMessage[]) =>
              GiftedChat.append(previousMessages, [parsedPayload])
            );

            await enviarMensage(payload);
          }
        } catch (e) {
          Toast.show({
            text1: "Error",
            text2: "No se pudo enviar el mensaje, vuelve a intentarlo",
            type: "error",
          });
          setData((previousMessages: IChatMessage[]) =>
            previousMessages.filter((msg) => msg._id !== _id)
          );
        }
        /*   setData((previousMessages: any) =>
          GiftedChat.append(previousMessages, messages)
        ); */
      },
      [chatId, selectedImages]
    );

    const startChat = async () => {
      if (status === "authenticated") {
        setChatId(user.documentoIdentidad);
      } else {
        const { deviceToken, fullName } = guestUser;

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

    const onSendAction = (data: { image: string }[]) => {
      setSelectedImages(data.map((img) => img.image));
    };

    const renderActions = useCallback(
      (props: any) =>
        Platform.OS === "web" ? null : (
          <Actions {...props} onSend={onSendAction} />
        ),
      [onSendAction]
    );

    const renderChatFooter = () => {
      if (!selectedImages.length) return null;

      const removeImage = (uri: string) => {
        setSelectedImages((images) => images.filter((img) => img !== uri));
      };

      return (
        <View className="flex-row items-center  h-full  bg-white dark:bg-secondary-dark px-4 mb-2">
          {selectedImages.map((uri) => (
            <View key={uri} className="relative mr-5 w-full h-60 ">
              <Image source={uri} contentFit="cover" className="h-full" />

              <View className="absolute -top-2 -right-2 bg-white w-8 h-8 rounded-full items-center justify-center">
                <TouchableOpacity onPress={() => removeImage(uri)}>
                  <MaterialCommunityIcons name="close" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    };

    return (
      <View className="bg-white dark:bg-primario-dark flex-1">
        {isLoading ? (
          <Spinner />
        ) : (
          <GiftedChat
            renderChatFooter={renderChatFooter}
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
