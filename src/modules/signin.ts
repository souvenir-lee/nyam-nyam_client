import { ActionType } from 'typesafe-actions';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import * as SecureStore from 'expo-secure-store';

import * as authAPI from '@base/api/auth';
import {
  SigninInfo,
  SigninState,
  SigninStoreData,
  SigninUserData,
  Store,
} from '@base/types/auth';
import {
  storeTokens,
  createAuthCheckSaga,
  getAuthErrMsg,
  clearTokens,
} from '@base/lib/auth';
import {
  SAVE_MY_INFO_TO_REDUX,
  saveMyInfoToRedux,
  removeSignin,
  REMOVE_SIGNIN,
  SAVE_MY_STORE_LIST_TO_REDUX,
  saveMyStoreListToRedux,
  deleteMyStoreItemInRedux,
  SAVE_MY_PHOTO_TO_REDUX,
  saveMyPhotoToRedux,
} from './mypage';
import salesPredictNavigation from '@base/navigation/salesPredict';

//액션 타입
const INITIALIZE_SIGNIN = 'signnin/INITIALIZE_SIGNIN' as const;
const REQUEST_SIGNIN = 'signin/REQUEST_SIGNIN' as const;
const SIGNIN_SUCCESS = 'signin/SIGNIN_SUCCESS' as const;
const SIGNIN_ERROR = 'signin/SIGNIN_ERROR' as const;
const REFRESH = 'signin/REFRESH' as const;
const CHECK_TOKEN = 'signin/CHECK_TOKEN' as const;
const INVALID_TOKEN = 'signin/INVALID_TOKEN' as const;
const VALID_TOKEN = 'signin/VALID_TOKEN' as const;
const SIGNOUT = 'signin/SIGNOUT' as const;
const SIGNOUT_SUCCESS = 'signin/SIGNOUT_SUCCESS' as const;
const UPDATE_STORE = 'signin/UPDATE_STORE' as const;
const UPDATE_USERNAME = 'signin/UPDATE_USERNAME' as const;
//액션 생성자

export const initializeSignin = (service?: 'customer' | 'store') => {
  return {
    type: INITIALIZE_SIGNIN,
    payload: service,
  };
};

export const requestSignin = (signinInfo: SigninInfo) => ({
  type: REQUEST_SIGNIN,
  payload: signinInfo,
});

export const signinSuccess = (
  userdata: SigninUserData,
  storedata: SigninStoreData,
  accessToken: string
) => ({
  type: SIGNIN_SUCCESS,
  payload: {
    userdata,
    storedata,
    accessToken,
  },
});

export const signinError = (msg: string) => ({
  type: SIGNIN_ERROR,
  payload: msg,
});

export const refresh = (accessToken: string, refreshToken: string) => ({
  type: REFRESH,
  payload: { accessToken, refreshToken },
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
});

export const invalidToken = (statusCode: number | string) => ({
  type: INVALID_TOKEN,
  payload: statusCode,
});

export const validToken = (accessToken: string) => ({
  type: VALID_TOKEN,
  payload: { accessToken },
});

export const signout = () => ({
  type: SIGNOUT,
});

export const signoutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
});

export const updateStore = (store: Store) => ({
  type: UPDATE_STORE,
  payload: store,
});

export const updateUsername = (username: string) => ({
  type: UPDATE_USERNAME,
  payload: username,
});

const actions = {
  initializeSignin,
  signinSuccess,
  signinError,
  requestSignin,
  refresh,
  validToken,
  invalidToken,
  signout,
  signoutSuccess,
  saveMyInfoToRedux,
  removeSignin,
  saveMyStoreListToRedux,
  deleteMyStoreItemInRedux,
  saveMyPhotoToRedux,
  updateStore,
  updateUsername,
};

type SigninAction = ActionType<typeof actions>;

function* requestSigninSaga(action: ReturnType<typeof requestSignin>) {
  const signinInfo = action.payload;

  try {
    const result = yield call(authAPI.signin, signinInfo);

    const { userdata, storedata } = result.data;
    const { access_token, refresh_token } = userdata;

    delete userdata.access_token;
    delete userdata.refresh_token;

    yield put(signinSuccess(userdata, storedata, access_token));

    storeTokens(access_token, refresh_token);
  } catch (e) {
    const result = e.response;
    if (!result) {
      yield put(signinError('알려지지 않은 에러가 발생했습니다.'));
      return;
    }

    if (result.status === 400) {
      yield put(signinError('아이디 또는 비밀번호를 입력해주세요.'));
    } else if (result.status === 404) {
      yield put(signinError('계정이 존재하지 않습니다.'));
    } else {
      yield put(signinError(e.message));
    }
  }
}

function* signoutSaga() {
  const accessToken = yield call([SecureStore, 'getItemAsync'], 'access_token');
  yield call(authAPI.signout, accessToken);
  yield call(clearTokens);
  yield put(signoutSuccess());
}

const signinAuthCheckSaga = createAuthCheckSaga(true);

export function* signinSaga() {
  yield takeEvery(CHECK_TOKEN, signinAuthCheckSaga);
  yield takeLatest(REQUEST_SIGNIN, requestSigninSaga);
  yield takeEvery(SIGNOUT, signoutSaga);
}

const initialState: SigninState = {
  isSignin: false,
  service: null,
  user: null,
  /*
    store: {
      1: {
        "id": 1,
        "storeName": "공통",
        "storeAddress": "전국(서울)",
        "latitude": 38,
        "longitude": 127
      },
      2: {
        ...
      }
    }
  */
  store: null,
  loading: false,
  error: null,
  accessToken: null,
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
        service: action.payload ? action.payload : null,
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
        store: action.payload.storedata,
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
        accessToken: action.payload.accessToken,
      };
    case INVALID_TOKEN:
      return {
        ...initialState,
        service: state.service,
        error: getAuthErrMsg(action.payload),
      };

    case SIGNOUT:
    case SIGNOUT_SUCCESS:
      return {
        ...initialState,
      };

    case SAVE_MY_INFO_TO_REDUX:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              username: action.payload,
            }
          : null,
      };

    case REMOVE_SIGNIN:
      return {
        ...initialState,
      };

    case SAVE_MY_STORE_LIST_TO_REDUX:
      return {
        ...state,
        store: action.paylaod,
      };

    case SAVE_MY_PHOTO_TO_REDUX:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              userImg: action.payload,
            }
          : null,
      };
    case UPDATE_STORE:
      return {
        ...state,
        store: action.payload,
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    default:
      return state;
  }
  salesPredictNavigation;
}
