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
import { getStoreByKeyword } from '@base/api/kakaomap';
import { AddressAPIProps, AddressObject } from '@base/types/kakaomap';
import { getMyStore, postNewStore } from '@base/api/addStore';
import { updateStore } from './signin';
import * as RootNavigation from '@base/navigation';

//액션 타입
const GET_ADDRESS = 'addStore/GET_ADDRESS' as const;
const GET_ADDRESS_SUCCESS = 'addStore/GET_ADDRESS_SUCCESS' as const;
const GET_ADDRESS_ERROR = 'addStore/GET_ADDRESS_ERROR' as const;
const PICK_ADDRESS = 'addStore/PICK_ADDRESS' as const;
const PICK_ADDRESS_SUCCESS = 'addStore/PICK_ADDRESS_SUCCESS' as const;
const PICK_ADDRESS_ERROR = 'addStore/PICK_ADDRESS_ERROR' as const;
const UPDATE_LOCATION = 'addStore/UPDATE_LOCATION' as const;
const CLEAR_DATA = 'addStore/CLEAR_DATA' as const;

export const getAddress = (info: AddressAPIProps) => ({
  type: GET_ADDRESS,
  payload: info,
});

export const getAddressSuccess = (data: AddressObject[]) => ({
  type: GET_ADDRESS_SUCCESS,
  payload: data,
});

export const getAddressError = (error: AxiosError) => ({
  type: GET_ADDRESS_ERROR,
  payload: error,
});

export const pickAddress = (data) => ({
  type: PICK_ADDRESS,
  payload: data,
});

export const pickAddressSuccess = () => ({
  type: PICK_ADDRESS_SUCCESS,
});

export const pickAddressFailure = (error: AxiosError) => ({
  type: PICK_ADDRESS_ERROR,
  payload: error,
});

export const updateLocation = (coords: any) => ({
  type: UPDATE_LOCATION,
  payload: coords,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

export const ActionsWithAuth = [PICK_ADDRESS];

const getAddressSaga = createPromiseSaga(GET_ADDRESS, getStoreByKeyword);

function* pickAddressSaga(
  action: ActionType<typeof getPredictData>,
  accessToken: string
) {
  const data = action.payload;
  try {
    yield call(postNewStore, data, accessToken);
    const store = yield call(getMyStore, accessToken);
    yield put(updateStore(store));
    yield put(pickAddressSuccess());
  } catch (error) {
    yield put(pickAddressFailure(error));
  }
}

export function* addStoreWithAuthSaga(
  action: ActionsWithAuth,
  accessToken: string
) {
  switch (action.type) {
    case PICK_ADDRESS:
      return yield fork(pickAddressSaga, action, accessToken);
  }
}

export function* addStoreSaga() {
  yield takeLatest(GET_ADDRESS, getAddressSaga);
}

const actions = {
  getAddress,
  getAddressSuccess,
  getAddressError,
  updateLocation,
  pickAddress,
  pickAddressSuccess,
  pickAddressFailure,
  clearData,
};

type AddStoreAction = ActionType<typeof actions>;

const initialState = {
  loading: false,
  error: null,
  address: reducerUtils.initial([]),
  coords: null,
  storeAdded: false,
};

//리듀서
export default function addStore(state = initialState, action: AddStoreAction) {
  switch (action.type) {
    case GET_ADDRESS:
    case GET_ADDRESS_SUCCESS:
    case GET_ADDRESS_ERROR:
      return handleAsyncActions(
        GET_ADDRESS,
        'address',
        [],
        true
      )(state, action);
    case PICK_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
        storeAdded: false,
      };
    case PICK_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        storeAdded: true,
      };
    case PICK_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        storeAdded: false,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        coords: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
