export interface IProfile {
    member_id: string;
    username: string;
    name: string;
    nik: string;
    phone: string;
    img_document: string;
    created_at: string;
}

export interface IProfileResponse {
    id: number;
    is_verify: boolean;
    status: string;
    profile: IProfile | null;
}