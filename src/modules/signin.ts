import { State } from 'react-native-gesture-handler';
import { ActionType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from '@base/api/auth';
import { signinInfo, SigninState, SigninType, User } from '@base/types/auth';
import { storeTokens } from '@base/lib/auth';

//액션 타입
const SET_SIGNIN_TYPE = 'signin/SIGNIN_TYPE' as const;

const SIGNIN_SUCCESS = 'signin/SIGNIN_SUCCESS' as const;

const SIGNIN_ERROR = 'signin/SIGNIN_ERROR' as const;

const REQUEST_SIGNIN = 'signin/REQUEST_SIGNIN' as const;


//액션 생성자
export const setSigninType = (signinType: SigninType) => ({
    type: SET_SIGNIN_TYPE,
    payload: signinType
});

export const signinSuccess = (userData: User) => ({
    type: SIGNIN_SUCCESS,
    payload: userData
});

export const signinError = (msg: string) => ({
    type: SIGNIN_ERROR,
    payload: msg
});

export const requestSignin = (signinInfo: signinInfo) => ({
    type: REQUEST_SIGNIN,
    payload: signinInfo
});

const actions = {
    setSigninType,
    signinSuccess,
    signinError,
    requestSignin
};

type SigninAction = ActionType<typeof actions>

//리덕스 사가
function* requestSigninSaga(action: ReturnType<typeof requestSignin>){
    const signinInfo = action.payload;
    let response;

    try{
        response = yield call(authAPI.signin, signinInfo)
        const userdata = response.userdata
        let { access_token, refresh_token } = userdata;
        
        delete userdata['access_token'];
        delete userdata['refresh_token'];

        yield put(signinSuccess(userdata));

        //access token, refresh token 저장
        access_token = JSON.stringify(access_token);
        refresh_token = JSON.stringify(refresh_token);
        storeTokens(access_token, refresh_token);

    } catch(e){
        yield put(signinError(response.status))
    }
}

export function* signinSaga(){
    yield takeLatest(REQUEST_SIGNIN, requestSigninSaga);
}

const initialState: SigninState = {
    signinType: null,
    isSignin: false,
    user: null,
    error: null
};


//리듀서
export default function signin(
    state: SigninState = initialState,
    action: SigninAction
): SigninState {
    switch(action.type){
        case SET_SIGNIN_TYPE:
            return {
                ...state,
                signinType: action.payload
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isSignin: true,
                user: action.payload
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
