import { INews } from "@/context/types/HomeType"

export interface IServiceResponse {
    status  : string | number,
    data    : any,
    error   : any,
    message?: string
}

export interface INewsServiceResponse {
    status  : string | number,
    data    : any,
    error   : any,
    message?: string
}

export interface INewsSuccess {
    choice: string | boolean,
    list: INews[]
}