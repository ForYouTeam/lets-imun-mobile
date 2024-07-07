import { IReportResponse } from "@/services/report/type";

export interface IVerifyPayload {
    nik: string | number,
    name: string,
    email: string,
    phone: string,
    gender: string,
    address: string,
    img_document: string | null
}

export type TReportPannel = {
    verifyPayload: IVerifyPayload;
    loading: boolean,
    reportList: IReportResponse[]

    setVerifyPayload: (payload: IVerifyPayload) => void;
    setLoading: (payload: boolean) => void;
    setReportList: (payload: IReportResponse[]) => void;
}