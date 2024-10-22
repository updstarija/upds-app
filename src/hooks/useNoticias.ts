import { useState } from 'react';
import { INotificacionNotice } from "@/types"
import { getOneNotice, getPaginatedNotice } from '@/services';
import noticeService from '@/services/ServiceNotice';

export const useNoticias = () => {
    const [data, setData] = useState<INotificacionNotice[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async (categoria: string = "") => {
        setIsLoading(true)
        const response = await getPaginatedNotice(data.length, categoria)
        setData(response)
        setIsLoading(false)
        return response
    }

    const getOneData = async (id: string) => {
        setIsLoading(true)
        const response = await getOneNotice(id)
        //setIsLoading(false)
        return response
    }


    const getPriorityNotices = async () => {
        setIsLoading(true)
        const response = await noticeService.getTopPriority()
        setData(response.slice(0, 3))
        setIsLoading(false)
        return response
    }



    return {
        data,
        setIsLoading,
        isLoading,
        getData,
        getOneData,
        getPriorityNotices
    }
}