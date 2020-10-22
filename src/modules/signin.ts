import { State } from 'react-native-gesture-handler';
import { ActionType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from '@base/api/auth';
import { SigninInfo, SigninState, SigninUserData } from '@base/types/auth';
import { storeTokens } from '@base/lib/auth';

//액션 타입

const SIGNIN_SUCCESS = 'signin/SIGNIN_SUCCESS' as const;

const SIGNIN_ERROR = 'signin/SIGNIN_ERROR' as const;

const REQUEST_SIGNIN = 'signin/REQUEST_SIGNIN' as const;


//액션 생성자

export const signinSuccess = (userdata: SigninUserData, accessToken: string) => ({
    type: SIGNIN_SUCCESS,
    payload: {
        userdata,
        accessToken
    }
});

export const signinError = (msg: string) => ({
    type: SIGNIN_ERROR,
    payload: msg
});

export const requestSignin = (signinInfo: SigninInfo) => ({
    type: REQUEST_SIGNIN,
    payload: signinInfo
});

const actions = {
    signinSuccess,
    signinError,
    requestSignin
};

type SigninAction = ActionType<typeof actions>

//리덕스 사가
function* requestSigninSaga(action: ReturnType<typeof requestSignin>){
    const signinInfo = action.payload;
    let res;

    try{
        res = yield call(authAPI.signin, signinInfo)

        const userdata = res.userdata
        let { access_token, refresh_token } = userdata;
        
        delete userdata['access_token'];
        delete userdata['refresh_token'];

        yield put(signinSuccess(userdata, access_token));

        //access token, refresh token 저장
        access_token = JSON.stringify(access_token);
        refresh_token = JSON.stringify(refresh_token);
        storeTokens(access_token, refresh_token);
    } catch(e){
        res = e.response;

        if (res.status == 400){
            yield put(signinError('아이디 또는 비밀번호를 입력해주세요.'));
        } else if (res.status == 404){
            yield put(signinError('계정이 존재하지 않습니다.'));
        } else {
            yield put(signinError(e.message));
        }
    }
}

export function* signinSaga(){
    yield takeLatest(REQUEST_SIGNIN, requestSigninSaga);
}

const initialState: SigninState = {
    isSignin: false,
    user: null,
    error: null,
    accessToken: null
};


//리듀서
export default function signin(
    state: SigninState = initialState,
    action: SigninAction
): SigninState {
    switch(action.type){
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isSignin: true,
                user: action.payload.userdata,
                error: null,
                accessToken: action.payload.accessToken
            };
        case SIGNIN_ERROR:
            return {
                ...state,
                isSignin: false,
                error: action.payload
            }
        default:
            return state;
    }
}''
