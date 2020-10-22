import axios from 'axios';
import { signinSuccess } from './fakeData';
import { SigninInfo, SigninSuccess } from '@base/types/auth';

const domain = 'http://10.0.2.2:4000';
//const domain = 'http://127.0.0.1:4000';

const client = axios.create({
    baseURL: domain + '/users',
    method: 'post',
    headers:{ 'Content-Type': 'application/json'},
    responseType: 'json',
    withCredentials: true
});

export const signin = async (signinInfo: SigninInfo) => {
    const res: any = await client.post('/login', JSON.stringify(signinInfo));

    return res;
}

export const confirmEmail = async (email: string) => {
    const res: any = await client.post('emailconfirm', JSON.stringify({ email }));

    return res;
}