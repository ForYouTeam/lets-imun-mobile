import { getToken } from "@/utils/StoreToken";
import { IResponseData } from "../type";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getProfile = async () => {
    // Fetch profile data
    const {data, error} = await getToken();
    if (error) {
        return {
            data: null,
            error: error,
        }
    }
    try {
        const response = await fetch(baseUrl + "/v1/get-profile", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data
            }
        });

        if (!response.ok && response.status !== 401) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: IResponseData = {
            status: response.status,
            detail: await response.json(),
        };

        return {
            data: responseData,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: error,
        }
    }
}