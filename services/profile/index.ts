import { getToken } from "@/utils/StoreToken";
import { IProfileServiceResponse } from "../type";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getProfile = async (): Promise<IProfileServiceResponse> => {
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
    const response = await fetch(`${baseUrl}/v1/get-profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
    });

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error: new Error('Failed to fetch profile data'),
      };
    }

    const responseData = await response.json();
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
