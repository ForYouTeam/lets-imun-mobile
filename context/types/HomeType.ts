export interface IHomeCarousel {
    title      : string;
    description: string;
    image      : string;
    category   : string;
    time       : string;
}

export interface INews {
    title      : string;
    date       : string;
    month      : string;
    description: string;
}

export interface INewsPayload {
    month: string;
}

export type THomeCarousel = {
    homeCarousel: IHomeCarousel[];
    setHomeCarousel: (homeCarousel: IHomeCarousel[]) => void;
    homeNews: INews[];
    setHomeNews: (homeNews: INews[]) => void;
    getNewsByMonth: (month: string) => void;

    newsPayload: INewsPayload;
    setNewsPayload: (newsPayload: INewsPayload) => void;
}