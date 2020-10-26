import { ActionType } from 'typesafe-actions';
import { fork, call, put } from 'redux-saga/effects';

import { MyInfo, MyInfoState } from '@base/types/mypage';
import * as myInfoAPI from '@base/api/mypage';
import { handleIfAuthError } from '@base/lib/auth';

const GET_MY_INFO = 'mypage/GET_MY_INFO' as const;
const GET_MY_INFO_SUCCESS = 'mypage/GET_MY_INFO_SUCCESS' as const;
const GET_MY_INFO_FAIL = 'mypage/GET_MY_INFO_FAIL' as const;

export const actionsWithAuth = [GET_MY_INFO];

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

const actions = {
  getMyInfo,
  getMyinfoSuccess,
  getMyInfoFail,
};

type MyInfoAction = ActionType<typeof actions>;

type ActionsWithAuth = ReturnType<typeof getMyInfo>;

function* getMyInfoSaga(
  action: ReturnType<typeof getMyInfo>,
  accessToken: string
) {
  const userId = action.payload;
  let res;
  console.log('before get myinfo');

  try {
    res = yield call(myInfoAPI.getMyInfo, accessToken);
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

export function* myInfoSaga(action: ActionsWithAuth, accessToken: string) {
  switch (action.type) {
    case GET_MY_INFO:
      return yield fork(getMyInfoSaga, action, accessToken);
  }
}

const initialState: MyInfoState = {
  store: 0,
  production: 0,
  uploadSales: 0,
  loading: false,
  error: null,
};

export default function myInfo(
  state: MyInfoState = initialState,
  action: MyInfoAction
): MyInfoState {
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
    default:
      return state;
  }
}
