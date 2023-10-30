import { useState } from 'react';
import { IResponseInstagram, IResponseYoutbe, IYoutubePost, Video } from '@/types';
import { fakeData } from '@/data';
import { sleep } from '@tanstack/query-core/build/lib/utils';
//import { YT_API_KEY, YT_CHANNEL_ID } from "@env"
import { getThumbnailAsync } from 'expo-video-thumbnails'
import { IResponseFacebook } from '../types/responses/facebook';

const YT_API_KEY = "AIzaSyAG1332eXRb1ClLWXgZktFYIKdEUj_UMlQ"
const YT_CHANNEL_ID = "UCf2Y_ZZGKCje37gLDIbEGzA"
//https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD

const ACCESS_TOKEN = {
    INSTRAGRAM: "IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD",
    FACEBOOK: "EAANtLRpy09cBO9XnFRUXMyqXEFGffq8ZAmO2ll5XMTidf5nCFFvRhvMQVZCZAWZB1ecLWv7svtEdaueKtGwA8ZByIww9lak7Iy3amxswJuGLwBZCS6O9dGZBAZAeIxKUEM3kPu5wcZBWWvxiWSIorJHBKEXXbpI3s3hUbShTeorh1fGLGKVZCLmZBYz5SPdz3ZCLOTS3AiiazmQ58xRqCxLT7c29evNV7iniGZByqdXUtsdjy"
}

const API_URLS = {
    INSTAGRAM: `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=6&access_token=${ACCESS_TOKEN.INSTRAGRAM}`,
    FACEBOOK: `https://graph.facebook.com/v17.0/me/feed?fields=id%2Cmessage%2Ccreated_time%2Cpermalink_url%2Cshares%2Creactions%2Cfull_picture&access_token=${ACCESS_TOKEN.FACEBOOK}`,
    YOUTUBE: `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${YT_CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`
}


export const useRedesSociales = <T>(initialData: T) => {
    const [data, setData] = useState<T>(initialData)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)



    const getVideosYoutTube = async () => {
        setIsLoading(true)
        setIsError(false)

        try {
            /* const response = await fetch(API_URLS.YOUTUBE);
            const datosYoutube: T = await response.json(); */
            setData(youtubeMock as T)

            return youtubeMock
        } catch (error) {
            setIsError(true)
            console.error('Error al obtener los videos:', error);
        } finally {
            setIsLoading(false)
        }
    }

    const getFacebookPosts = async () => {
        setIsLoading(true)
        setIsError(false)

        try {
            /*   const response = await fetch(API_URLS.FACEBOOK);
              const datosFacebook: T = await response.json(); */

            setData(facebookMock as T)

            return facebookMock
        } catch (error) {
            setIsError(true)
            console.error('Error al obtener los videos:', error);
        } finally {
            setIsLoading(false)
        }
    }


    const getInstagramPosts = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            /*  const response = await fetch(API_URLS.INSTAGRAM);
             const datosInsta: IResponseInstagram = await response.json(); */
            /*  console.log(4)
             const x = datosInsta.data.map(async (ig) => {
                 if (ig.media_type === "VIDEO") {
                     return {
                         ...ig,
                         miniatura: await getThumbnailAsync(ig.media_url, { time: 1500 })
                     }
                 }
 
                 return {
                     ...ig,
                     miniatura: {
                         uri: ig.media_url
                     }
                 }
             })
             const data = await Promise.all(x) */

            setData(instaMockup as T)
            // setData(instaMockup as T)

            return instaMockup
        } catch (error) {
            setIsError(true)
            console.error('Error al obtener los videos:', error);
        } finally {
            setIsLoading(false)
        }
    }
    return {
        data,
        isLoading,
        isError,
        getVideosYoutTube,
        getInstagramPosts,
        getFacebookPosts
    }
}

