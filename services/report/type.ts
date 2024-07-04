export interface IErrorResponseVerify {
    img_document?: string[]
    nik?: string[],
    name?: string[],
    email?: string[],
    phone?: string[],
    gender?: string[],
    address?: string[],
}

export interface IVerify {
    user_id: string
    nik: string
    name: string
    email: string
    phone: string
    gender: string
    address: string
    img_document: string
}

export interface IVerifyResponse {
    status: number
    data?: null | IVerify
    error?: null | unknown | IErrorResponseVerify
}