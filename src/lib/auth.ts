import * as SecureStore from 'expo-secure-store';
import { decode } from 'js-base64';
import { put, call, select } from 'redux-saga/effects';

import {
  checkTokenSuccess,
  checkTokenFailure,
  requestAccessToken,
  requestAccessTokenSuccess,
  requestAccessTokenFailure,
  clearTokens,
} from '@base/modules/auth';
import { refresh } from '@base/api/auth';

//access token, refresh token 저장
export async function storeTokens(accessToken: string, refreshToken: string) {
  return Promise.all([
    SecureStore.setItemAsync('access_token', accessToken),
    SecureStore.setItemAsync('refresh_token', refreshToken),
  ]);
}

export async function clearTokensSaga() {
  return Promise.all([
    SecureStore.deleteItemAsync('access_token'),
    SecureStore.deleteItemAsync('refresh_token'),
  ]);
}

//token 만료기간 체크
export const isTokenExpired = (token: string) => {
  //access token의 payload를 분리한 후 base64 디코딩
  try {
    const payload = JSON.parse(decode(token.split('.')[1]));
    const { exp } = payload; //토큰 만료시간

    if (exp < Date.now() / 1000) return true; //만료 시간이 지났다면
    return false;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export function* checkTokenSaga() {
  console.log('check token saga');
  //secure storage에서 access token 얻기
  let { data: accessToken } = yield select((state) => state.auth.accessToken);

  if (!accessToken) {
    accessToken = yield call([SecureStore, 'getItemAsync'], 'access_token');
  }

  //access token이 존재한다면 만료기간 확인
  if (accessToken && typeof accessToken === 'string') {
    if (isTokenExpired(accessToken)) {
      console.log('expired');
      // 만료됬다면 refresh token으로 재발급 시도
      yield put(requestAccessToken());
    } else {
      console.log('not expired');
      // 만료되지 않았다면 인증 성공
      yield put(checkTokenSuccess(accessToken));
    }
  } else {
    //access token이 존재하지 않다면 refresh token으로 재발급 시도
    console.log('requestAccessTokenSaga');
    yield call(requestAccessTokenSaga);

    const { data: accessToken, error } = yield select(
      (state) => state.auth.accessToken
    );

    if (!error && accessToken) {
      yield put(checkTokenSuccess(accessToken));
    } else {
      yield put(checkTokenFailure(new Error('Access Token not exists')));
    }
  }

  yield console.log('check token saga complete');
}

export function* requestAccessTokenSaga() {
  const refreshToken = yield call(
    [SecureStore, 'getItemAsync'],
    'refresh_token'
  );
  if (refreshToken && typeof refreshToken === 'string') {
    //refresh token의 만료기간을 확인한다
    if (isTokenExpired(refreshToken)) {
      yield put(requestAccessTokenFailure(new Error('Refresh Token Expired')));
      yield put(clearTokens());
    } else {
      const { data: accessToken } = yield select(
        (state) => state.auth.accessToken
      );

      //refresh token의 만료 기간이 유효하다면 access token을 새로 발급받는다
      try {
        const result = yield call(refresh, accessToken, refreshToken);
        const { access_token, refresh_token } = result.data;

        yield call(storeTokens, access_token, refresh_token);
        yield put(requestAccessTokenSuccess(accessToken));
      } catch (error) {
        //refresh token이 유효하지 않다면 isSignin = false
        yield put(requestAccessTokenFailure(error));
      }
    }
  } else {
    //refresh token이 없으면 isSignin = false
    yield put(
      requestAccessTokenFailure(new Error("Refresh Token Doesn't Exists"))
    );
  }
}
