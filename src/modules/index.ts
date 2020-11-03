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

import mypage, { mypageSaga, actionsWithAuth as mypageActions } from './mypage';
import itemDetail, { itemDetailSaga } from './itemDetail';
import itemModify, {
  itemModifyWithAuthSaga,
  ActionsWithAuth as itemModifyActions,
} from './itemModify';
import salesUpload, {
  salesUploadWithAuthSaga,
  ActionsWithAuth as salesUploadActions,
} from './salesUpload';
import addStore, {
  addStoreSaga,
  addStoreWithAuthSaga,
  ActionsWithAuth as addStoreActions,
} from './addStore';
import addMenu, {
  addMenuWithAuthSaga,
  ActionsWithAuth as addMenuActions,
} from './addMenu';

const rootReducer = combineReducers({
  signin,
  signup,
  salesPredict,
  mypage,
  itemDetail,
  itemModify,
  salesUpload,
  addStore,
  addMenu,
});

//actions에는 각 modules에 있는 인증이 필요한 action들을 배열로 담아서 import한 다음에 추가해준다
const actionsWithAuth = [
  ...mypageActions,
  ...predictActions,
  ...itemModifyActions,
  ...salesUploadActions,
  ...addStoreActions,
  ...addMenuActions,
];

//sagas에는 각 모듈에 있는 인증이 필요한 saga를 import해서 배열에 추가해준다.
const sagasWithAuth = [
  mypageSaga,
  salesPredictWithAuthSaga,
  itemModifyWithAuthSaga,
  salesUploadWithAuthSaga,
  addStoreWithAuthSaga,
  addMenuWithAuthSaga,
];

const resourceAPIAuthCheckSaga = createAuthCheckSaga();

console.log('auth actions: ', actionsWithAuth);

export function* rootSaga() {
  yield all([
    signinSaga(),
    signupSaga(),
    salesPredictSaga(),
    itemDetailSaga(),
    addStoreSaga(),
    resourceAPIAuthCheckSaga(actionsWithAuth, sagasWithAuth),
  ]);
}

//export function* rootSaga() {
//    fork(signinSaga);
//    fork(signupSaga);
//    fork(salesPredictSaga);
//    fork(resourceAPIAuthCheckSaga, actionsWithAuth, sagasWithAuth);
//}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
