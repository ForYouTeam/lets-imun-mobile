export interface IRegisterValidationMsg {
  username: null | string[];
  password: null | string[];
  password_confirmation: null | string[];
}

export interface IRegisterResponse {
  status: number | string;
  message: string;
  data: any;
  error: any | null;
}

export interface ILoginSuccessResponse {
  token: string;
  is_member_verify: boolean | string;
}

export interface ILoginServiceResponse {
  status: number | string;
  message: string;
  data: any | null;
  error: any | null;
}
