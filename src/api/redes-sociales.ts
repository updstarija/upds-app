import { IResponseFacebook, IResponseInstagram, IResponseYoutbe } from "@/types";
import axios from "axios";
import tokenService from '@/services/ServiceTokens'


const YT_API_KEY = "AIzaSyAG1332eXRb1ClLWXgZktFYIKdEUj_UMlQ"
const YT_CHANNEL_ID = "UCf2Y_ZZGKCje37gLDIbEGzA"
//https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD

const ACCESS_TOKEN = {
    INSTRAGRAM: "IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD",
    FACEBOOK: "EAAIzTHSY74wBOwkQxsZBRrDYEao6jS3DEd3WB0Bur6UgKngmYgTjAbhVpD4Oy4XgDDlpXtvqm3iyrpdbdOX4a44dGmtxYOfYS3qqqBZBEBE9ZAq5Cc5xvKJKSENSXhebVKY8rXjtJPTDyfIYWAtPvzERvFk2CV6T32Rm6RgZAYDF6yWrYySRBe5uRuS2adA2X41S9XSRyZB7tgEfN",
}

const API_URLS = {
    INSTAGRAM: `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=6&access_token=`,
    INSTAGRAMV2: `https://graph.facebook.com/v18.0/17841402381740376/media?fields=caption%2Cmedia_url%2Cmedia_product_type%2Clike_count%2Cthumbnail_url%2Cpermalink%2Cmedia_type&limit=6&access_token=`,
    FACEBOOK: `https://graph.facebook.com/v18.0/me/feed?fields=id%2Cmessage%2Ccreated_time%2Cpermalink_url%2Cshares%2Creactions%2Cfull_picture&limit=6&access_token=`,
    YOUTUBE: `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${YT_CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`
}



export const getVideosYoutube = async () => {
    const { data } = await axios<IResponseYoutbe>(API_URLS.YOUTUBE);
    return data
}

export const getFacebookPost = async () => {
    const token = await tokenService.getToken("facebook")
    const { data } = await axios<IResponseFacebook>(API_URLS.FACEBOOK + token);
    return data
}

export const getInstagramPost = async () => {
    const token = await tokenService.getToken("instagram")
    const { data } = await axios<IResponseInstagram>(API_URLS.INSTAGRAMV2 + token);
    return data
}

