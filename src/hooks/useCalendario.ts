import { useEffect, useState } from 'react';
import { getEventosCalendario } from '@/services';
import { useAuthContext } from './useAuthContext';
import { ICalendarioAcademico } from '@/types';


export const useCalendario = ({ gestion = "" }: { gestion?: string }) => {
    const [data, setData] = useState<ICalendarioAcademico[]>([])
    const [isLoading, setisLoading] = useState(false)


    const getEventos = async () => {
        setisLoading(true)
        const data = await getEventosCalendario()
        setData(data)

        setisLoading(false)
    }

    useEffect(() => {
        getEventos()
    }, [])

    return {
        data,
        isLoading,
        getEventos,
    }
}