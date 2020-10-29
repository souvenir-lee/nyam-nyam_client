import Axios from 'axios';
import axios from 'axios';

import { makeClient, makeAuthHeaders } from './utils';

const client = makeClient();

export const getMyInfo = async (accessToken: string) => {
  const res = await client.get('/info/info', {
    headers: {...makeAuthHeaders(accessToken)},
  });

  return res;
};

export const unregister = async (accessToken: string) => {
  const res = await client.post('/editinfo/quit', null, {
    headers: {...makeAuthHeaders(accessToken)},
  });

  return res;
};

export const saveMyInfo = async (accessToken: string, username: string) => {
  console.log('data in saveMyInfo api:', username);
  const res = await client.post('/editinfo/name', JSON.stringify({ username: username }), {
    headers: {...makeAuthHeaders(accessToken)}
  });
 
  console.log('after request save myinfo');

  return res;
};

export const changePassword = async (accessToken: string, currentPassword: string, 
  password: string) => {
  console.log('data in changePassword api:', currentPassword, password);
  
  const res = await client.post('editinfo/password', JSON.stringify({ 
    currentPassword,
    password
  }), {
    headers: {...makeAuthHeaders(accessToken)}
  });
  console.log('after password change api call')
  return res;
}