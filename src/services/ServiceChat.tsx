import firestore from "@react-native-firebase/firestore";
import { Message } from "../types/message";
import { firebase } from "@react-native-firebase/messaging";
import { MensajeParsed } from "../hooks";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { IChatMessage } from "react-native-gifted-chat";

const db = firestore();

export const getChatMessages = async (chatId: string) => {
  if (chatId) {
    const querySnapshot = await db
      .collection("CHATS")
      .doc(chatId)
      .collection("messages")
      .orderBy("date", "desc")
      .get();
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      /* @ts-ignore */
      messages.push({
        id: doc.id,
        message: doc.data().message,
        date: doc.data().date.toDate(),
        isSent: doc.data().isSent,
      });
    });
    return messages;
  }
};

export type MessagePayload = {
  message: string;
  type: "text" | "image" | "video";
  image?: string;
};
export const sendMessage = async (
  chatId: string,
  payload: MessagePayload,
  uname: string
) => {
  try {
    const device =
      Platform.OS === "ios" && !Device.isDevice
        ? ""
        : await firebase.messaging().getToken();

    const newMessage: Message = {
      ...payload,
      isSent: true,
      date: firestore.Timestamp.now(),
      device,
    };

    await firestore().collection(`CHATS`).doc(chatId).set({
      latestMessage: firestore.Timestamp.now(),
      isRead: 0,
      uname,
    });

    await firestore().collection(`CHATS/${chatId}/messages`).add(newMessage);
  } catch (error) {
    console.log(error);
    throw new Error("Error al enviar mensaje");
  }
};

const CHAT_ID = "Bopy07q62FQkCbsaDnV3";

const sendInitialMessage = async (chatId: string, uname: string) => {
  const doc = db.collection("CHATS").doc(chatId);

  //await doc.update({uname: 'HELLO WORLD'});
  const messages = doc.collection("messages").get();

  if ((await messages).empty) {
    doc.set({
      uname,
    });
    const device =
      Platform.OS === "ios" && !Device.isDevice
        ? ""
        : await firebase.messaging().getToken();

    await firestore().collection(`CHATS/${chatId}/messages`).add({
      message:
        "¡Hola! Bienvenido al chat de la Universidad UPDS. ¿En qué podemos ayudarte hoy? ¿Tienes alguna pregunta sobre nuestros programas académicos, proceso de admisión o eventos próximos?",
      isSent: false,
      date: firestore.Timestamp.now(),
      device,
      uname: "UPDS",
    });
  } else {
    doc.update({
      uname,
    });
  }
};

export const cargarMensajes = async (
  chatId: string,
  uname: string,
  setData: Function
) => {
  await sendInitialMessage(chatId, uname);

  const chats = db
    .collection("CHATS")
    .doc(chatId)
    .collection("messages")
    .orderBy("date", "desc");

  chats.onSnapshot((snapShot) => {
    const mensajes = snapShot.docs.map((doc) => ({
      ...(doc.data() as Message & MessagePayload),
      id: doc.id,
    }));

    const mensajesParsed: IChatMessage[] = mensajes.map((msg) => {
      if (msg.type === "image") {
        return {
          _id: msg.id,
          text: msg.message,
          createdAt: msg.date.toDate(),
          user: {
            _id: msg.isSent ? 1 : 2,
            avatar: msg.isSent
              ? ""
              : "https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/324587280_505638334992771_7839182741225428604_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qVtb-s0bTAcAX9nYaHI&_nc_ht=scontent.flpb2-2.fna&oh=00_AfAZwMlQKerguZqryKGMHOCscZxDizeIgCSHAffFmZPQjQ&oe=64893FAB",
          },
          image: msg.image,
        };
      }
      return {
        _id: msg.id,
        text: msg.message,
        createdAt: msg.date.toDate(),
        user: {
          _id: msg.isSent ? 1 : 2,
          avatar: msg.isSent
            ? ""
            : "https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/324587280_505638334992771_7839182741225428604_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qVtb-s0bTAcAX9nYaHI&_nc_ht=scontent.flpb2-2.fna&oh=00_AfAZwMlQKerguZqryKGMHOCscZxDizeIgCSHAffFmZPQjQ&oe=64893FAB",
        },
      };
    });

    setData(mensajesParsed);
  });
};
