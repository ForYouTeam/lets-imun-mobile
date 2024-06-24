import { getToken } from "@/utils/StoreToken";
import { IRegisterResponse } from "../type";
import { IRegisterPayload } from "@/context/types/RegisterType";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const saveRegister = async (payload: IRegisterPayload) => {
    const {data, error} = await getToken();
    if (error) {
        return {
            data: null,
            error: error,
        }
    }
    try {
        const response = await fetch(baseUrl + "/v1/go-regist", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data
            }
        });

        if (!response.ok && response.status !== 401 && response.status !== 422) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: IRegisterResponse = await response.json();

        if (response.status === 422) {
            return {
                status: response.status,
                message: "Gagal Daftar",
                data: null,
                error: jsonData.data
            }
        }

        const responseData: IRegisterResponse = {
            status: response.status,
            message: "Berhasil Daftar",
            data: '',
            error: null,
        };

        return {
            status: response.status,
            message: "Berhasil Daftar",
            data: responseData,
            error: null,
        }
    } catch (error) {
        return {
            status: 500,
            message: "Gagal Daftar",
            data: null,
            error: error,
        }
    }
};