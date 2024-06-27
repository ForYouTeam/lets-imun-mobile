
export interface IVerifyPayload {
    nik: string | number,
    name: string,
    email: string,
    phone: string,
    gender: string,
    address: string,
    img_document: File | null
}

export type TReportPannel = {
    verifyPayload: IVerifyPayload;
    setVerifyPayload: (payload: IVerifyPayload) => void;
}