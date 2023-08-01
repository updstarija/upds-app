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

export const useChat = () => {
    const [data, setData] = useState<MensajeParsed[]>([])


    const { userAuth } = useAuthContext()
    //TODO: FIX CHAT ID
    const CHAT_ID_TEST = '10651634'

    const getMensages = async () => {
        const CHAT_ID = userAuth.usuario.documentoIdentidad
        await cargarMensajes(CHAT_ID_TEST, userAuth.usuario.nombre + " " + userAuth.usuario.apellidoPaterno + " " + userAuth.usuario.apellidoMaterno, setData)
    }

    const enviarMensage = async (mensage: string) => {
        const CHAT_ID = userAuth.usuario.documentoIdentidad

        await sendMessage(CHAT_ID_TEST, mensage);
    }

    useEffect(() => {
      getMensages()
    }, [])
    return {
        data,
        setData,
        getMensages,
        enviarMensage
    }
}