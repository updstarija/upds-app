import { useQuery } from '@tanstack/react-query';
import { getFacebookPost, getInstagramPost, getVideosYoutube } from '@/api';

const YT_API_KEY = "AIzaSyAG1332eXRb1ClLWXgZktFYIKdEUj_UMlQ"
const YT_CHANNEL_ID = "UCf2Y_ZZGKCje37gLDIbEGzA"
//https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD

const ACCESS_TOKEN = {
    INSTRAGRAM: "IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD",
    FACEBOOK: "EAAIzTHSY74wBOwkQxsZBRrDYEao6jS3DEd3WB0Bur6UgKngmYgTjAbhVpD4Oy4XgDDlpXtvqm3iyrpdbdOX4a44dGmtxYOfYS3qqqBZBEBE9ZAq5Cc5xvKJKSENSXhebVKY8rXjtJPTDyfIYWAtPvzERvFk2CV6T32Rm6RgZAYDF6yWrYySRBe5uRuS2adA2X41S9XSRyZB7tgEfN",
    FACEBOOK_PERMANENT: "EAANtLRpy09cBO34OD1hVlKoGKogwyZC5GSLDHwb2k3QHE0OyiNCbLnNQN4kpoCw2jV8VTcgIZAeGCuCijZALjMNwkaTL9tyFSzobvbUyMzHssZBaJRqeZBBIXEjvZBMPqf4sfdCzFART2wvz128DOL7GFfhQXZALoXzablqVcrOG33Fsv3gwyEHYlYypftP4hemZA3AezTZCj1Lwr3lz8zGakYriCwpHyhojLAg4KYoUh",
    FACEBOOK_PERMANENT2: "EAAIzTHSY74wBOZC2ST5NZASdliNZCffA1r1w3GxdzxWNAE5D5WQZB6gMZCGWCMkYXmmPUpOqisgaHvhc7RfTbkxH4fnXEtr1HWZBdZC32GwKIKvrR1Cx68brHn4ZB3wWEkbQh48hP97nvwD4kvTvZB1LeY8ZAMv6LoNs5P8ZBb1f2vwnZBVz4dzT0t1Cpl3nwLWXsuGgDYZAHefoB8HxVBadx",
}

const API_URLS = {
    INSTAGRAM: `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=6&access_token=${ACCESS_TOKEN.INSTRAGRAM}`,
    FACEBOOK: `https://graph.facebook.com/v17.0/me/feed?fields=id%2Cmessage%2Ccreated_time%2Cpermalink_url%2Cshares%2Creactions%2Cfull_picture&limit=6&access_token=${ACCESS_TOKEN.FACEBOOK}`,
    YOUTUBE: `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${YT_CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`
}


export const useRedesSociales = () => {

    const youtubeQuery = useQuery(
        ['youtube-data'],
        () => getVideosYoutube(),
        {
            staleTime: 10000 * 60,
        }
    )

    const facebookQuery = useQuery(
        ['facebook-data'],
        () => getFacebookPost(),
        {
            staleTime: 10000 * 60,
        }
    )

    const instagramQuery = useQuery(
        ['instagram-data'],
        () => getInstagramPost(),
        {
            staleTime: 10000 * 60,
        }
    )
    return {
        youtubeQuery,
        facebookQuery,
        instagramQuery
    }
}

