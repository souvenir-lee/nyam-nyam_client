import { combineReducers } from 'redux';
import signup, { signupSaga } from './signup';
import signin, { signinSaga } from './signin';
import { all, fork, take, takeEvery } from 'redux-saga/effects';

import { createAuthCheckSaga } from '@base/lib/auth';
import salesPredict, {
  salesPredictSaga,
  salesPredictWithAuthSaga,
  ActionsWithAuth as predictActions,
} from './salesPredict';

import myInfo, { myInfoSaga, actionsWithAuth as myInfoActions } from './mypage';

const rootReducer = combineReducers({
  signin,
  signup,
  salesPredict,
  myInfo,
});

//actions에는 각 modules에 있는 인증이 필요한 action들을 배열로 담아서 import한 다음에 추가해준다
const actionsWithAuth = [...myInfoActions, ...predictActions];

//sagas에는 각 모듈에 있는 인증이 필요한 saga를 import해서 배열에 추가해준다.
const sagasWithAuth = [myInfoSaga, salesPredictWithAuthSaga];

const resourceAPIAuthCheckSaga = createAuthCheckSaga();

export function* rootSaga() {
  yield all([
    signinSaga(),
    signupSaga(),
    salesPredictSaga(),
    resourceAPIAuthCheckSaga(actionsWithAuth, sagasWithAuth),
  ]); // all은 배열 안의 여러 사가를 동시에 실행시켜준다.
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

