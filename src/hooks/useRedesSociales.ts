import { useState } from 'react';
import { Video } from '@/types';
import { fakeData } from '@/data';
//import { YT_API_KEY, YT_CHANNEL_ID } from "@env"

export const useRedesSociales = () => {
    const [data, setData] = useState<Video[]>([])
    const [nextPageYoutube, setNextPageYoutube] = useState<null | "">(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const YT_API_KEY = "AIzaSyAG1332eXRb1ClLWXgZktFYIKdEUj_UMlQ"
    const YT_CHANNEL_ID = "UCf2Y_ZZGKCje37gLDIbEGzA"

    const getVideosYoutTube = async () => {
        setIsLoading(true)
        try {
           /*  let url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${YT_CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
          
            if (nextPageYoutube) {
                console.log('traendo next page')
                url += `&pageToken=${nextPageYoutube}`
            }

            const response = await fetch(url);
            const data = await response.json();
         
            const videoItems: Video[] = data.items;

            if (videoItems?.length > 0) {
                setNextPageYoutube(data.nextPageToken)
                setData((videos) => [...videos, ...videoItems]);
            } */

            //console.log(data.items)

            await new Promise( (resolve,reject) => {
                setTimeout(() => {  
                    setData(fakeData)
                   
                    resolve(true)
                }, 2000);
            })
        } catch (error) { 
            console.error('Error al obtener los videos:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        data,
        isLoading,
        isError,
        getVideosYoutTube
    }
}