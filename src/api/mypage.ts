import { makeClient, makeAuthHeaders } from './utils';
import { makeFormData } from './utils';
const client = makeClient();

export const getMyInfo = async (accessToken: string) => {
  const res = await client.get('/info/info/1', {
    headers: { ...makeAuthHeaders(accessToken) },
  });

  return res;
};

export const unregister = async (accessToken: string) => {
  const res = await client.post('/editinfo/quit', null, {
    headers: { ...makeAuthHeaders(accessToken) },
  });

  return res;
};

export const saveMyInfo = async (accessToken: string, username: string) => {
  console.log('data in saveMyInfo api:', username);
  const res = await client.post(
    '/editinfo/name',
    JSON.stringify({ username: username }),
    {
      headers: { ...makeAuthHeaders(accessToken) },
    }
  );

  console.log('after request save myinfo');

  return res;
};

export const changePassword = async (
  accessToken: string,
  currentPassword: string,
  password: string
) => {
  console.log('data in changePassword api:', currentPassword, password);

  const res = await client.post(
    '/editinfo/password',
    JSON.stringify({
      currentPassword,
      password,
    }),
    {
      headers: { ...makeAuthHeaders(accessToken) },
    }
  );
  console.log('after password change api call');
  return res;
};

export const getMyStoreList = async (accessToken: string) => {
  const res = await client.get('/managestore/mystore', {
    headers: { ...makeAuthHeaders(accessToken) },
  });

  return res;
};

export const deleteMyStoreItem = async (
  accessToken: string,
  storeId: string | number
) => {
  console.log('delete mystoreItem', accessToken, storeId);
  const res = await client.post(
    '/managestore/deletestore',
    JSON.stringify({ storeId }),
    {
      headers: { ...makeAuthHeaders(accessToken) },
    }
  );

  return res;
};

export const uploadPhoto = async (
  accessToken: string,
  type: 'image',
  uri: string
) => {
  const formData = makeFormData(type, uri);
  const res = await client.post('editinfo/image', formData, {
    headers: {
      ...makeAuthHeaders(accessToken),
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const getMyMenuList = async (
  accessToken: string,
  storeId: string | number
) => {
  const res = await client.get(`managemenu/menu/${storeId}`, {
    headers: {
      ...makeAuthHeaders(accessToken),
    },
  });

  return res;
};
