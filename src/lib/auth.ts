import * as SecureStore from 'expo-secure-store';
import { TextPropTypes } from 'react-native';
import { decode } from 'js-base64';
import { fork, take, put, call, select } from 'redux-saga/effects';

import { invalidToken, validToken } from '@base/modules/signin';
import * as authAPI from '@base/api/auth';

//access token, refresh token 저장
export async function storeTokens(accessToken: string, refreshToken?: string){
    try{
        await SecureStore.setItemAsync('access_token', accessToken);

        if(refreshToken){
            await SecureStore.setItemAsync('refresh_token', refreshToken);
        }

        let token = await SecureStore.getItemAsync('access_token');
    } catch(e){
        console.error('cannot store tokens:', e);
    }
}

export async function clearTokens(){
    try{
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        let t = await SecureStore.getItemAsync('access_token');
        console.log('clear token:', t);
    } catch(e){
        console.error( e);
    }
};

//token 만료기간 체크
export function* isTokenExpired(token: string){
    //access token의 payload를 분리한 후 base64 디코딩
    try{
        const payload = JSON.parse(decode(token.split('.')[1]));
        console.log('token payload: ', payload);
        const { exp } = payload;  //토큰 만료시간
    
        if(exp < (Date.now() / 1000)) return true; //만료 시간이 지났다면
  
        return false;
    } catch(e){
        yield put(invalidToken(403));
        throw Error('유효한 토큰이 아닙니다.');;
    }
};

export function* checkToken(isAppLoaded: boolean = false){
    //리소스 요청 중에 인증 실패해서 인증 페이지로 이동했을 때는 토큰 체크 안함
    const { error, service } = yield select(state => state.signin);
    if(error && service){  //서비스 중에 에러가 난 것이기 때문에 리소스 요청 중에 인증이 실패한 것
        console.log('리소스 요청 중에 인증 실패');
        return false;
    }    

    //secure storage에서 access token 얻기
    let accessToken;
    if(isAppLoaded){
        accessToken = yield call([SecureStore, 'getItemAsync'], 'access_token');
    } else {
        accessToken = yield select(state => state.signin.accessToken);
    }
    console.log('access token: ', accessToken);
    //access token이 존재한다면 만료기간 확인
    if(accessToken && typeof accessToken === 'string'){
        let isTokenExpired_;
        try{
            isTokenExpired_ = yield call(isTokenExpired, accessToken)
        } catch(e) {
            console.error('access token이 유효하지 않음');
            yield put(invalidToken(403));
            clearTokens();

            return false;
        }

        if(isTokenExpired_){
            console.log('access token의 만료기간 지남');
            const refreshToken = yield call([SecureStore, 'getItemAsync'], 'refresh_token');
        
            if(refreshToken && typeof refreshToken === 'string'){
                //refresh token의 만료기간을 확인한다
                if(isTokenExpired(refreshToken)){
                    //isSignin = false -> navigation rerendering
                    console.error('refresh token이 유효하지 않음')
                    yield put(invalidToken(401));
                    clearTokens();

                    return false;
                } else { //refresh token의 만료 기간이 유효하다면 access token을 새로 발급받는다 
                    let res;
                    try{
                        res = yield call(authAPI.refresh, accessToken, refreshToken, true);
                        console.log('refresh result:', res);

                        //access token 재발급이 성공했다면
                        const { access_token, userdata } = res.data; //유저 정보도 받아와야 함

                        storeTokens(access_token);

                        if(isAppLoaded){
                            //토큰과 유저정보 저장
                            yield put(validToken(accessToken, userdata));
                        }                        

                        return true;
                    } catch(e){  //refresh token이 유효하지 않다면 isSignin = false
                        res = e.response;
                        console.log('refresh error:', res);
                        
                        yield put(invalidToken(res.status));

                        return false;
                    } 
                }

            } else { //refresh token이 없으면 isSignin = false
                console.error('refresh token이 존재하지 않음')
                yield put(invalidToken(400));
                return false;
            }

        } else {  //access token의 만료 기간이 유효하다면
            //토큰을 체크하는 api 요청해서 응답으로 유저정보를 받아와야 함
            let res;
            try{
                //token check가 성공했을 떄
                if(isAppLoaded){
                    res = yield call(authAPI.checkToken, accessToken);
                    const { userdata } = res;
                    console.log('token check success:', res);
                    yield put(validToken(accessToken, userdata))
                }

                return true;
            } catch(e){
                //토큰이 유효하지 않거나 해당 유저정보가 없을 때 isSignin = false
                console.error('access token invalid or have not userinfo:', e);
                res = e.response;
                yield put(invalidToken(res.status));
            }

            return true;
        }
    } else { //access token이 존재하지 않다면 isSignin = false
        console.log('access token이 존재하지 않음');
        yield put(invalidToken(400));
        
        return false;
    }
};

type Sagas = any[]

export function createAuthCheckSaga(isAppLoaded: boolean = false){
    if(isAppLoaded){
        return function* (){
            console.log('check token in loading');
            yield call(checkToken, isAppLoaded);
        }
    } else {
        return function* (actions: string[], sagas: Sagas){
            
            while(true){
                const action = yield take(actions);
                console.log('saga action: ', action);
        
                const isTokenValid = yield call(checkToken);
                if(isTokenValid){
                    const accessToken = yield select(state => state.signin.accessToken);

                    for(let i = 0; i < sagas.length; i++){
                        //사가에서 api요청 보낼 때 헤더에 access token 추가
                        yield fork(sagas[i], action, accessToken);  
                    }
                }
            }
        };
    }

}

export const getAuthErrMsg = (statusCode: string | number) => {
    if(statusCode == 400){
        return '토큰이 존재하지 않습니다.'
    } else if(statusCode == 401){
        return  '토큰 만료기간이 지났습니다';
    } else if (statusCode == 403){
        return '유효한 토큰이 아닙니다.';
    }
    
    return null;
};


//리소스 api에서 인증 실패시 에러 처리
export function* handleIfAuthError(statusCode: number | string){
    if(statusCode == 401){
        yield put(invalidToken(statusCode));
        return true;
    } else if(statusCode == 403){
        yield put(invalidToken(statusCode));
        return true;
    }

    return false;
};