const youtubeMock: IResponseYoutbe = {
    "kind": "youtube#searchListResponse",
    "etag": "zsYabDc8LZ8GosZjtFopTIWHqxM",
    "nextPageToken": "CAoQAA",
    "regionCode": "BO",
    "pageInfo": {
        "totalResults": 1133,
        "resultsPerPage": 10
    },
    "items": [
        {
            "kind": "youtube#searchResult",
            "etag": "TpBniPIJ6_d2euf9EjZFIypfxVk",
            "id": {
                "kind": "youtube#video",
                "videoId": "JLUS26mbU9U"
            },
            "snippet": {
                "publishedAt": "2023-10-25T22:47:57Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "ZAFARI UPDS",
                "description": "",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/JLUS26mbU9U/default_live.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/JLUS26mbU9U/mqdefault_live.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/JLUS26mbU9U/hqdefault_live.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "upcoming",
                "publishTime": "2023-10-25T22:47:57Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "IUpC372VAoRfkdGspB42o0FJFXo",
            "id": {
                "kind": "youtube#video",
                "videoId": "1PbMsFQyQf0"
            },
            "snippet": {
                "publishedAt": "2023-10-20T20:08:00Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "EXPO UPDS 2023",
                "description": "Estas a punto de ser Bachiller? ¡Esto te interesa! Expo UPDS 2023, un evento que te permitirá explorar el mundo de las carreras ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/1PbMsFQyQf0/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/1PbMsFQyQf0/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/1PbMsFQyQf0/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-20T20:08:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "pT2stM4OsknbwYuw4ndN64MsO6Y",
            "id": {
                "kind": "youtube#video",
                "videoId": "YIT1v7m2QFA"
            },
            "snippet": {
                "publishedAt": "2023-10-17T15:30:50Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "Acto de Colación XVI",
                "description": "",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/YIT1v7m2QFA/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/YIT1v7m2QFA/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/YIT1v7m2QFA/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-17T15:30:50Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "vsLzP5GZfeVrBDOv0-Zt1mrg45E",
            "id": {
                "kind": "youtube#video",
                "videoId": "3erZtWV7p84"
            },
            "snippet": {
                "publishedAt": "2023-10-12T15:15:03Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "SAMUEL DORIA MEDINA",
                "description": "Samuel Doria Medina, un líder empresarial destacado, visitó el Campus de la #UPDSTarija para impartir la conferencia magistral ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/3erZtWV7p84/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/3erZtWV7p84/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/3erZtWV7p84/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-12T15:15:03Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "U5c50_uNFAeg3H2qthc2qGcpaus",
            "id": {
                "kind": "youtube#video",
                "videoId": "poBlirL3zt0"
            },
            "snippet": {
                "publishedAt": "2023-10-10T15:59:22Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "SAMUEL DORIA MEDINA EN LA UPDS",
                "description": "Samuel Doria Medina, un líder empresarial destacado, visitó el Campus de la #UPDSTarija para impartir la conferencia magistral ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/poBlirL3zt0/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/poBlirL3zt0/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/poBlirL3zt0/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-10T15:59:22Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "CwpluF8HtF1eWyCpQOxd1Z5O-xQ",
            "id": {
                "kind": "youtube#video",
                "videoId": "L6o96X0iufg"
            },
            "snippet": {
                "publishedAt": "2023-10-07T15:03:16Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "INVITACIÓN SAMUEL DORIA MEDINA  #updstarija",
                "description": "Listos para descubrir la FÓRMULA DEL ÉXITO para emprender? Únete a la conferencia magistral de Samuel Doria Medina, ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/L6o96X0iufg/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/L6o96X0iufg/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/L6o96X0iufg/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-07T15:03:16Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "DkmMGxS9mcDtwrrAvDSTwE8vgw8",
            "id": {
                "kind": "youtube#video",
                "videoId": "Ryg_GL94qrY"
            },
            "snippet": {
                "publishedAt": "2023-10-05T21:41:21Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "HISTORIA SPRING FEST  #updstarija",
                "description": "",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/Ryg_GL94qrY/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/Ryg_GL94qrY/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/Ryg_GL94qrY/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-05T21:41:21Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "Y_tp9I5daWU5QDAVdgLDw30bYGE",
            "id": {
                "kind": "youtube#video",
                "videoId": "j-Sbr_LcvV8"
            },
            "snippet": {
                "publishedAt": "2023-10-04T15:11:30Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "¡Haz realidad tus sueños en la UPDS!",
                "description": "Haz realidad tus sueños en la UPDS! Inicia tu carrera universitaria este 2024, llevando una materia por mes en el horario que ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/j-Sbr_LcvV8/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/j-Sbr_LcvV8/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/j-Sbr_LcvV8/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-10-04T15:11:30Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "zc_TwmFZQ7U2hHkwpMhty0CoH1Q",
            "id": {
                "kind": "youtube#video",
                "videoId": "9rD0SlYGmS0"
            },
            "snippet": {
                "publishedAt": "2023-09-28T20:31:19Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "FARÁNDULA UPDS 2023",
                "description": "Revive los mejores momentos de la “Farándula UPDS Lovers”! Estudiantes, docentes y administrativos de nuestra comunidad ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/9rD0SlYGmS0/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/9rD0SlYGmS0/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/9rD0SlYGmS0/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-09-28T20:31:19Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "B3oKT7Fx_V2JELLr9ixbcYDdbxw",
            "id": {
                "kind": "youtube#video",
                "videoId": "iXck8VGbE4I"
            },
            "snippet": {
                "publishedAt": "2023-09-28T20:30:41Z",
                "channelId": "UCf2Y_ZZGKCje37gLDIbEGzA",
                "title": "FARÁNDULA",
                "description": "Revive los mejores momentos de la “Farándula UPDS Lovers”! Estudiantes, docentes y administrativos de nuestra comunidad ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/iXck8VGbE4I/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/iXck8VGbE4I/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/iXck8VGbE4I/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Universidad Privada Domingo Savio Sede Tarija",
                "liveBroadcastContent": "none",
                "publishTime": "2023-09-28T20:30:41Z"
            }
        }
    ]
}

const facebookMock: IResponseFacebook = {
    "data": [
        {
            "id": "787071768079481_725311986299651",
            "message": "La Licenciada María Virginia Ruiz Herbas, Rectora Regional, y el Ingeniero Victor Yucra Solano, Director del Centro de Investigación e Innovación Tecnológica, participaron en el Congreso Internacional de Profesionales y Universitarios. El evento se llevó a cabo en el Auditorio del Campo Ferial de San Jacinto y se centró en el papel de la innovación tecnológica en el desarrollo económico. El objetivo de su participación fue proporcionar capacitación y liderazgo en tecnología para impulsar un cambio positivo en la sociedad.\n#UPDSTarija #ConferenciasMagistrales #InnovaciónTecnológica #CongresoInternacionaldeProfesionalesyUniversitarios",
            "created_time": "2023-10-25T21:44:45+0000",
            "permalink_url": "https://www.facebook.com/724693573028159/posts/725311986299651",
            full_picture: "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD"
        },
        {
            "id": "787071768079481_725279679636215",
            "message": "¡La jugada está en tus manos y que gane el mejor!\n#UPDS #TorneoDeAjedrez",
            "created_time": "2023-10-25T20:09:19+0000",
            "permalink_url": "https://www.facebook.com/724693573028159/posts/725279679636215",
            full_picture: "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD"
        },
        {
            "id": "787071768079481_725250659639117",
            "message": "La Universidad Privada Domingo Savio a través de su proyecto ambiental GEN GREEN junto a las instituciones aliadas, organización VIVE liderada por la Lic. Raquel Ruiz, logran la arborización en la comunidad de Tolomosa Grande de manera exitosa con el apoyo de profesores y estudiantes de la unidad educativa.\n¡Juntos Construyamos un mundo más sostenible, árbol por árbol!\n\n#GENGREEN\n#UPDSTarija\n#Rotary #vidaverde #Vive #sedegia",
            "created_time": "2023-10-25T19:01:02+0000",
            "permalink_url": "https://www.facebook.com/724693573028159/posts/725250659639117",
            full_picture: "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD"
        },
        {
            "id": "787071768079481_725205959643587",
            "message": "¡𝗟𝗮 𝗷𝘂𝗴𝗮𝗱𝗮 𝗲𝘀𝘁𝗮́ 𝗲𝗻 𝘁𝘂𝘀 𝗺𝗮𝗻𝗼𝘀!\nHoy miércoles 25 de octubre se realizará la semifinal y final del 𝟱º 𝗧𝗼𝗿𝗻𝗲𝗼 𝗡𝗮𝗰𝗶𝗼𝗻𝗮𝗹 𝗱𝗲 𝗔𝗷𝗲𝗱𝗿𝗲𝘇 𝗩𝗶𝗿𝘁𝘂𝗮𝗹 𝗨𝗣𝗗𝗦 – 𝟮𝟬𝟮𝟯\n¡Apoya a tu favorito!\n\n#UPDS #TorneoAjedrez #UPDSLaUniversidadDeLosQueDeciden",
            "created_time": "2023-10-25T18:01:03+0000",
            "permalink_url": "https://www.facebook.com/724693573028159/posts/725205959643587",
            "shares": {
                "count": 1
            },
            full_picture: "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD"
        },
        {
            "id": "787071768079481_725160472981469",
            "message": "¿Ya tiene tu manilla VIP para la EXPO UPDS 2023? \nUn evento que te permitirá explorar el mundo de las carreras universitarias dirigido a estudiantes de la promoción de unidades educativas y a padres de familia. \n¡Obtén tu manilla VIP Ahora! Puedes comunicarte con nosotros: https://wa.me/59175111830\n#EXPOUPDS2023 #Educación #FuturosLíderes #UPDSTarija",
            "created_time": "2023-10-25T16:20:04+0000",
            "permalink_url": "https://www.facebook.com/724693573028159/posts/725160472981469",
            "shares": {
                "count": 1
            },
            full_picture: "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD"
        },
        {
            "id": "787071768079481_725103229653860",
            "message": "La Escuela de Líderes dejó su huella en la Unidad Educativa Delfín Pino Ichazu al ofrecer una valiosa orientación sobre la construcción de proyectos de vida. Durante este evento, se pusieron en relieve habilidades e inteligencias clave que los estudiantes pueden cultivar y potenciar, con el objetivo de empoderarlos para tomar decisiones correctas y exitosos en su futuro.\n#UPDSTarija #EscuelaDeLíderes #TomaDeDecisiones #EducaciónDelFuturo",
            "created_time": "2023-10-25T14:27:10+0000",
            "permalink_url": "https://www.facebook.com/724693573028159/posts/725103229653860",
            "shares": {
                "count": 1
            },
            full_picture: "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD"
        },
    ],
    "paging": {
        "cursors": {
            "before": "QVFIUmNDYndrcDlOVlc4U1c5aVIzWTZA0elU1ZAFlCRkQxTUdMQ1l1dFBCaWlFNXk5eEFPWUpwdEpQdVltdTg4bHFHNVNzRGctYnllbDNKeWlHMnhJMmpRVGhpMGoyNHRFaDl0RlFTa3YxTnc1WHFDU1JhQUJDYTRaZAG1pRnNnMEhELWF2UGdiS3BLVlNVYjVZAc24yNmw4YjJmT1VGV1VaRndWQkRXUzdBVmJrcXZAhVEY3QjAyUUJDb25yY3pSZAzk0T3pHeUVueXRpSUdUU05TcllmWlotVnFZAOXV5LW1HLUhONDdUTHhhdElNWmVZAejJoODUyZAzlUeFd1bm9zUHZABRjg0b0IxMkFvZA1ZAwc1lDcTNISWUxY1BDYkdadVJWZAm1kREhSOXpLdmRSNDljZA1ZAJRmVyZAXBZAWDBLMGdQTjVQZAjVPZAFh6MXhFbE9wbUFSX2tkMThmMENBWU9FQWRibVpZAbmhDWC0tQlFrWTkyaFl4Q3VlRTB6U25SMUV0bndTRURoSFFZASWZAmVlNnVmpKLVo0bDlabmJYVndDUHp4a0pDYmh0UUxBOXJXd1hPODZAsMWN2NUNEeTJ5V0ZAGeTJMbmo4MDdnZAWE3NnZAycUZANcXM2WG1WSE1FU3M3elFOakRzcHZATRU5QRF9IcEJIRzduQlp3",
            "after": "QVFIUkdvVTc0S0pYMjR2Ny13aHJjd185RWxpRkh5ZAGttUkdMa0RwVnFHQi1YbFNOVFdGempaUmZADanFOVDZANbVlGRTljX0ZApZAm5Gd2VFSUQyLW1tRU9wOXJtMVJiZAkZAYdWtTc1pRT3J4TUVZAd2N3UGZAHeGdWdGEyOTVKYmpTbVRVdmpGSDh4MVU1UGhsVVZALVi1BN3NBekEzWVVEVVAzUWNKZADRaOEppMjY1ZA3c1UTd5elM5TUl1bjhrYUcwQ1M5TDlCRnFZATlUxc1J3MU1YNXdfTmU1Yzl6ZAmFVcjNIV2FtMHRmVTVfcE0xb3NyUzY0MzJNWGFvd0hNWEpwYWExZAXBtb0dqZAGJrMzFqRkdaNHBTZAUU0dHNkMkhpRFNDMHhyNEt4SzBpdVUyUHB2Y0dNX0hvS3oyamppdTVKalZAUZAW9OeGdJRFVZAeWNLUjRPemp1RTYwXzB0a3dmLWN3WXppN1BRY2xhY0c3SFIxTkJ2M3U2NmhtV25BUzR0MVpZAck5ncEVYUXdEb3BWdGFMRFU0M0VZASXNDX2ZA5RkNjRHBvS3Qzb3BxamliR2pUeDFtMXRKQk92NXlQbTZABeUFXek54ZAlJ3RmVmTExTSFZAoWWsxY0lxbi16X3lBZAlNpdHFkdDdSanNIY21YUFE4bnpJTTRXRHdjd01KQWVwbndJLUkyZAXVQOVpvUWUtX2hwQ29PWXZA5SnQ2QkhHbk5pZAwZDZD"
        },
        "next": "https://graph.facebook.com/v17.0/787071768079481/feed?fields=id%2Cmessage%2Ccreated_time%2Cpermalink_url%2Cshares%2Creactions&access_token=EAANtLRpy09cBO9XnFRUXMyqXEFGffq8ZAmO2ll5XMTidf5nCFFvRhvMQVZCZAWZB1ecLWv7svtEdaueKtGwA8ZByIww9lak7Iy3amxswJuGLwBZCS6O9dGZBAZAeIxKUEM3kPu5wcZBWWvxiWSIorJHBKEXXbpI3s3hUbShTeorh1fGLGKVZCLmZBYz5SPdz3ZCLOTS3AiiazmQ58xRqCxLT7c29evNV7iniGZByqdXUtsdjy&limit=25&after=QVFIUkdvVTc0S0pYMjR2Ny13aHJjd185RWxpRkh5ZAGttUkdMa0RwVnFHQi1YbFNOVFdGempaUmZADanFOVDZANbVlGRTljX0ZApZAm5Gd2VFSUQyLW1tRU9wOXJtMVJiZAkZAYdWtTc1pRT3J4TUVZAd2N3UGZAHeGdWdGEyOTVKYmpTbVRVdmpGSDh4MVU1UGhsVVZALVi1BN3NBekEzWVVEVVAzUWNKZADRaOEppMjY1ZA3c1UTd5elM5TUl1bjhrYUcwQ1M5TDlCRnFZATlUxc1J3MU1YNXdfTmU1Yzl6ZAmFVcjNIV2FtMHRmVTVfcE0xb3NyUzY0MzJNWGFvd0hNWEpwYWExZAXBtb0dqZAGJrMzFqRkdaNHBTZAUU0dHNkMkhpRFNDMHhyNEt4SzBpdVUyUHB2Y0dNX0hvS3oyamppdTVKalZAUZAW9OeGdJRFVZAeWNLUjRPemp1RTYwXzB0a3dmLWN3WXppN1BRY2xhY0c3SFIxTkJ2M3U2NmhtV25BUzR0MVpZAck5ncEVYUXdEb3BWdGFMRFU0M0VZASXNDX2ZA5RkNjRHBvS3Qzb3BxamliR2pUeDFtMXRKQk92NXlQbTZABeUFXek54ZAlJ3RmVmTExTSFZAoWWsxY0lxbi16X3lBZAlNpdHFkdDdSanNIY21YUFE4bnpJTTRXRHdjd01KQWVwbndJLUkyZAXVQOVpvUWUtX2hwQ29PWXZA5SnQ2QkhHbk5pZAwZDZD"
    }
}


const instaMockup: IResponseInstagram = {
    "data": [
        {
            "id": "17985795584268260",
            "caption": "La Universidad Privada Domingo Savio a través de su proyecto ambiental GEN GREEN junto a las instituciones aliadas, organización VIVE liderada por la Lic. Raquel Ruiz, logran la arborización en la comunidad de Tolomosa Grande de manera exitosa con el apoyo de profesores y estudiantes de la unidad educativa.\n¡Juntos Construyamos un mundo más sostenible, árbol por árbol!\n\n#GENGREEN\n#UPDSTarija\n#Rotary #vidaverde #Vive #sedegia",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/584AE74EE6E002BC7A2F935EBEC37C98_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&vs=715883057242170_4181142454&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC81ODRBRTc0RUU2RTAwMkJDN0EyRjkzNUVCRUMzN0M5OF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dBUHBoUmZEYUpkUHVsd0NBSnU1Y3RHOFRGTUticV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoKOrOW4l4dAFQIoAkMzLBdAXYk3S8an8BgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfDkKyCO2vJ0TvnnfC9zzeS6c10oWhp0gpnQP2jsRSjUAA&oe=653B10A3&_nc_sid=1d576d&_nc_rid=29a03ea0ea",
            "permalink": "https://www.instagram.com/reel/Cy1TCINMiqp/",
            "timestamp": "2023-10-25T19:01:36+0000"
        },
        {
            "id": "18001098902176517",
            "caption": "¿Ya tiene tu manilla VIP para la EXPO UPDS 2023? \nUn evento que te permitirá explorar el mundo de las carreras universitarias dirigido a estudiantes de la promoción de unidades educativas y a padres de familia. \n¡Obtén tu manilla VIP Ahora! Puedes comunicarte con nosotros: 75111830\n#EXPOUPDS2023 #Educación #FuturosLíderes #UPDSTarija",
            "media_type": "IMAGE",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/395119763_725141079650075_9135236376098881353_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=wiKea1O3OqAAX_YXed9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA4gzWQhMBZyMIW633B8_gxucfzfVfGFzL212SS0XOxFA&oe=653D72AD",
            "permalink": "https://www.instagram.com/p/Cy1AmKAJlza/",
            "timestamp": "2023-10-25T16:20:08+0000"
        },
        {
            "id": "18211883236248651",
            "caption": "La Escuela de Líderes dejó su huella en la Unidad Educativa Delfín Pino Ichazu al ofrecer una valiosa orientación sobre la construcción de proyectos de vida. Durante este evento, se pusieron en relieve habilidades e inteligencias clave que los estudiantes pueden cultivar y potenciar, con el objetivo de empoderarlos para tomar decisiones correctas y exitosos en su futuro.\n#UPDSTarija #EscuelaDeLíderes #TomaDeDecisiones #EducaciónDelFuturo",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/2F4C4CE4C86512981514FF69BFF48FB2_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&vs=693190789426352_2677468627&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC8yRjRDNENFNEM4NjUxMjk4MTUxNEZGNjlCRkY0OEZCMl92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dGZ01NaGRiYVNubnVyVURBRWU1elpGUDYzSkRicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJs631amyvIJAFQIoAkMzLBdAYFu%2Bdsi0ORgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfD5YmRywbHDrsgzu95XkAxE6Ejn5IWnXaWhNu6SbzYwsQ&oe=653AFBEC&_nc_sid=1d576d&_nc_rid=2d66bcd243",
            "permalink": "https://www.instagram.com/reel/Cy0zjrPt5hi/",
            "timestamp": "2023-10-25T14:26:34+0000"
        },
        {
            "id": "18030015844654416",
            "caption": "Los estudiantes de la materia de Psicofarmacología de la carrera de Psicología tuvieron la oportunidad de llevar a cabo una valiosa labor en el Mercado Central. Realizaron el Test de Ansiedad de Hamilton con el propósito de promover la conciencia sobre la salud mental en la sociedad de Tarija.\n#UPDSTarija #EstudiantesDePsicología #TestAnsiedadHamilton #MercadoCentralTarija #PromociónSaludMental #PsicologíaTarija #ApoyoPsicológico",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/9C47C116BF9B07E6F85EB353B842BB90_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&vs=301046256024658_1400352749&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC85QzQ3QzExNkJGOUIwN0U2Rjg1RUIzNTNCODQyQkI5MF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dQeUhsQmNjeEVGcWNVZ0NBT2psQy0tekR6c1BicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJuqKksqdwIFBFQIoAkMzLBdAU5mZmZmZmhgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAlrx9gJB86MqRqnCipWmIl2KZwCFm22DZ-uN6gjhuBFg&oe=653B4C8F&_nc_sid=1d576d&_nc_rid=f67f0a2b13",
            "permalink": "https://www.instagram.com/reel/CyzeSZZvj02/",
            "timestamp": "2023-10-25T02:01:25+0000"
        },
        {
            "id": "18392265235039421",
            "caption": "Te esperamos en la Expo UPDS, donde encontraras información de todas las carreras, oportunidades de estudio, programa de becas, clubes deportivos, culturales y mucho más.\nQue se llevará acabo este 26 y 27 de octubre en el campus de la UPDS, adquiere tu manilla Ahora.\n\n#UPDS\n#profesionalesmáshumanos",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/1346DC08E1467A2F6E2266BF0CB25E9B_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&vs=886924192765605_923026672&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC8xMzQ2REMwOEUxNDY3QTJGNkUyMjY2QkYwQ0IyNUU5Ql92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dGZGVqeGRFbmR2M1pHWUNBSHpoWmx1dmdWRWNicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoDPre69tI9AFQIoAkMzLBdAI6TdLxqfvhgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAgbS4RbzuFMSm4CxC-xwkXzE8TZoiLwlO_fLY3o-oceA&oe=653AD67A&_nc_sid=1d576d&_nc_rid=e34856ed7c",
            "permalink": "https://www.instagram.com/reel/CyzTvJVO054/",
            "timestamp": "2023-10-25T00:29:12+0000"
        },
        {
            "id": "17960065415662972",
            "caption": "Nuestra Rectora, la Licenciada María Virginia Ruiz Herbas, tuvo la distinción de participar como miembro del jurado calificador en la Expo Sur Tarija, evaluando los mejores stands en diversas categorías.\n#ExpoSurTarija #EventosTarija #UPDSTarija #Expo2023",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/395225294_724686686362181_5460134517124890704_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=l0OsSaZxHokAX9Xmpzh&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBmWHMrxRaVqKcCMWq1D2TD3zyjJZi4y03yXbXZELXomA&oe=653E8D60",
            "permalink": "https://www.instagram.com/p/CyzGnPrL-yw/",
            "timestamp": "2023-10-24T22:34:14+0000"
        },
        {
            "id": "17883139967951183",
            "caption": "¡No te pierdas de la Expo UPDS 2023! \nEste evento está diseñado especialmente para estudiantes de último año de bachillerato, ofreciéndote la oportunidad de explorar el emocionante mundo de las carreras universitarias. ¡Comunícate con nosotros para obtener tu manilla VIP! al: 75111830\n¡Vive la experiencia UPDS y prepárate para un futuro lleno de posibilidades! \n#EXPOUPDS2023 #Educación #FuturosLíderes #UPDSTarija",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/394623140_724632996367550_114013238744281694_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=8_r3bEZxX0UAX9yIO83&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDvdcyvZ5Th8R6ow6IP4TMKRKpYeoWIwZGHlwbRkYff0g&oe=653DDAD6",
            "permalink": "https://www.instagram.com/p/Cyy3q0gNs_w/",
            "timestamp": "2023-10-24T20:23:39+0000"
        },
        {
            "id": "17845060227087309",
            "caption": "¿Te gustaría aprender las claves para una tesis sólida y un proyecto de investigación exitoso?\n¡Únete a nuestro taller y prepárate para el éxito académico de tu Tesis! Nosotros te ayudaremos a diseñar la estructura perfecta para tu tesis o proyecto de investigación, este miércoles 25 de octubre a las 19:00 horas, en nuestro Salón Auditorio UPDS.\n#UPDSTarija #Tallerexito #tesis",
            "media_type": "IMAGE",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/395115048_724512276379622_435489285028408496_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=eGe3lQviLQoAX8er3gb&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCRe1VTm0ctT6mdvSUTaulB3fHUpLeGxh4GSL-oWcITWQ&oe=653D902A",
            "permalink": "https://www.instagram.com/p/Cyyc8vurTIp/",
            "timestamp": "2023-10-24T16:30:10+0000"
        },
        {
            "id": "18012015430938061",
            "caption": "Como parte de su formación profesional, los estudiantes de ingeniería industrial tuvieron la oportunidad de visitar las instalaciones de la fábrica de embotellado de EMBOL, enriqueciendo así su experiencia académica con práctica en el mundo real.\n #UPDSTarija #embol #cocacola #PracticasProfesionales",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/395063643_724488089715374_2963308196824528776_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=q2tGjyQ1HmcAX_7c7IB&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfARvg5V_TiPdXFhvqyd1nZ6hLT1ezDP6vQ8dxLjykYKUw&oe=653D65F2",
            "permalink": "https://www.instagram.com/p/CyyVdk2L71Y/",
            "timestamp": "2023-10-24T15:24:45+0000"
        },
        {
            "id": "18005458885897829",
            "caption": "¡Ven se parte de la EXPO UPDS 2023! Un evento que te permitirá explorar el mundo de las carreras universitarias dirigido a estudiantes de la promoción de unidades educativas. ¡Obtén tu manilla VIP Ahora! Puedes comunicarte con nosotros: https://wa.me/59175111830 \n#EXPOUPDS2023 #Educación #FuturosLíderes #UPDSTarija",
            "media_type": "IMAGE",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/394640374_724049186425931_1053555932318138576_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=zyRCP8UsrwQAX9egYRE&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBmsyitbW3YHBQYMcrkw658t2L6m-AtPv17JbrZgcb8uw&oe=653DDF8A",
            "permalink": "https://www.instagram.com/p/CywlosmpA5A/",
            "timestamp": "2023-10-23T23:07:36+0000"
        },
        {
            "id": "18028686121649015",
            "caption": "¡Se viene tu próximo módulo, registra tu materia a tiempo!\n\n#UPDSLaUniversidadDeLosQueDeciden #Semipresencial",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/534DD223819772790DC631A5B6B0B880_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&vs=866253018283032_1312408633&_nc_vs=HBkcFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC81MzRERDIyMzgxOTc3Mjc5MERDNjMxQTVCNkIwQjg4MF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAoABgAGwGIB3VzZV9vaWwBMRUAACaUuumQ0cmgQBUCKAJDMywXQBYi0OVgQYkYEmRhc2hfYmFzZWxpbmVfMV92MREAdQAA&ccb=9-4&oh=00_AfCqoooGneEV2KUjXTGYAC35Xy1tY7eGkjqx9I7y_tJTIw&oe=653B1CF3&_nc_sid=1d576d&_nc_rid=007ae1ca52",
            "permalink": "https://www.instagram.com/reel/Cyv_rKeqU1K/",
            "timestamp": "2023-10-23T17:36:00+0000"
        },
        {
            "id": "17961649817652069",
            "caption": "¡Estamos emocionados de compartir el logro de nuestros graduados de la Universidad Privada Domingo Savio sede Tarija! Estos graduados han alcanzado sus sueños y objetivos con éxito, y nos enorgullece haber sido parte de su viaje educativo. ¡Felicidades a nuestros nuevos profesionales!\n#UPDSTarija #ActodeColación #ColaciónDeGrado2023",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/FC48F9502E938BBD45D489353A691991_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuMTI4MC5kYXNoX2Jhc2VsaW5lXzFfdjEifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&vs=1497592147746198_3524192613&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9GQzQ4Rjk1MDJFOTM4QkJENDVENDg5MzUzQTY5MTk5MV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dGb2pleGRsRG1tQnZrb0RBT1VWUDZwb2JFWTZicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJr6U0bf%2B%2FNA%2FFQIoAkMzLBdAYHNcKPXCjxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfCvHUdmfGQIqMEgQMZTyopqiLo6vyNZ74KuL8IIqLFaOg&oe=653B2865&_nc_sid=1d576d&_nc_rid=4fa351653c",
            "permalink": "https://www.instagram.com/reel/Cyv07pthBny/",
            "timestamp": "2023-10-23T16:02:28+0000"
        },
        {
            "id": "18391168717040895",
            "caption": "Revisa la agenda semanal para enterarte de las actividades que te brinda la #UPDSTarija.\n\n#calendario\n#organizador",
            "media_type": "IMAGE",
            "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/394285794_707569824205189_1946389304327216601_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=Q2mgXuoUb-4AX_WjGcH&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfC36iviDqRqR4X7kfyXhQts9IHn9gU1US-2w-G1-rl1JQ&oe=653E9CF0",
            "permalink": "https://www.instagram.com/p/CyvtOrYLlYd/",
            "timestamp": "2023-10-23T14:54:42+0000"
        },
        {
            "id": "18237614347232587",
            "caption": "¡Buen inicio de semana #ComunidadUPDS!\n#UPDSTarija\n#FelizLunes",
            "media_type": "IMAGE",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/395205309_723810013116515_7874613858624104868_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=OCLfNfakJCIAX_sGg_p&_nc_oc=AQlmg7AFvUsq9R_XWGtsIGgZh41Zmollo-JspcOxjiLvWYPygo_hmfdCZbZHd_WFFsA&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA9QmC6-qRRPS2UkbGzHil1HFARGz9_EfTS0qMdM2Fklw&oe=653E836C",
            "permalink": "https://www.instagram.com/p/CyvsQD2tMhN/",
            "timestamp": "2023-10-23T14:46:10+0000"
        },
        {
            "id": "18095800153368027",
            "caption": "¡Así se vivió la noche del acto de colación! Los nuevos profesionales han alcanzado sus sueños y objetivos con éxito, y nos enorgullece haber sido parte de su viaje educativo. ¡Felicidades a nuestros nuevos profesionales!\n\n#UPDSTarija #ActodeColación #ColaciónDeGrado2023",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/644FC96FD32238B14C1E669A6E084A83_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuMTI4MC5kYXNoX2Jhc2VsaW5lXzFfdjEifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&vs=352473610640551_413059465&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC82NDRGQzk2RkQzMjIzOEIxNEMxRTY2OUE2RTA4NEE4M192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dIM3lmeGQxVWU4MVFPZ0FBRXk1dWZSRmc5VkFicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoaEzYvur4VAFQIoAkMzLBdAVJjlYEGJNxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfBEK2TjQriBE7Z7j0kFSU-Zjrye3w7j96aqZNLZCkbRqA&oe=653AD938&_nc_sid=1d576d&_nc_rid=6f602cf02b",
            "permalink": "https://www.instagram.com/reel/Cyvrfhfh-BH/",
            "timestamp": "2023-10-23T14:39:52+0000"
        },
        {
            "id": "18030315619720171",
            "caption": "𝗖𝗹𝘂𝗯 𝗱𝗲 𝗟𝗲𝗰𝘁𝘂𝗿𝗮 𝗨𝗣𝗗𝗦 – 𝟮𝟬𝟮𝟯 \nRecuerda que mañana 24 de octubre tenemos nuestro 𝘀𝗲𝗴𝘂𝗻𝗱𝗼 𝗲𝗻𝗰𝘂𝗲𝗻𝘁𝗿𝗼.\n¡Te esperamos!\n#UPDS #UPDSLaUniversidadDeLosQueDeciden #ClubDeLectura2023 #AmorPorLaLectura",
            "media_type": "IMAGE",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/393929412_723786809785502_1661280307826972014_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=KcBOtX7Lc3oAX-EGvv8&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBWJMnPKC2oEnl2yHgYU6d6gNb6i3tbvVLzoTcqaKbehg&oe=653F5095",
            "permalink": "https://www.instagram.com/p/Cyvnkr0Rbwo/",
            "timestamp": "2023-10-23T14:05:17+0000"
        },
        {
            "id": "17990172068171966",
            "caption": "Conoce a la Lic. Marcela Aleida Vargas de la carrera de Psicología, quien nos comparte sus emociones y el trayecto de su estudio.\nNos enorgullece haber sido parte de su viaje educativo.\n¡Felicidades a nuestros nuevos profesionales!\n#UPDSTarija #ActodeColación #ColaciónDeGrado2023",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/40434F9C16966C9064ABA724E05F3087_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuMTI4MC5kYXNoX2Jhc2VsaW5lXzFfdjEifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&vs=661703602612536_763923765&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC80MDQzNEY5QzE2OTY2QzkwNjRBQkE3MjRFMDVGMzA4N192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dBX1RNUmZBandIS1VLVURBRkQzRzhJMU9ma1RicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJvSXt7Wsj%2Fw%2FFQIoAkMzLBdAXMHbItDlYBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfCI5-3kKfEsErCZ43CYLj7U6gjjzIXSCJmvj0CvmHYenA&oe=653AC6AE&_nc_sid=1d576d&_nc_rid=7b33e8baf2",
            "permalink": "https://www.instagram.com/reel/CyveD2nt8Sl/",
            "timestamp": "2023-10-23T12:42:31+0000"
        },
        {
            "id": "18297278947180087",
            "caption": "¡EXPO UPDS 2023!\nUn evento que te permitirá explorar el mundo de las carreras universitarias dirigido a estudiantes de la promoción de unidades educativas. \n¡Vive la experiencia UPDS!\n\n #EXPOUPDS2023 #Educación #FuturosLíderes",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/69451399519EB360101FF09FFB8FA1BA_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&vs=673303171442570_2092589877&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC82OTQ1MTM5OTUxOUVCMzYwMTAxRkYwOUZGQjhGQTFCQV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dOWHJmeGVhX2F4RDJqb0NBQnNDOEdIdERPY2licV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJr7fsfCC8YNAFQIoAkMzLBdAK4o9cKPXChgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfDElT57KnvP-OeS2L9d2APoQ_3oojocA5JBsAIZaMWaUA&oe=653AC3A5&_nc_sid=1d576d&_nc_rid=3bac9eef9a",
            "permalink": "https://www.instagram.com/reel/CyuLiUsOKwk/",
            "timestamp": "2023-10-23T00:41:45+0000"
        },
        {
            "id": "18013896829769595",
            "caption": "¡𝐌𝐮𝐜𝐡𝐚𝐬 𝐟𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬 𝐚 𝐥𝐨𝐬 𝐧𝐮𝐞𝐯𝐨𝐬\n𝐩𝐫𝐨𝐟𝐞𝐬𝐢𝐨𝐧𝐚𝐥𝐞𝐬 𝐔𝐏𝐃𝐒!\nEstamos felices de haberlos acompañado en este\nhermoso proceso de su transformación.\nDeseamos que tengan muchos éxitos y que sigan\nescribiendo su historia profesional.\n\n#MetaCumplidas\n#UPDSTarija",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/393802110_722722296558620_1999363667076702464_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=JnkRBH-_HNMAX_K_c9-&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBsWBb_p-m7mUU8bN0cIhXXHq-axY6peOE2q9RF9gsC_Q&oe=653E55A2",
            "permalink": "https://www.instagram.com/p/Cyq02S2OFNR/",
            "timestamp": "2023-10-21T17:25:04+0000"
        },
        {
            "id": "18308746900113249",
            "caption": "Nuestra Rectora Regional Lic. María Virginia Ruiz Herbas, estuvo presente en el Congreso Internacional de Profesionales y Universitarios el cual se realizó en el Auditorio del Campo Ferial de San Jacinto, donde expuso el tema “La Innovación Tecnológica Como Pilar del Desarrollo Económico – Casos de Éxito y Experiencias”, con el objetivo de capacitar y caminar de la mano con la tecnología para así crear un cambio en nuestra sociedad. \n\n#UPDSTarija \n#ConferenciasMagistrales \n#InnovaciónTecnológica\n#CongresoInternacionaldeProfesionalesyUniversitarios",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/394556654_1024905415421276_7974839367130247948_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=eJI9mA5ZoPgAX-JDGZE&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAqFni2-Q0EysW45P8dRfiM31TDfwNMM9Td6q7TL00p7g&oe=653DC5C5",
            "permalink": "https://www.instagram.com/p/CyqwOO-Lbhv/",
            "timestamp": "2023-10-21T16:44:39+0000"
        },
        {
            "id": "18390898582030554",
            "caption": "Conoce a la Ing. Paola Noemi Choque de la carrera de ingeniería Industrial, quien nos comparte sus emociones y el trayecto de su estudio.\nNos enorgullece haber sido parte de su viaje educativo.\n¡Felicidades a nuestros nuevos profesionales!\n#UPDSTarija #ActodeColación #ColaciónDeGrado2023",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/9D4EDADD1C5EC96F67B4A5A924E929A3_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuMTI4MC5kYXNoX2Jhc2VsaW5lXzFfdjEifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&vs=1488718201925508_282620131&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC85RDRFREFERDFDNUVDOTZGNjdCNEE1QTkyNEU5MjlBM192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dIOGtlQmVKMWZvVWdnUUJBTU9Oa2FXSktiTWdicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJrDAv5am84lAFQIoAkMzLBdAVdRJul41PxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfBY8qM46_gOREowITWgqFw9PkKv_XCu9lOcBe8BOMAYAg&oe=653B5C0B&_nc_sid=1d576d&_nc_rid=db98f2adbf",
            "permalink": "https://www.instagram.com/reel/CyownU3qEKt/",
            "timestamp": "2023-10-21T00:41:17+0000"
        },
        {
            "id": "17997427787189677",
            "caption": "¡Caminata Rosa UPDS!  Unidos desde la pasarela 15 de abril hasta la plaza Luis de Fuentes y Vargas, vestimos de rosa en el Día Internacional del Cáncer de Mama. Juntos, sensibilizamos y prevenimos. \n#UPDSRosa #CáncerDeMama #Prevención",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/393177679_722272979936885_4683698073420163205_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=u5pt9ZVcP-IAX8wVQGt&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfATl9_4C982bsY_JhzWzKPMyAfjSH1F8zxXoYFl3-fdjg&oe=653ED611",
            "permalink": "https://www.instagram.com/p/Cyo0GzWLSp5/",
            "timestamp": "2023-10-20T22:40:07+0000"
        },
        {
            "id": "18025512955668787",
            "caption": "¿Estas a punto de ser Bachiller?\n¡Esto te interesa!\nExpo UPDS 2023, un evento que te permitirá explorar el mundo de las carreras universitarias dirigido a estudiantes de la promoción de unidades educativas.\nContáctanos con nosotros y reclama tu manilla VIP: https://wa.me/59175111830\n¡Vive la experiencia UPDS!\n@natalielopezy_ @IMOELFAIL7\n#EXPOUPDS2023 #Educación #FuturosLíderes",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/EE4E8BA511EC039F616F50B045F6A783_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuMTI4MC5kYXNoX2Jhc2VsaW5lXzFfdjEifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&vs=1026798118365046_1484793493&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9FRTRFOEJBNTExRUMwMzlGNjE2RjUwQjA0NUY2QTc4M192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dNUF9oQmNQRlVVd2xrSUhBQTA2NDNzMXJwb1licV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJuri1M2Q94dAFQIoAkMzLBdAQqqfvnbItBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAWQ6IcPT_94m5D25QzTtMMQG94zEfr6-7926iMyDJF1A&oe=653B302E&_nc_sid=1d576d&_nc_rid=f2510b086b",
            "permalink": "https://www.instagram.com/reel/CyodOj7KMs2/",
            "timestamp": "2023-10-20T19:21:07+0000"
        },
        {
            "id": "18113108029336713",
            "caption": "La Universidad Privada Domingo Savio a través de su proyecto ambiental GEN GREEN junto a las instituciones aliadas, organización VIVE liderada por la Lic. Raquel Ruiz, logran la arborización en la comunidad de Tolomosa Grande de manera exitosa con el apoyo de profesores y estudiantes de la unidad educativa.\n¡Juntos Construyamos un mundo más sostenible, árbol por árbol!\n\n#GENGREEN\n#UPDSTarija\n#Rotary #vidaverde #Vive #sedegia",
            "media_type": "VIDEO",
            "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/9F47364F642029EE6A0F664B09A8E6B7_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&vs=1010549106662014_3189684833&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC85RjQ3MzY0RjY0MjAyOUVFNkEwRjY2NEIwOUE4RTZCN192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dGWmxmUmZzSFpZVXFaMEVBRmdEb1o5SHpDa29icV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJqCsobrK2PU%2FFQIoAkMzLBdAQGHKwIMSbxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfCNpCOip-pquinpe_-YnU5TGU3clkhv8Cwl-Q3DEblhOw&oe=653B5170&_nc_sid=1d576d&_nc_rid=4b1530d8db",
            "permalink": "https://www.instagram.com/reel/CyoUiu9Onzd/",
            "timestamp": "2023-10-20T18:05:39+0000"
        },
        {
            "id": "18263987191164952",
            "caption": "La Universidad Privada Domingo Savio a través de su proyecto ambiental GEN GREEN junto a las instituciones aliadas, organización VIVE liderada por la Lic. Raquel Ruiz, logran la arborización en la comunidad de Tolomosa Grande de manera exitosa con el apoyo de profesores y estudiantes de la unidad educativa.\n¡Juntos Construyamos un mundo más sostenible, árbol por árbol!\n\n#GENGREEN\n#UPDSTarija\n#Rotary #vidaverde #Vive #sedegia #Pertt",
            "media_type": "CAROUSEL_ALBUM",
            "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/393373917_253823333911763_3225954947244690907_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=ojZedyJpEW4AX-0tQiS&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA3vCOEycih55nsZDrMZ8ivQaH9qvfPkJdJSBN1elK4Fg&oe=653E0E80",
            "permalink": "https://www.instagram.com/p/CyoR2foxUDR/",
            "timestamp": "2023-10-20T17:40:47+0000"
        }
    ],
    "paging": {
        "cursors": {
            "before": "QVFIUmtTdTYtSDI4VjkxbWV5TkpkMkduSFloMzV2UUQtYVZA6WTBkUWJKbFVkc3pTYWhZATkxSRW9vbl80R1ZAnSU9WUm40RnpxLXF6ZAjVjbHdGSURnQnEwTVpR",
            "after": "QVFIUjVnVTdGVmhEUVk0eHBPaXVoNWhWNW9wMjJLbUlxU3Uxdk9UeU1EX3R0UEFFQ2ZArVkljSVpYUHFfQ2Y4YmVoalFZAUkI0NUo2UWtmTnFjRVdKUHRKUWl3"
        },
        "next": "https://graph.instagram.com/v18.0/17841402381740376/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=IGQWRQRzVyZAlpJUGNPLXBTQ1IxNjNLeklyakhxb1NJX0w2RDhtZAXk5VmlnRkNad1V0VVV0eXZAyNmZASN0hXbHlTSHJhZATNTUTlsVjZAyS0xaTmd5YkJFa1NsV3c0WUdMM1RDcktJbmRrUmFHWUlrMm5kLUR4WGZAsMWcZD&limit=25&after=QVFIUjVnVTdGVmhEUVk0eHBPaXVoNWhWNW9wMjJLbUlxU3Uxdk9UeU1EX3R0UEFFQ2ZArVkljSVpYUHFfQ2Y4YmVoalFZAUkI0NUo2UWtmTnFjRVdKUHRKUWl3"
    }
}