import axios from 'axios';

import { SigninInfo, SignupInfo } from '@base/types/auth';
import { makeClient, makeAuthHeaders } from './utils';

const client = makeClient();

export const confirmEmail = async (email: string) => {
    const res = await client.post('users/emailconfirm', JSON.stringify({ email }));

    return res;
};

export const signin = async (signinInfo: SigninInfo) => {
    console.log('before request signin ');
    const res = await client.post('users/login', JSON.stringify(signinInfo));

    return res;
};

export const requestSignup = async (signupInfo: SignupInfo) => {
    console.log('before reqest signup');
    const res = await client.post('users/signup', JSON.stringify(signupInfo));
    console.log('request signup api: ', res);
    return res;
};

export const refresh = async (accessToken: string, refreshToken: string, 
    isUserdataRequired: boolean = false) => {

    console.log('before refresh');
    const res = await client.post('/token', null, {
        headers: {
            ...makeAuthHeaders(accessToken, refreshToken)
        },
        data: {
            isUserdataRequired
        }
    });
    console.log('refresh res: ', res);
    return res;
}

export const checkToken = async (accessToken: string) => {
    console.log('before token check');
    console.log('acceess token in checToken:', accessToken);
    const res = await client.post('/autologin', null, {
        headers: {
            ...makeAuthHeaders(accessToken)
        }
    });
    console.log('token check res:', res);

    return res;
}