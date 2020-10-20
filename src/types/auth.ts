export type signinInfo = {
    email: string,
    password: string
};

export type SigninType = 'customer' | 'store' | null;

export type User = {
    id: number | string,
    email: string | null,
    nickname: string | null,
    userImg: any,
    social: boolean | null
} | null;

export type SigninState = {
    signinType: SigninType;
    isSignin: boolean;
    user : User;
    error: string | null;
};

export type InputField = {
  input: string | '';
  errMsg: string | null;
}


export type UserInfo = {
  email: string;
  password: string;
  username: string;
};