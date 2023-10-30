import { VideoThumbnailsResult } from "expo-video-thumbnails";

export interface IResponseInstagram {
    data: IInstragramPost[];
    paging: Paging;
}

export interface IInstragramPost {
    caption: string;
    id: string;
    media_type: "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";
    media_url: string;
    permalink: string;
    timestamp: string;
    miniatura?: VideoThumbnailsResult
}


export interface Paging {
    cursors: Cursors;
    next: string;
}

export interface Cursors {
    after: string;
    before: string;
}
