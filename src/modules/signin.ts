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

export const initializeSignin = (service: 'customer' | 'store') => {
  return {
    type: INITIALIZE_SIGNIN,
    payload: service,
  };
};

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

export const validToken = (accessToken: string, userdata: SigninUserData) => ({
  type: VALID_TOKEN,
  payload: { accessToken, userdata },
});

const actions = {
  requestSigninSuccess,
  requestSigninFailure,
  requestSignin,
  requestSigninWithToken,
};

type SigninAction = ActionType<typeof actions>;

//리덕스 사가
function* requestSigninSaga(action: ReturnType<typeof requestSignin>) {
  const signinInfo = action.payload;
  let res;
  console.log('before signin');

  try {
    res = yield call(authAPI.signin, signinInfo);
    console.log('res success: ', res.data.userdata);
    const userdata = res.data.userdata;
    let { access_token, refresh_token } = userdata;

    delete userdata.access_token;
    delete userdata.refresh_token;

    yield put(signinSuccess(userdata, access_token));

    //access token, refresh token 저장
    access_token = JSON.stringify(access_token);
    refresh_token = JSON.stringify(refresh_token);
    storeTokens(access_token, refresh_token);
  } catch (e) {
    res = e.response;
    console.log('error:', res, e);
    if (!res) {
      yield put(signinError('알려지지 않은 에러가 발생했습니다.'));
      return;
    }

    if (res.status == 400) {
      yield put(signinError('아이디 또는 비밀번호를 입력해주세요.'));
    } else if (res.status == 404) {
      yield put(signinError('계정이 존재하지 않습니다.'));
    } else {
      yield put(signinError(e.message));
    }
  }
}

const startAuthCheckSaga = createAuthCheckSaga(true);

export function* signinSaga() {
  yield takeEvery(CHECK_TOKEN, startAuthCheckSaga);
  yield takeLatest(REQUEST_SIGNIN, requestSigninSaga);
}

const initialState: SigninState = {
  isSignin: false,
  service: null,
  user: null,
  loading: false,
  error: null,
  accessToken: null,
};

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
    case INITIALIZE_SIGNIN:
      return {
        ...state,
        service: action.payload,
        user: null,
        loading: false,
        error: null,
        accessToken: null,
      };
    case REQUEST_SIGNIN:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSignin: true,
        user: action.payload.userdata,
        loading: false,
        error: null,
        accessToken: action.payload.accessToken,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        isSignin: false,
        loading: false,
        error: action.payload,
      };
    case VALID_TOKEN:
      return {
        ...state,
        isSignin: true,
        accessToken: action.payload.accessToken,
        user: action.payload.userdata,
      };
    case INVALID_TOKEN:
      return {
        ...initialState,
        service: state.service,
        error: getAuthErrMsg(action.payload),
      };
    default:
      return state;
  }
}
