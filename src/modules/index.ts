import { combineReducers } from 'redux';
import { all, fork, take } from 'redux-saga/effects';

import signup, { signupSaga } from './signup';
import signin, { signinSaga } from './signin';
import { createAuthCheckSaga } from '@base/lib/auth';
import salesPredict, {
  salesPredictSaga,
  salesPredictWithAuthSaga,
  ActionsWithAuth as predictActions,
} from './salesPredict';

import myInfo, { myInfoSaga, actionsWithAuth as myInfoActions } from './mypage';
import itemDetail, { itemDetailSaga } from './itemDetail';
import { getItemModifySaga, postItemModifySaga } from './itemModify';

const rootReducer = combineReducers({
  signin,
  signup,
  salesPredict,
  myInfo,
  itemDetail,
});

//actions에는 각 modules에 있는 인증이 필요한 action들을 배열로 담아서 import한 다음에 추가해준다
const actionsWithAuth = [...myInfoActions, ...predictActions];

//sagas에는 각 모듈에 있는 인증이 필요한 saga를 import해서 배열에 추가해준다.
const sagasWithAuth = [myInfoSaga, salesPredictWithAuthSaga];

const signinAuthCheckSaga = createAuthCheckSaga(true);
const resourceAPIAuthCheckSaga = createAuthCheckSaga();

console.log('auth actions: ', actionsWithAuth);

export function* rootSaga() {
  yield all([
    signinSaga(),
    signupSaga(),
    salesPredictSaga(),
    itemDetailSaga(),
    resourceAPIAuthCheckSaga(actionsWithAuth, sagasWithAuth),
  ]); // all은 배열 안의 여러 사가를 동시에 실행시켜준다.
}

//export function* rootSaga() {
//    fork(signinSaga);
//    fork(signupSaga);
//    fork(salesPredictSaga);
//    fork(resourceAPIAuthCheckSaga, actionsWithAuth, sagasWithAuth);
//}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
