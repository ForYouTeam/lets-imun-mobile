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

export interface IReportResponse {
    nama_anak: string
    umur: string
    bb: string
    tb: string
    jenis_kelamin: string
    tanggal_report: string
    check_up: string
}

export interface IServiceResponse {
    status : number | string,
    message?: string,
    data   : any,
    error  : any
}