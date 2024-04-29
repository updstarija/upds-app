import { useState } from "react";
import { MessagePayload, cargarMensajes, sendMessage } from "@/services";
import { nombreCompleto } from "@/helpers";
import { useAuth } from "./useAuth";
import { IChatMessage } from "react-native-gifted-chat";

export interface MensajeParsed {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    avatar: string;
  };
}

export const useChat = ({ CHAT_ID }: { CHAT_ID: string | null }) => {
  const [data, setData] = useState<IChatMessage[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const { user, status, guestUser } = useAuth();

  const getMensages = async () => {
    //  setisLoading(true);
    // const CHAT_ID = userAuth.usuario.documentoIdentidad
    console.log("🚀 ~ getMensages ~ CHAT_ID:", {
      CHAT_ID,
      status,
      user: user.nombre,
    });

    if (CHAT_ID) {
      if (status === "authenticated") {
        await cargarMensajes(CHAT_ID, nombreCompleto(user), setData);
      } else if (status === "guest") {
        await cargarMensajes(CHAT_ID, guestUser.fullName, setData);
      }
    }
    // setisLoading(false);
  };

  const enviarMensage = async (payload: MessagePayload) => {
    // const CHAT_ID = userAuth.usuario.documentoIdentidad
    //console.log(CHAT_ID, "CHAT ID ON SEND")
    try {
      if (CHAT_ID) {
        // console.log("ENVIANDO")
        if (status === "authenticated") {
          await sendMessage(CHAT_ID, payload, nombreCompleto(user));
        } else if (status === "guest") {
          await sendMessage(CHAT_ID, payload, guestUser.fullName);
        }
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  /*   useEffect(() => {
        getMensages()
      }, []) */
  return {
    data,
    isLoading,
    setData,
    getMensages,
    enviarMensage,
  };
};
