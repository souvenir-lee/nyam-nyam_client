import { State } from 'react-native-gesture-handler';
import { action, ActionType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from '@base/api/auth';
import { signinInfo, SigninState, SigninType, User } from '@base/types/auth';

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

type SigninAction =
    | ReturnType<typeof setSigninType>
    | ReturnType<typeof signinSuccess>
    | ReturnType<typeof signinError>
    | ReturnType<typeof requestSignin>;


//리덕스 사가
function* requestSigninSaga(action: any){
    const signinInfo = action.signinInfo;
    let response;

    try{
        response = yield call(authAPI.signin, signinInfo)
        yield put(signinSuccess(response.userData))
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
