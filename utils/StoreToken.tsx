import AsyncStorage from "@react-native-async-storage/async-storage";
interface IResponse {
  data: string | null;
  error: any;
}

export const setToken = async (token: string): Promise<IResponse> => {
  try {
    await AsyncStorage.setItem("utoken", token);
    return {
      data: token,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
};

export const clearToken = async (): Promise<IResponse> => {
  try {
    await AsyncStorage.clear();
    return {
      data: "success",
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
};

export const getToken = async (): Promise<IResponse> => {
  try {
    const token = await AsyncStorage.getItem("utoken");
    return {
      data: token,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
};
