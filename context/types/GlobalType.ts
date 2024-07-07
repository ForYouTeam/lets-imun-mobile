export interface IMemberStatus {
    isVerify: string | boolean;
    status: string;
}

export interface IProfile {
    username: string;
    name: string;
    nik: string;
    phone: string;
}

export type TGlobalContextType = {
    isLoading: boolean;
    isAuthenticated: boolean;
    memberStatus: IMemberStatus;
    profile: IProfile;

    setLoading: (loading: boolean) => void;
    setAuthenticated: (authenticated: boolean) => void;
    setMemberStatus: (payload: IMemberStatus) => void;
    setProfile: (payload: IProfile) => void;
};
