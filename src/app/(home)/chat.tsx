import { useCallback } from "react";
import { View } from "react-native";
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
} from "react-native-gifted-chat";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useChat, useThemeColor } from "@/hooks";
import messagin from "@react-native-firebase/messaging";
import { COLORS } from "~/constants";

const ChatScreen = () => {
  {
    const isDarkMode = useThemeColor() === "dark";

    const { data, setData, enviarMensage } = useChat();

    const getInfo = async () => {
      console.log(`DATA DESDE ${await messagin().getToken()}`);
    };

    const newData = [
      {
        _id: 1,
        text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
        createdAt: new Date(),
        quickReplies: {
          type: "radio", // or 'checkbox',

          values: [
            {
              title: "😋 Yes",
              value: "yes",
            },
            {
              title: "📷 Yes, let me show you with a picture!",
              value: "yes_picture",
            },
            {
              title: "😞 Nope. What?",
              value: "no",
            },
          ],
        },
        user: {
          _id: 2,
          name: "React Native",
        },
      },
      {
        _id: 2,
        text: "This is a quick reply. Do you love Gifted Chat? (checkbox)",
        createdAt: new Date(),
        quickReplies: {
          type: "checkbox", // or 'radio',
          values: [
            {
              title: "Yes",
              value: "yes",
            },
            {
              title: "Yes, let me show you with a picture!",
              value: "yes_picture",
            },
            {
              title: "Nope. What?",
              value: "no",
            },
          ],
        },
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ];

    console.log("render");
    const onSend = useCallback((messages = []) => {
      /* @ts-ignore */
      enviarMensage(messages[0].text);

      setData((previousMessages: any) =>
        GiftedChat.append(previousMessages, messages)
      );
    }, []);

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
          optionTintColor="red"
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

    return (
      <View className="bg-white dark:bg-primario-dark flex-1">
        <GiftedChat
          messages={data}
          onQuickReply={(s) => {
            console.log(s);
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
        />
      </View>
    );
  }
};

export default ChatScreen;
