import * as SecureStore from 'expo-secure-store';
import { TextPropTypes } from 'react-native';
import { decode } from 'js-base64';
import { fork, take, put, call, select } from 'redux-saga/effects';

import { invalidToken, signinError, signinSuccess, validToken } from '@base/modules/signin';
import * as authAPI from '@base/api/auth';

//테스트 코드
const testToken = async (token: string, type: string) => {
    console.log('리프레시 토큰 테스트 시작');

    if(!token){
        if(type === 'refresh'){
            const token = await SecureStore.getItemAsync('refresh_token');
        } else if(type ==='access'){
            const token = await SecureStore.getItemAsync('access_token');
        }
    }
    console.log(type, ': ', token);

    if(token){
        try{
            const payload = JSON.parse(decode(token.split('.')[1]));
            console.log('test token payload: ', payload);
            const { exp } = payload;  
            console.log('exp: ', exp);
            console.log(type, 'token expired:', exp < (Date.now() / 1000));
            return false;
        } catch(e){
            console.error('invalid token')
        }
    } else {
        console.error(type, 'token not exist');
    }
};

//access token, refresh token 저장
export async function storeTokens(accessToken: string, refreshToken?: string){
    try{
        await SecureStore.setItemAsync('access_token', accessToken);

        if(refreshToken){
            await SecureStore.setItemAsync('refresh_token', refreshToken);
        }

        let access = await SecureStore.getItemAsync('access_token');
        let refresh = await SecureStore.getItemAsync('access_token');
        console.log('access:', access, 'refresh:', refresh);
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
        
        console.log('is token expired: ', exp < (Date.now() / 1000));
        if(exp < (Date.now() / 1000)) return true; //만료 시간이 지났다면
        else false
    } catch(e){
        yield put(invalidToken(403));
        throw Error('유효한 토큰이 아닙니다.');;
    }
};

const preventTokenCheckIfAlreadyChecked = (error: string ,service: 'store' | 'customer') => {
    if(error && service){  //서비스 중에 에러가 난 것이기 때문에 리소스 요청 중에 인증이 실패한 것
        console.log('인증 실패');
        return true;
    }    

    return false;
};

function* verifyToken(token: string){
    //access token이 존재한다면 만료기간 확인
    let isExpired;
    try{
        isExpired = yield call(isTokenExpired, token)
    } catch(e) {
        console.error('token이 유효하지 않음');
        yield put(invalidToken(403));
        return null;
    }

    return isExpired;
}
 
function* refresh(accessToken: string, refreshToken: string, isAppLoaded: boolean = false){
    let res;

    try{
        res = yield call(authAPI.refresh, accessToken, refreshToken, isAppLoaded);
        console.log('refresh result:', res);    
        //access token 재발급이 성공했다면
        const { access_token } = res.data; //유저 정보도 받아와야 함  

        storeTokens(access_token);  

        // 토큰과 유저정보 저장
        yield put(validToken(accessToken));

        return true;
    } catch(e){  //refresh token이 유효하지 않다면 
        res = e.response;
        console.error('refresh api error:', res);

        yield put(invalidToken(res.status));    
        return false;
    } 
}

function* fetchUserData(accessToken: string){
    try{
        const res = yield call(authAPI.autoSignin, accessToken);
        const { userdata, storedata } = res;
        console.log('auto signin success:', res);

        yield put(signinSuccess(userdata, storedata, accessToken));
    } catch(e){
        const res = e.response;
        console.log('auto signin failed:', res);        
        
        yield put(signinError(res.status));
    }
}

