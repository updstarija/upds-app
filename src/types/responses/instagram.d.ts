
export interface IResponseInstagram {
    data: IInstragramPost[];
    paging: Paging;
}

export interface IInstragramPost {
    caption: string;
    id: string;
    like_count: number;
    media_url?: string;
    permalink: string;
    thumbnail_url?: string;
    media_product_type: "FEED" | "REELS";
    media_type: "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";
}


export interface Paging {
    cursors: Cursors;
    next: string;
}

export interface Cursors {
    after: string;
    before: string;
}


