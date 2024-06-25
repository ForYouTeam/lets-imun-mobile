import { ILoginPayload } from "@/context/types/LoginType";
import { getToken } from "@/utils/StoreToken";
import { ILoginServiceResponse, ILoginSuccessResponse } from "../type";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const loginProcess = async (
  payload: ILoginPayload
): Promise<ILoginServiceResponse> => {
  try {
    const response = await fetch(`${baseUrl}/v1/go-token`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        status: response.status,
        message: "Failed to login",
        data: null,
        error: errorResponse,
      };
    }

    const jsonData: ILoginSuccessResponse = await response.json();

    return {
      status: response.status,
      message: "Login successful",
      data: jsonData,
      error: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to login",
      data: null,
      error: error,
    };
  }
};
