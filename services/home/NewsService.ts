import { getToken } from "@/utils/StoreToken";
import { INewsServiceResponse } from "./type";

export const getNews = async (): Promise<INewsServiceResponse> => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!baseUrl) {
        return {
            status: 500,
            data: null,
            error: "API URL is not defined"
        }
    }

    const { data, error } = await getToken();

    if (error || !data) {
        return {
            status: 401,
            data: null,
            error: error
        }
    }

    try {
        const response = await fetch(`${baseUrl}/v1/get-news`, {
            headers: {
                Authorization: `Bearer ${data}`
            }
        });

        if (!response.ok) {
            return {
                status: response.status,
                data: null,
                error: response.statusText
            }
        }

        const newsData = await response.json();

        return {
            status: response.status,
            data: newsData,
            error: null
        };
    } catch (fetchError) {
        return {
            status: 500,
            data: null,
            error: fetchError
        }
    }
};
