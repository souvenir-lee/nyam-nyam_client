import axios from 'axios';
import { SigninInfo, SignupInfo } from '@base/types/auth';

const domain = 'http://10.0.2.2:4000';
// const domain = 'http://127.0.0.1:4000';

const client = axios.create({
  baseURL: domain + '/users',
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  withCredentials: true,
});

const token = axios.create({
  baseURL: domain + '/token',
  method: 'post',
  withCredentials: true,
});

type RefreshToken = string | null | undefined;

const makeAuthHeaders = (acceesToken: string, refreshToken?: RefreshToken) => {
  const headers: any = {
    'x-access-token': acceesToken,
  };
  refreshToken ? (headers['x-refresh-token'] = refreshToken) : null;

  return headers;
};

export const signin = async (signinInfo: SigninInfo) => {
  const res = await client.post('/login', JSON.stringify(signinInfo));
  return res;
};

export const confirmEmail = async (form) => {
  await client.post('/emailconfirm', JSON.stringify({ email: form.email }));
  return form;
};

export const requestSignup = async (signupInfo: SignupInfo) => {
  const res = await client.post('/signup', JSON.stringify(signupInfo));
  console.log('request signup api: ', res);
  return res;
};

export const refresh = async (accessToken: string, refreshToken: string) => {
  const res = await token.post('/refresh', null, {
    headers: {
      ...makeAuthHeaders(accessToken, refreshToken),
    },
  });
  return res;
};

export const signinWithToken = async (accessToken: string) => {
  const res = await token.post('/login', null, {
    headers: {
      ...makeAuthHeaders(accessToken),
    },
  });

  return res;
};
