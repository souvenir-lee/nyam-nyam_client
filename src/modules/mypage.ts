import { ActionType } from 'typesafe-actions';
import { fork, call, put } from 'redux-saga/effects';

import { MyInfo, MyPageState } from '@base/types/mypage';
import * as mypageAPI from '@base/api/mypage';
import { handleIfAuthError, clearTokens } from '@base/lib/auth';

const GET_MY_INFO = 'mypage/GET_MY_INFO' as const;
const GET_MY_INFO_SUCCESS = 'mypage/GET_MY_INFO_SUCCESS' as const;
const GET_MY_INFO_FAIL = 'mypage/GET_MY_INFO_FAIL' as const;
const REQUEST_UNREGISTER = 'mypage/REQUEST_UNREGISTER' as const;
const UNREGISTER_SUCCESS = 'mypage/UNREGISTER_SUCCESS' as const;
const UNREGISTER_FAIL = 'mypage/UNREGISTER_FAIL' as const;
const SAVE_MY_INFO = 'mypage/SAVE_MY_INFO' as const;
const MY_INFO_SAVE_SUCCESS = 'mypage/MY_INFO_SAVE_SUCCESS' as const;
const MY_INFO_SAVE_FAIL = 'mypage/MY_INFO_SAVE_FAIL' as const;

export const MODIFY_MY_INFO = 'mypage/MODIFY_MY_INFO' as const;

export const actionsWithAuth = [GET_MY_INFO, REQUEST_UNREGISTER];

export const getMyInfo = (userId?: string | null) => ({
  type: GET_MY_INFO,
  payload: userId,
});

export const getMyinfoSuccess = (myInfo: MyInfo) => ({
  type: GET_MY_INFO_SUCCESS,
  payload: myInfo,
});

export const getMyInfoFail = (error: number | string) => ({
  type: GET_MY_INFO_FAIL,
  payload: error,
});

export const requestUnregister = () => ({
  type: REQUEST_UNREGISTER
});

export const unregisterSuccess = () => ({
  type: UNREGISTER_SUCCESS
});

export const unregisterFail = (error: string | number) => ({
  type: UNREGISTER_FAIL,
  payload: error
});

type ModifyMyInfo = {
  username: string;
}

export const saveMyInfo = (myInfo: ModifyMyInfo) => ({
  type: SAVE_MY_INFO,
  payload: myInfo
});

export const myInfoSaveSucceess = () => ({
  type: MY_INFO_SAVE_SUCCESS
});

export const myInfoSaveFail = (error: string) => ({
  type: MY_INFO_SAVE_FAIL,
  payload: error
});

export const modifyMyInfo = (myInfo: ModifyMyInfo) => ({
  type: MODIFY_MY_INFO,
  payload: myInfo
})

const actions = {
  getMyInfo,
  getMyinfoSuccess,
  getMyInfoFail,
  requestUnregister,
  unregisterSuccess,
  unregisterFail,
  saveMyInfo,
  myInfoSaveSucceess,
  myInfoSaveFail
};

type MyPageAction = ActionType<typeof actions>;

type ActionsWithAuth = ReturnType<typeof getMyInfo>;

function* getMyInfoSaga(
  action: any,
  accessToken: string
) {
  const userId = action.payload;
  let res;
  console.log('before get myinfo');

  try {
    res = yield call(mypageAPI.getMyInfo, accessToken);
    console.log('myinfo res success:', res);
    const myInfo = res.data;

    yield put(getMyinfoSuccess(myInfo));
  } catch (e) {
    res = e.response;

    if (!handleIfAuthError(res.status)) {
      if (res.status == 404) {
        yield put(getMyInfoFail('내 정보가 존재하지 않습니다'));
      } else {
        yield put(getMyInfoFail('알 수 없는 에러가 발생했습니다.'));
      }
    }
  }
}

export function* requestUnregisterSaga(accessToken: string) {
  let res;
  console.log('before request unregister');

  try{
    res = yield call(mypageAPI.unregister, accessToken);
    console.log('unregister res success: ', res);
    clearTokens();
    put(unregisterSuccess());

  } catch(e){
    res = e.response;

    if(!handleIfAuthError(res.status)){
      yield put(unregisterFail(res.statusText));
    }
  }
}

export function* saveMyInfoSaga(
  action: any, 
  accessToken: string
) {
  let res;
  console.log('before save my info');

  try{
    res = yield call(mypageAPI.saveMyInfo, accessToken, action.payload.username);
    console.log('save my info res success: ', res);

    put(myInfoSaveSucceess());
    put(modifyMyInfo(action.payload))
  } catch(e){
    res = e.response;

    if(!handleIfAuthError(res.status)){
      yield put(unregisterFail(res.statusText));
    }
  }
}

export function* mypageSaga(action: ActionsWithAuth, accessToken: string){
    console.log('saga pattern:', action);
    switch(action.type as any){
      case GET_MY_INFO:
        return yield fork(getMyInfoSaga, action, accessToken);
      case REQUEST_UNREGISTER:
        return yield fork(requestUnregisterSaga, accessToken);
      case MODIFY_MY_INFO:
        return yield fork(saveMyInfoSaga, action, accessToken);
    }
};

const initialState: MyPageState = {
  store: 0,
  production: 0,
  uploadSales: 0,
  loading: false,
  error: null,
};

export default function mypage(
  state: MyPageState = initialState,
  action: MyPageAction
): MyPageState {
  switch (action.type) {
    case GET_MY_INFO:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case GET_MY_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case REQUEST_UNREGISTER:
      return {
        ...state,
        loading: true,
      };
    case UNREGISTER_SUCCESS:
      return {
        ...initialState,
      };
    case UNREGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SAVE_MY_INFO:
      return {
        ...state,
        loading:true
      }
    case MY_INFO_SAVE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case MY_INFO_SAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
