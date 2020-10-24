import axios from 'axios';
import { SigninInfo, SignupInfo } from '@base/types/auth';

const domain = 'http://10.0.2.2:4000';
//const domain = 'http://127.0.0.1:4000';

const client = axios.create({
    baseURL: domain + '/users',
    method: 'post',
    headers:{ 'Content-Type': 'application/json'},
    responseType: 'json',
    withCredentials: true
});

type RefreshToken = string | null | undefined;

const makeAuthHeaders = (acceesToken: string, refreshToken: RefreshToken) => {
    let headers: any =  {
        'x-access-token': acceesToken,
    };
    refreshToken ? headers['x-refresh-token'] = refreshToken : null;

    return headers;
};


export const signin = async (signinInfo: SigninInfo) => {
    const res = await client.post('/login', JSON.stringify(signinInfo));

    return res;
};

export const confirmEmail = async (email: string) => {
    const res = await client.post('/emailconfirm', JSON.stringify({ email }));

    return res;
};

export const requestSignup = async (signupInfo: SignupInfo) => {
    console.log('before reqest signup');
    const res = await client.post('/signup', JSON.stringify(signupInfo));
    console.log('request signup api: ', res);
    return res;
};

export const refresh = async (accessToken: string, refreshToken: string) => {
    console.log('before refresh');
    const res = await client.post('./token', {
        headers: {
            ...makeAuthHeaders(accessToken, refreshToken)
        }
    });
    console.log('refresh res: ', res);
    return res;
}