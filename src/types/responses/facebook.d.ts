import { Paging } from "./instagram";

export interface IResponseFacebook {
    data: IFacebookPost[];
    paging: Paging;
}

export interface IFacebookPost {
    created_time: string;
    id: string;
    message?: string;
    permalink_url: string;
    full_picture: string;
    shares?: Shares;
}

export interface Shares {
    count: number;
}


