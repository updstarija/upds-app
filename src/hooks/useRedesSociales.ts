import { useState } from 'react';
import { Video } from '@/types';
//import { YT_API_KEY, YT_CHANNEL_ID } from "@env"

export const useRedesSociales = () => {
    const [data, setData] = useState<Video[]>([])
    const [nextPageYoutube, setNextPageYoutube] = useState<null | "">(null)
    const [isLoading, setIsLoading] = useState(true)

    const YT_API_KEY = ""
    const YT_CHANNEL_ID = ""
    const getVideosYoutTube = async () => {
        setIsLoading(true)
        try {
            let url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${YT_CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;
            if (nextPageYoutube) {
                url += `&pageToken=${nextPageYoutube}`
            }
            const response = await fetch(url);
            const data = await response.json();
            //  console.log(data)
            const videoItems: Video[] = data.items;

            if (videoItems?.length > 0) {
                setNextPageYoutube(data.nextPageToken)
                setData((videos) => [...videos, ...videoItems]);
            }

        } catch (error) {
            console.error('Error al obtener los videos:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        data,
        isLoading,
        getVideosYoutTube
    }
}