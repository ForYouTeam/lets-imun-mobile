export interface IRegisterValidationMsg {
    username: null | string[];
    password: null | string[];
    password_confirmation: null | string[]
}

export interface IRegisterResponse {
    status: number | string;
    message: string;
    data: any;
    error: any | null
}