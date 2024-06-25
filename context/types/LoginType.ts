export interface ILoginPayload {
  username: string;
  password: string;
}

export type TLoginContext = {
  loading: boolean;
  setLoading: (payload: boolean) => void;
  loginPayload: ILoginPayload;
  setLoginPayload: (payload: ILoginPayload) => void;
  clearPayload: () => void;
  isComplete: () => boolean;
};
