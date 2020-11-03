/* eslint-disable no-case-declarations */
import {
  select,
  call,
  put,
  fork,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getMyMenuList } from './mypage';
import { postAddMenu } from '@base/api/addMenu';
import { initialize } from './salesPredict';
import * as RootNavigation from '@base/navigation';

//액션 타입
const ADD_MENU = 'addMenu/ADD_MENU' as const;
const ADD_MENU_SUCCESS = 'addMenu/ADD_MENU_SUCCESS' as const;
const ADD_MENU_ERROR = 'addMenu/ADD_MENU_ERROR' as const;
const CLEAR_DATA = 'addMenu/CLEAR_DATA' as const;

export const addMenu = (data, id) => ({
  type: ADD_MENU,
  payload: data,
  storeId: id,
});

export const addMenuSuccess = () => ({
  type: ADD_MENU_SUCCESS,
});

export const addMenuError = (error) => ({
  type: ADD_MENU_ERROR,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

export const ActionsWithAuth = [ADD_MENU];

function* addMenuSaga(action, accessToken: string) {
  const data = action.payload;
  console.log('data', data);
  try {
    yield call(postAddMenu, data, accessToken);
    yield put(getMyMenuList(action.storeId));
    yield put(initialize());
    yield put(addMenuSuccess());
  } catch (error) {
    yield put(addMenuError(error));
  }
}

export function* addMenuWithAuthSaga(
  action: ActionsWithAuth,
  accessToken: string
) {
  switch (action.type) {
    case ADD_MENU:
      return yield fork(addMenuSaga, action, accessToken);
  }
}

const actions = {
  addMenu,
  addMenuSuccess,
  addMenuError,
  clearData,
};

type AddStoreAction = ActionType<typeof actions>;

const initialState = {
  loading: false,
  error: null,
  submit: false,
};

//리듀서
export default function addStore(state = initialState, action: AddStoreAction) {
  switch (action.type) {
    case ADD_MENU:
      return {
        loading: true,
        error: null,
      };
    case ADD_MENU_SUCCESS:
      return {
        loading: false,
        error: null,
        submit: true,
      };
    case ADD_MENU_ERROR:
      return {
        loading: false,
        error: action.payload,
        submit: false,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
