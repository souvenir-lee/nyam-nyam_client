import axios from 'axios';
import { makeAuthHeaders, domain } from './utils';

export const getUpdateSalesData = async (store, accessToken) => {
  const itemLists = await axios.get(`${domain}/update/sales/${store}`, {
    withCredentials: true,
    headers: {
      ...makeAuthHeaders(accessToken),
    },
    responseType: 'json',
  });

  return itemLists.data;
};

export const postSalesUploadData = async (
  storeId,
  data,
  accessToken: string
) => {
  const sendJSON = JSON.stringify({ storeId, data });
  console.log('send', sendJSON);
  const salesUploadResult = await axios.post(
    `${domain}/update/sales`,
    sendJSON,
    {
      withCredentials: true,
      responseType: 'json',
      headers: {
        ...makeAuthHeaders(accessToken),
        'Content-Type': 'application/json',
      },
    }
  );

  return salesUploadResult;
};
