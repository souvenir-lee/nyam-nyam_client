import { AxiosError } from 'axios';
import { ActionType } from 'typesafe-actions';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import * as authAPI from '@base/api/auth';
import { SigninInfo, SigninState, SigninUserData } from '@base/types/auth';
import { storeTokens } from '@base/lib/auth';
import { requestAccessTokenSuccess } from '@base/modules/auth';

//액션 타입
export const REQUEST_SIGNIN = 'signin/REQUEST_SIGNIN' as const;
export const REQUEST_SIGNIN_SUCCESS = 'signin/REQUEST_SIGNIN_SUCCESS' as const;
export const REQUEST_SIGNIN_ERROR = 'signin/REQUEST_SIGNIN_ERROR' as const;
export const REQUEST_SIGNIN_WITH_TOKEN = 'signin/REQUEST_SIGNIN_WITH_TOKEN' as const;
export const REQUEST_SIGNIN_WITH_TOKEN_SUCCESS = 'signin/REQUEST_SIGNIN_WITH_TOKEN_SUCCESS' as const;
export const REQUEST_SIGNIN_WITH_TOKEN_ERROR = 'signin/REQUEST_SIGNIN_WITH_TOKEN_ERROR' as const;
export const CLEAR_USERDATA = 'signin/CLEAR_USERDATA';

//액션 생성자
export const requestSignin = (signinInfo: SigninInfo) => ({
  type: REQUEST_SIGNIN,
  payload: signinInfo,
});

export const requestSigninSuccess = (signinResult) => ({
  type: REQUEST_SIGNIN_SUCCESS,
  payload: signinResult,
});

export const requestSigninFailure = (error: AxiosError) => ({
  type: REQUEST_SIGNIN_ERROR,
  payload: error,
});

export const requestSigninWithToken = () => ({
  type: REQUEST_SIGNIN_WITH_TOKEN,
});

export const clearUserData = () => ({
  type: CLEAR_USERDATA,
});

const actions = {
  requestSigninSuccess,
  requestSigninFailure,
  requestSignin,
  requestSigninWithToken,
};

type SigninAction = ActionType<typeof actions>;

//리덕스 사가
export function* requestSigninSaga(action: ReturnType<typeof requestSignin>) {
  const signinInfo = action.payload;
  try {
    const res = yield call(authAPI.signin, signinInfo);

    const userdata = res.data;
    const { access_token, refresh_token } = userdata;

    delete userdata.access_token;
    delete userdata.refresh_token;

    yield put(requestAccessTokenSuccess(access_token));
    yield put(requestSigninSuccess(userdata));
    yield call(storeTokens, access_token, refresh_token);
  } catch (error) {
    yield put(requestSigninFailure(error));
  }
}

export function* requestSigninWithTokenSaga(action) {
  try {
    const { data: accessToken } = yield select(
      (state) => state.auth.accessToken
    );
    const userdata = yield call(authAPI.signinWithToken, accessToken);

    yield put(requestSigninSuccess(userdata));

    //access token, refresh token 저장
  } catch (error) {
    yield put(requestSigninFailure(error));
  }
}

export function* signinSaga() {
  yield takeLatest(REQUEST_SIGNIN, requestSigninSaga);
  yield takeLatest(REQUEST_SIGNIN_WITH_TOKEN, requestSigninWithTokenSaga);
}

const initialState: SigninState = {
  isSignin: false,
  userdata: null,
  loading: false,
  error: null,
};

//리듀서
export default function signin(
  state: SigninState = initialState,
  action: SigninAction
): SigninState {
  switch (action.type) {
    case REQUEST_SIGNIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_SIGNIN_SUCCESS:
      return {
        ...state,
        isSignin: true,
        userdata: action.payload,
        loading: false,
        error: null,
      };
    case REQUEST_SIGNIN_ERROR:
      return {
        ...state,
        isSignin: false,
        loading: false,
        error: action.payload,
      };
    case REQUEST_SIGNIN_WITH_TOKEN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CLEAR_USERDATA:
      return {
        isSignin: false,
        userdata: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
