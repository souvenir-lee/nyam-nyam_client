import { ActionType } from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';
import {
  checkTokenSaga,
  requestAccessTokenSaga,
  clearTokensSaga,
} from '@base/lib/auth';
import { handleAsyncActions, reducerUtils } from '@base/lib/asyncUtils';
import { AxiosError } from 'axios';

//액션 타입
export const INITIALIZE = 'auth/INITIALIZE';
export const CHECK_TOKEN = 'auth/CHECK_TOKEN' as const;
export const CHECK_TOKEN_SUCCESS = 'auth/CHECK_TOKEN_SUCCESS' as const;
export const CHECK_TOKEN_ERROR = 'auth/CHECK_TOKEN_ERROR' as const;
export const REQUEST_ACCESS_TOKEN = 'auth/REQUEST_ACCESS_TOKEN' as const;
export const REQUEST_ACCESS_TOKEN_SUCCESS = 'auth/REQUEST_ACCESS_TOKEN_SUCCESS' as const;
export const REQUEST_ACCESS_TOKEN_ERROR = 'auth/REQUEST_ACCESS_TOKEN_ERROR' as const;
export const CLEAR_TOKENS = 'auth/CLEAR_TOKENS' as const;
//액션 생성자

export const initialize = () => ({
  type: INITIALIZE,
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
});

export const checkTokenSuccess = (accessToken: string) => ({
  type: CHECK_TOKEN_SUCCESS,
  payload: accessToken,
});

export const checkTokenFailure = (error: AxiosError | Error) => ({
  type: CHECK_TOKEN_ERROR,
  payload: error,
});

export const requestAccessToken = () => ({
  type: REQUEST_ACCESS_TOKEN,
});

export const requestAccessTokenSuccess = (accessToken: string) => ({
  type: REQUEST_ACCESS_TOKEN_SUCCESS,
  payload: accessToken,
});

export const requestAccessTokenFailure = (error: AxiosError | Error) => ({
  type: REQUEST_ACCESS_TOKEN_ERROR,
  payload: error,
});

export const clearTokens = () => ({
  type: CLEAR_TOKENS,
});

const actions = {
  initialize,
  checkToken,
  checkTokenSuccess,
  checkTokenFailure,
  requestAccessToken,
  requestAccessTokenSuccess,
  requestAccessTokenFailure,
  clearTokens,
};

type AuthAction = ActionType<typeof actions>;

export function* authSaga() {
  yield takeLatest(CHECK_TOKEN, checkTokenSaga);
  yield takeLatest(REQUEST_ACCESS_TOKEN, requestAccessTokenSaga);
  yield takeLatest(CLEAR_TOKENS, clearTokensSaga);
}

const initialState = {
  accessToken: reducerUtils.initial(null),
};

//리듀서
export default function auth(state = initialState, action: AuthAction) {
  switch (action.type) {
    case INITIALIZE:
      return initialState;
    case CHECK_TOKEN:
    case CHECK_TOKEN_SUCCESS:
    case CHECK_TOKEN_ERROR:
      return handleAsyncActions(CHECK_TOKEN, 'accessToken', '')(state, action);
    case REQUEST_ACCESS_TOKEN:
    case REQUEST_ACCESS_TOKEN_SUCCESS:
    case REQUEST_ACCESS_TOKEN_ERROR:
      return handleAsyncActions(
        REQUEST_ACCESS_TOKEN,
        'accessToken',
        ''
      )(state, action);
    case CLEAR_TOKENS:
      return {
        ...state,
        accessToken: reducerUtils.initial(''),
      };
    default:
      return state;
  }
}
