import axios from 'axios';
import { domain, makeAuthHeaders } from './utils';

export const getMyStore = async (accessToken: string) => {
  const storeResult = await axios.get(`${domain}/managestore/mystore`, {
    withCredentials: true,
    responseType: 'json',
    headers: {
      ...makeAuthHeaders(accessToken),
    },
  });

  const storedata = storeResult.data.reduce((acc: any, val: any) => {
    const id = val.id;
    acc[id] = val;
    return acc;
  }, {});

  return storedata;
};

export const postNewStore = async (data, accessToken: string) => {
  const addStoreResult = await axios.post(
    `${domain}/managestore/addstore`,
    JSON.stringify(data),
    {
      withCredentials: true,
      responseType: 'json',
      headers: {
        ...makeAuthHeaders(accessToken),
        'Content-Type': 'application/json',
      },
    }
  );

  return addStoreResult;
};
