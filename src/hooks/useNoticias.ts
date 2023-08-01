import { useState } from 'react';
import { INotificacionNotice } from "@/types"
import { getOneNotice, getPaginatedNotice } from '@/services';

export const useNoticias = () => {
    const [data, setData] = useState<INotificacionNotice[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        const response = await getPaginatedNotice(data.length)
        setData(response)
        setIsLoading(false)
    }

    const getOneData = async (id:string)=> {
        setIsLoading(true)
        const response = await getOneNotice(id)
        setIsLoading(false)
       return response
    }

    return {
        data,
        isLoading,
        getData,
        getOneData
    }
}