import axios from 'axios';
import { SigninInfo, SignupInfo } from '@base/types/auth';
import { makeClient, makeAuthHeaders } from './utils';

const client = makeClient();

export const confirmEmail = async (email: string) => {
  const res = await client.post(
    'users/emailconfirm',
    JSON.stringify({ email })
  );
  return res;
};

export const signin = async (signinInfo: SigninInfo) => {
  console.log('before request signin ');
  const res = await client.post('users/login', JSON.stringify(signinInfo));
  let { storedata } = res.data;
  storedata = storedata.reduce((acc: any, val: any) => {
    const id = val.id;
    acc[id] = val;
    return acc;
  }, {});
  res.data.storedata = storedata;
  console.log('res', res);
  return res;
};

export const requestSignup = async (signupInfo: SignupInfo) => {
  console.log('before reqest signup');
  const res = await client.post('users/signup', JSON.stringify(signupInfo));
  console.log('request signup api: ', res);
  return res;
};

export const refresh = async (
  accessToken: string,
  refreshToken: string,
) => {
  console.log('before refresh');
  const res = await client.post('/token', null, {
    headers: {
      ...makeAuthHeaders(accessToken, refreshToken),
    },
  });
  return res;
};

export const autoSignin = async (accessToken: string) => {
  console.log('before auto signin');
  const res = await client.post('/autologin', null, {
    headers: {
      ...makeAuthHeaders(accessToken),
    },
  });
  let { storedata } = res.data;
  storedata = storedata.reduce((acc: any, val: any) => {
    const id = val.id;
    acc[id] = val;
    return acc;
  }, {});
  res.data.storedata = storedata;
  return res;
};

export const signout = async (accessToken: string) => {
  const res = await client.post('/users/logout', null, {
    headers: {
      ...makeAuthHeaders(accessToken),
    },
  });
  console.log('after signout api call');
  return res;
};

