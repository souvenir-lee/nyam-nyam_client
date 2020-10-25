import { combineReducers } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import auth, {
  CHECK_TOKEN,
  REQUEST_ACCESS_TOKEN,
  CLEAR_TOKENS,
  authSaga,
} from './auth';

import {
  checkTokenSaga,
  requestAccessTokenSaga,
  clearTokensSaga,
} from '../lib/auth';

import salesPredict, { salesPredictSaga } from './salesPredict';
import signup, {
  signupSaga,
  VERIFY_EMAIL,
  GET_ADDRESS,
  REQUEST_SIGNUP,
  confirmEmailSaga,
  getAddressSaga,
  requestSignupSaga,
} from './signup';

import signin, {
  signinSaga,
  requestSigninSaga,
  requestSigninWithTokenSaga,
  REQUEST_SIGNIN,
  REQUEST_SIGNIN_WITH_TOKEN,
} from './signin';

const rootReducer = combineReducers({
  auth,
  signin,
  signup,
  salesPredict,
});

const sagaList = {
  [CHECK_TOKEN]: checkTokenSaga,
  [REQUEST_ACCESS_TOKEN]: requestAccessTokenSaga,
  [CLEAR_TOKENS]: clearTokensSaga,
  [REQUEST_SIGNIN]: requestSigninSaga,
  [REQUEST_SIGNIN_WITH_TOKEN]: requestSigninWithTokenSaga,
  [VERIFY_EMAIL]: confirmEmailSaga,
  [GET_ADDRESS]: getAddressSaga,
  [REQUEST_SIGNUP]: requestSignupSaga,
};

const sagaWithTokenList = {
  [REQUEST_SIGNIN_WITH_TOKEN]: requestSigninWithTokenSaga,
};

function* sagaWithTokenCheck(action) {
  // 토큰 검증이 필요한 액션이라면 토큰 검증부터 수행한다
  if (action.type in sagaWithTokenList) {
    yield call(checkTokenSaga);
  }
  // 모든 액션들을 call로 호출한다.
  if (action.type in sagaList) {
    yield call(sagaList[action.type], action);
  }
}

export function* rootSaga() {
  yield takeEvery('*', sagaWithTokenCheck);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
