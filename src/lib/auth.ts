import * as SecureStore from 'expo-secure-store';
import { TextPropTypes } from 'react-native';
import { decode } from 'js-base64';
import { fork, take, put, call, select } from 'redux-saga/effects';

import { invalidToken, validToken } from '@base/modules/signin';
import * as authAPI from '@base/api/auth';

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

export async function clearTokens(){
    try{
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
    } catch(e){
        console.error( e);
    }
};

//token 만료기간 체크
export const isTokenExpired = (token: string) => {
    //access token의 payload를 분리한 후 base64 디코딩
    const payload = JSON.parse(decode(token.split('.')[1]));
    console.log('token payload: ', payload);
    const { exp } = payload;  //토큰 만료시간

    if(exp < (Date.now() / 1000)) return true; //만료 시간이 지났다면
    return false;
};

export function* checkToken(isAppLoaded: boolean = false){
    //secure storage에서 access token 얻기
    let accessToken;
    if(isAppLoaded){
        accessToken = yield call(SecureStore.getItemAsync, 'access_token');
    } else {
        accessToken = yield select(state => state.signin.accessToken);
    }

    //access token이 존재한다면 만료기간 확인
    if(accessToken && typeof accessToken === 'string'){
        if(isTokenExpired(accessToken)){
            const refreshToken = yield call([SecureStore, 'getItemAsync'], 'refresh_token');
        
            if(refreshToken && typeof refreshToken === 'string'){
                //refresh token의 만료기간을 확인한다
                if(isTokenExpired(refreshToken)){
                    //isSignin = false -> navigation rerendering  
                    yield put(invalidToken(401));
                    clearTokens();

                    return false;
                } else { //refresh token의 만료 기간이 유효하다면 access token을 새로 발급받는다 
                    let res;
                    try{
                        res = yield call([authAPI, 'refresh'], 'accessToken', 'refreshToken');
                        console.log('refresh result:', res);
                        const { access_token, refresh_token } = res.data; //유저 정보도 받아와야 함

                        storeTokens(access_token, refresh_token);

                        if(isAppLoaded){
                            //토큰과 유저정보 저장
                            yield put(validToken(accessToken));
                        }                        

                        return true;
                    } catch(e){  //refresh token이 유효하지 않다면 isSignin = false
                        res = e.response;
                        console.log('refresh result:', res);

                        yield put(invalidToken(403));

                        return false;
                    } 
                }

            } else { //refresh token이 없으면 isSignin = false
                yield put(invalidToken(400));
                return false;
            }
        } else {  //access token의 만료 기간이 유효하다면
            //토큰을 체크하는 api 요청해서 응답으로 유저정보를 받아와야 함
            
            //토큰이 유효하지 않거나 해당 유저정보가 없을 때 에러 처리


            return true;
        }
    } else { //access token이 존재하지 않다면 isSignin = false
        yield put(invalidToken(400));
        
        return false;
    }

};

type Sagas = ((action: string) => void)[]

export function createAuthCheckSaga(isAppLoaded: boolean = false, 
    actions: string[] | undefined, sagas: Sagas | undefined){
    
    if(isAppLoaded){
        return function* (){
            
        }
    } else {
        return function* (){
            
            while(true){
                const action = yield take(actions);
                console.log('saga action: ', action);
        
                const isTokenValid = yield call(checkToken);
                if(isTokenValid && ){
                    for(let i = 0; i < sagas.length; i++){
                        //사가에서 api요청 보낼 때 헤더에 access token 추가
                        yield fork(sagas[i], action);  
                    }
                }
            }
        };
    }

}

//리소스 api에서 인증 실패시 에러 처리
