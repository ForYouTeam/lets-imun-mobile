import { getToken } from "@/utils/StoreToken";
import { IReportResponse, IServiceResponse, IVerifyResponse } from "./type";
import { IVerifyPayload } from "@/context/types/ReportType";
import * as FileSystem from 'expo-file-system';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const sendVerify = async (payload: IVerifyPayload): Promise<IVerifyResponse> => {
    // Fetch token data
    const { data, error } = await getToken();
    if (error) {
        return {
            status: 401,
            data: null,
            error: error,
        };
    }

    try {
        const formData = new FormData();
        formData.append('nik', payload.nik.toString());
        formData.append('name', payload.name);
        formData.append('email', payload.email);
        formData.append('phone', payload.phone);
        formData.append('gender', payload.gender);
        formData.append('address', payload.address);

        const fileInfo = await FileSystem.getInfoAsync(payload.img_document as string);
        formData.append('img_document', {
            uri: payload.img_document,
            type: 'application/octet-stream',
            name: fileInfo.uri.split('/').pop(),
        } as any);

        const response = await fetch(`${baseUrl}/v1/go-verify`, {
            method: "POST",
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${data}`,
            },
        });

        console.log("ini hasil verify: ", response);
        const responseData = await response.json();

        if (!response.ok) {
            return {
                status: response.status,
                data: null,
                error: responseData,
            };
        }

        return {
            status: response.status,
            data: responseData,
            error: null,
        };

    } catch (error) {
        return {
            status: 500,
            data: null,
            error: error,
        };
    }
};

export const getReport = async (month: string): Promise<IServiceResponse> => {
    const { data, error } = await getToken();
  if (error) {
    return {
      status: 401,
      data: null,
      error: error,
    };
  }
  
  try {
    const response = await fetch(`${baseUrl}/v1/get-child-report?month=${month}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
    });

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error: new Error('Failed to fetch report data'),
      };
    }

    const responseData = await response.json();
    return {
      status: response.status,
      data: responseData as {
        data: {
            list: IReportResponse[]
        }
      },
      error: null,
    };

  } catch (error) {
    return {
      status: 500,
      data: null,
      error: error,
    };
  }
}