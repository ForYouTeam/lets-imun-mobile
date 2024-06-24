export interface IRegisterPayload {
    username: string;
    password: string;
    password_confirmation: string;
}

export type TRegisterContext = {
    loading: boolean;
    setLoading: (payload: boolean) => void;
    registerPayload: IRegisterPayload;
    setRegisterPayload: (payload: IRegisterPayload) => void;
}