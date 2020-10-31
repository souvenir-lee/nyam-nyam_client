import axios from 'axios';

export const domain = 'http://10.0.2.2:4000';
// export const domain = 'http://3.35.243.42:4000';

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

export const convertStoreObjToArray = (store) => {
  if (!store) {
    return [];
  }
  const storeIds = Object.getOwnPropertyNames(store);
  const storeLists = [];
  storeIds.forEach((storeId, index) => {
    storeLists.push(store[storeId]);
  });
  return storeLists;
};
