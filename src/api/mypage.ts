import axois from 'axios';

import { makeClient, makeAuthHeaders } from './utils';

const client = makeClient();

export const getMyInfo = async (accessToken: string) => {
  const res = await client.get('/userinfo', {
    ...makeAuthHeaders(accessToken),
  });

  return res;
};

export const unregister = async (accessToken: string) => {
  const res = await client.post('/editinfo/quit', {
    ...makeAuthHeaders(accessToken),
  });

  return res;
};

export const saveMyInfo = async (accessToken: string, username: string) => {
  const res = await client.post('editinfo/name', { username}, {
    ...makeAuthHeaders
  });

  return res;
};