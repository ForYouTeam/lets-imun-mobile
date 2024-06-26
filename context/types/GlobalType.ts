export interface IMemberStatus {
    isVerify: string | boolean,
    status: string
}

export type TGlobalContextType = {
    isLoading: boolean;
    isAuthenticated: boolean;
    memberStatus: IMemberStatus;

    setLoading: (loading: boolean) => void;
    setAuthenticated: (authenticated: boolean) => void;
    setMemberStatus: (payload: IMemberStatus) => void;
};