export function* autoSignin(){
    const { error, service } = yield select(state => state.signin);
    
    //리소스 요청 중에 인증 실패해서 인증 페이지로 이동했을 때는 이전에 이미 토큰을 체크했기 때문에 토큰 체크 안함
    if(preventTokenCheckIfAlreadyChecked(error, service)){
        return false;
    }

    const accessToken = yield call([SecureStore, 'getItemAsync'], 'access_token');
    console.log('auto signin token:', accessToken);

    if(accessToken && typeof accessToken === 'string'){ //access token이 존재한다면

        const isAccessTokenInvalid = yield call(verifyToken, accessToken);
        //access token이 유효하지 않다면
        if(isAccessTokenInvalid === null) return false; 

        if(isAccessTokenInvalid){  //access token 만료기간이 유효하지 않다면
            console.log('access token의 만료기간 지남');
            const refreshToken = yield call([SecureStore, 'getItemAsync'], 'refresh_token');

            if(refreshToken && typeof refreshToken === 'string'){ 
                
                //refresh token의 만료기간을 확인한다
                const isRefreshTokenInvalid = yield call(verifyToken, refreshToken);

                if(isRefreshTokenInvalid === null) false; //토큰이 유효하지 않다면

                if(isRefreshTokenInvalid){  //refresh token의 만료기간이 유효하지 않다면
                    console.error('refresh token is expired');
                    testToken(refreshToken, 'refresh'); 

                    yield put(invalidToken(401));   

                } else { //refresh token의 만료 기간이 유효하다면 access token을 새로 발급받는다 
                    yield call(refresh, accessToken, refreshToken);
                }   
            } else { //refresh token이 존재하지 않으면
                console.error('refresh token이 존재하지 않음')
                yield put(invalidToken(400));
            }   
        } else {  //access token이 만료기간이 유효하다면
            yield call(fetchUserData, accessToken);
        }

    } else { //access token이 존재하지 않다면
        yield put(invalidToken(400));
    }
}

export function* checkToken(){

    //secure storage에서 access token 얻기
    const accessToken = yield call([SecureStore, 'getItemAsync'], 'access_token');
    console.log('access token when check token: ', accessToken);

    //access token이 존재한다면 만료기간 확인
    if(accessToken && typeof accessToken === 'string'){

        const isAccessTokenInvalid = yield call(verifyToken, accessToken);
        //access token이 유효하지 않다면
        if(isAccessTokenInvalid === null) return false; 

        if(isAccessTokenInvalid){
            console.log('access token의 만료기간 지남');
            const refreshToken = yield call([SecureStore, 'getItemAsync'], 'refresh_token');
        
            if(refreshToken && typeof refreshToken === 'string'){
                
                //refresh token의 만료기간을 확인한다
                const isRefreshTokenInvalid = yield call(verifyToken, refreshToken);

                if(isRefreshTokenInvalid === null) false; //토큰이 유효하지 않다면

                if(isRefreshTokenInvalid){  //refresh token의 만료기간이 유효하지 않다면
                    console.error('refresh token is expired');
                    testToken(refreshToken, 'refresh'); 

                    yield put(invalidToken(401));   

                    return false;
                } else { //refresh token의 만료 기간이 유효하다면 access token을 새로 발급받는다 
                  const isRefreshSuccess = yield call(refresh, accessToken, refreshToken);
                  return isRefreshSuccess;
                }   
            } else { //refresh token이 존재하지 않으면
                console.error('refresh token이 존재하지 않음')
                yield put(invalidToken(400));
                return false;
            }   
        } else {  //access token의 만료 기간이 유효하다면
            return true;
        }
    } else { //access token이 존재하지 않다면
        console.error('access token이 존재하지 않음');
        return false;
    }
};

type Sagas = any[]

export function createAuthCheckSaga(isAppLoaded: boolean = false){
    if(isAppLoaded){
        return function* (){
            console.log('check token in loading');
            yield call(autoSignin);
        }
    } else {
        return function* (actions: any[], sagas: Sagas){
            
            while(true){

                const action = yield take(actions);
                console.log('saga action: ', action);
        
                const isTokenValid = yield call(checkToken);
                if(isTokenValid){
                    const accessToken = yield select(state => state.signin.accessToken);
                    console.log('auth saga: true, ', accessToken);
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
    console.error('auth error:', statusCode);
    if(statusCode == 401){
        yield put(invalidToken(statusCode));
        return true;
    } else if(statusCode == 403){
        yield put(invalidToken(statusCode));
        return true;
    }

    return false;
};