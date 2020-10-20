/* eslint-disable no-case-declarations */
import { takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getStoreByKeyword } from '@base/api';
import { AddressAPIProps, AddressObject } from '@base/types/api';
import { UserInfo } from '@base/types/auth';
import { PickedAddressObject, Coords } from '@base/types/SignUpAddress';
import { SignupState } from '@base/types/utils';

//액션 타입
const INPUT_USER_INFO = 'signup/INPUT_USER_INFO' as const;

const GET_ADDRESS = 'signup/GET_ADDRESS' as const;
const GET_ADDRESS_SUCCESS = 'signup/GET_ADDRESS_SUCCESS' as const;
const GET_ADDRESS_ERROR = 'signup/GET_ADDRESS_ERROR' as const;

const ADD_PICKED_ADDRESS = 'signup/ADD_ADDRESS' as const;
const REMOVE_PICKED_ADDRESS = 'signup/REMOVE_ADDRESS' as const;

const UPDATE_LOCATION = 'signup/UPDATE_LOCATION' as const;


//액션 생성자
export const inputUserInfo = (userInfo: UserInfo) => ({
  type: INPUT_USER_INFO,
  payload: userInfo
});

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

export const addAddress = (address: PickedAddressObject) => ({
  type: ADD_PICKED_ADDRESS,
  payload: address,
  meta: address.id,
});

export const removeAddress = (id: string) => ({
  type: REMOVE_PICKED_ADDRESS,
  payload: id,
  meta: id,
});

export const updateLocation = (coords: Coords) => ({
  type: UPDATE_LOCATION,
  payload: coords,
});

//리덕스 사가
const getAddressSaga = createPromiseSaga(GET_ADDRESS, getStoreByKeyword);

export function* signupSaga() {
  yield takeEvery(GET_ADDRESS, getAddressSaga);
}


const actions = {
  inputUserInfo,
  getAddress,
  getAddressSuccess,
  getAddressError,
  addAddress,
  removeAddress,
  updateLocation,
};

type SignupAction = ActionType<typeof actions>;


const initialState = {
  userInfo: {
    email: '',
    password: '',
    username: ''
  },
  address: reducerUtils.initial([]),
  picked_address: reducerUtils.initial({}),
  coords: null,
};


//리듀서
export default function signup(
  state: SignupState = initialState,
  action: SignupAction
): SignupState {
  switch (action.type) {
    case INPUT_USER_INFO:
      return {
        ...state,
        userInfo: action.payload 
      };
    case GET_ADDRESS:
    case GET_ADDRESS_SUCCESS:
    case GET_ADDRESS_ERROR:
      return handleAsyncActions<SignupState>(
        GET_ADDRESS,
        'address',
        [],
        true
      )(state, action);
    case ADD_PICKED_ADDRESS:
      if (action.meta in state.picked_address) {
        return state;
      } else {
        return {
          ...state,
          picked_address: {
            ...state.picked_address,
            data: {
              ...state.picked_address.data,
              [action.meta]: action.payload,
            },
          },
        };
      }
    case REMOVE_PICKED_ADDRESS:
      const newData = Object.assign({}, state.picked_address.data);
      delete newData[action.meta];
      return {
        ...state,
        picked_address: {
          ...state.picked_address,
          data: newData,
        },
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        coords: action.payload,
      };
    default:
      return state;
  }
}
