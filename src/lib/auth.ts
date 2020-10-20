import * as SecureStore from 'expo-secure-store';

//access token, refresh token 저장
export async function storeTokens(accessToken: string, refreshToken: string){
    
    try{
        await SecureStore.setItemAsync('access_token', accessToken);
        await SecureStore.setItemAsync('refresh_token', refreshToken);
        let token = await SecureStore.getItemAsync('access_token');
        console.log('token: ', token);
    } catch(e){
        console.error('cannot store tokens:', e);
    }
}

//access token 확인

//access token 유효기간 확인

//refresh api 요청

export function createAuthCheckSaga(){

};