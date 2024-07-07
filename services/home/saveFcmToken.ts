import { getToken } from "@/utils/StoreToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const sendFcmToken = async (): Promise<void> => {
    // Fetch token data
    const { data, error } = await getToken();
    const token = await AsyncStorage.getItem('fcmToken')

    const body = {
        token_notif: token as string
    }
    try {
        console.log("payload: ", JSON.stringify(body));
        const response = await fetch(`${baseUrl}/v1/get-expo-token`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data}`,
            },
        });
        const result = await response.json()
        console.log("token fcm success: ", result);

    } catch (error) {
        console.log("token fcm: ", error);
    }
};