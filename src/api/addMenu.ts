import axios from 'axios';
import { domain, makeAuthHeaders } from './utils';

export const postAddMenu = async (data, accessToken: string) => {
  const addStoreResult = await axios.post(
    `${domain}/managemenu/addmenu`,
    data,
    {
      withCredentials: true,
      headers: {
        ...makeAuthHeaders(accessToken),
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  console.log('add menu res', addStoreResult);
  return addStoreResult;
};
