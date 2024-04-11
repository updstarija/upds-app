import { useState } from "react";
import { cargarMensajes, sendMessage } from "@/services";
import { nombreCompleto } from "@/helpers";
import { useAuth } from "./useAuth";

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
  const [data, setData] = useState<MensajeParsed[]>([]);
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

  const enviarMensage = async (mensage: string) => {
    // const CHAT_ID = userAuth.usuario.documentoIdentidad
    //console.log(CHAT_ID, "CHAT ID ON SEND")
    if (CHAT_ID) {
      // console.log("ENVIANDO")
      if (status === "authenticated") {
        await sendMessage(CHAT_ID, mensage, nombreCompleto(user));
      } else if (status === "guest") {
        await sendMessage(CHAT_ID, mensage, guestUser.fullName);
      }
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
