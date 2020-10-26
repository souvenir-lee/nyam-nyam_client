import axois from 'axios';

import { makeClient, makeAuthHeaders } from './utils';

const client = makeClient();

export const getUserinfo = async (accessToken: string) => {
    const res = await client.get('/userinfo', {
        ...makeAuthHeaders(accessToken)
    });

    return res;
}