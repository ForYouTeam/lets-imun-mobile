import { ImageSourcePropType } from "react-native";

export interface IHomeCarousel {
    title      : string;
    description: string;
    image      : string;
    category   : string;
    time       : string;
}

export interface INews {
    id          : string;
    title       : string;
    time        : string;
    image       : string | ImageSourcePropType;
    description : string;
    category    : string;
    key        ?: string
}

export interface INewsPayload {
    month: string;
}

export type THomeCarousel = {
    homeCarousel: IHomeCarousel[];
    setHomeCarousel: (homeCarousel: IHomeCarousel[]) => void;
    homeNews: INews[];
    setHomeNews: (homeNews: INews[]) => void;

    newsPayload: INewsPayload;
    setNewsPayload: (newsPayload: INewsPayload) => void;
}