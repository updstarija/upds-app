export interface IResponseYoutbe {
    etag: string;
    items: IYoutubePost[];
    kind: string;
    nextPageToken: string;
    pageInfo: PageInfo;
    regionCode: string;
}

export interface IYoutubePost {
    etag: string;
    id: ID;
    kind: string;
    snippet: Snippet;
}

export interface ID {
    kind: string;
    videoId: string;
}

export interface Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: "none" | "upcoming"
    publishTime: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    title: string;
}

export interface Thumbnails {
    default: Default;
    high: Default;
    medium: Default;
}

export interface Default {
    height: number;
    url: string;
    width: number;
}

export interface PageInfo {
    resultsPerPage: number;
    totalResults: number;
}
