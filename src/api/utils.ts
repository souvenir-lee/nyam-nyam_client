import axios from 'axios';

const domain = 'http://10.0.2.2:4000';
//const domain = 'http://127.0.0.1:4000';

export const makeClient = (path?: string) => {
  return axios.create({
    baseURL: domain,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    withCredentials: true,
  });
};

type RefreshToken = string | null | undefined;

export const makeAuthHeaders = (
  acceesToken: string,
  refreshToken?: RefreshToken
) => {
  const headers: any = {
    'x-access-token': acceesToken,
  };
  refreshToken ? (headers['x-refresh-token'] = refreshToken) : null;

  return headers;
};
