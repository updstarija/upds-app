import { useEffect, useState } from 'react';
import faqService from '@/services/ServiceFaq';
import { useAuthContext } from './useAuthContext';
import { IFaq } from '@/types';


export const useFaq = () => {
    const [data, setData] = useState<IFaq[]>([])
    const [isLoading, setisLoading] = useState(false)

    const getFaqs = async (categoria: string = "") => {
        setisLoading(true)
        //const data = await faqService.getFaqs()
        const responseData = await faqService.getPaginatedFaqs(data.length, categoria)

        setData(responseData)
        console.log(responseData, "XDDDDDDD")
        setisLoading(false)

        return responseData
    }

    /*  useEffect(() => {
         getFaqs()
     }, []) */

    return {
        data,
        isLoading,
        getFaqs,
    }
}