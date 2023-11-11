import { useEffect, useState } from 'react';
import { cargarMensajes, sendMessage } from '@/services';
import { useAuthContext } from './useAuthContext';

export interface MensajeParsed {
    _id: string
    text: string
    createdAt: Date,
    user: {
        _id: number,
        avatar: string
    },
}

export const useChat = ({ CHAT_ID }: { CHAT_ID: string | null }) => {
    const [data, setData] = useState<MensajeParsed[]>([])
    const [isLoading, setisLoading] = useState(false)

    const { userAuth, status } = useAuthContext()

    const getMensages = async () => {
        setisLoading(true)
        // const CHAT_ID = userAuth.usuario.documentoIdentidad
        if (CHAT_ID) await cargarMensajes(CHAT_ID, status === "autenticado" ? userAuth.usuario.nombre + " " + userAuth.usuario.apellidoPaterno + " " + userAuth.usuario.apellidoMaterno : userAuth.usuario.nombre, setData)
        setisLoading(false)

    }

    const enviarMensage = async (mensage: string) => {
        // const CHAT_ID = userAuth.usuario.documentoIdentidad
        //console.log(CHAT_ID, "CHAT ID ON SEND")
        if (CHAT_ID) {
            // console.log("ENVIANDO")
            await sendMessage(CHAT_ID, mensage, status === "autenticado" ? userAuth.usuario.nombre + " " + userAuth.usuario.apellidoPaterno + " " + userAuth.usuario.apellidoMaterno : userAuth.usuario.nombre);
        }
    }

    /*   useEffect(() => {
        getMensages()
      }, []) */
    return {
        data,
        isLoading,
        setData,
        getMensages,
        enviarMensage
    }
}