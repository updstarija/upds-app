// import { google, youtube_v3 } from 'googleapis';

// const apiKey = 'AIzaSyAmqO6qDlI0VuKTV1Sv7a8EI5Qqdc6ydZg';

// // Crea una instancia del cliente de la API de YouTube Data API v3
// const youtube = google.youtube({
//   version: 'v3',
//   auth: apiKey,
// });

// async function getTopVideos(channelId: string, maxResults: number = 5): Promise<youtube_v3.Schema$SearchResult[]> {
//     try {
//       const response = await youtube.search.list({
//         part: ['snippet'],
//         channelId: channelId,
//         maxResults: maxResults,
//         order: 'viewCount',
//       });

//       const videos = response.data.items;
//       if (videos) {
//         return videos;
//       } else {
//         throw new Error('No se encontraron videos.');
//       }
//     } catch (error) {
//       console.error('Error al obtener los videos:', error);
//       return [];
//     }
//   }


// export { getTopVideos };


export const test = 0