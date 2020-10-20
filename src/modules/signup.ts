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
import { PickedAddressObject, Coords } from '@base/types/SignUpAddress';
import { SignupState } from '@base/types/utils';

const GET_ADDRESS = 'signup/GET_ADDRESS' as const;
const GET_ADDRESS_SUCCESS = 'signup/GET_ADDRESS_SUCCESS' as const;
const GET_ADDRESS_ERROR = 'signup/GET_ADDRESS_ERROR' as const;

const ADD_PICKED_ADDRESS = 'signup/ADD_ADDRESS' as const;
const REMOVE_PICKED_ADDRESS = 'signup/REMOVE_ADDRESS' as const;

const UPDATE_LOCATION = 'signup/UPDATE_LOCATION' as const;

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

const getAddressSaga = createPromiseSaga(GET_ADDRESS, getStoreByKeyword);

export function* signupSaga() {
  yield takeEvery(GET_ADDRESS, getAddressSaga);
}

const actions = {
  getAddress,
  getAddressSuccess,
  getAddressError,
  addAddress,
  removeAddress,
  updateLocation,
};
type SignupAction = ActionType<typeof actions>;

const initialState = {
  address: reducerUtils.initial([]),
  picked_address: reducerUtils.initial({}),
  coords: null,
};

export default function signup(
  state: SignupState = initialState,
  action: SignupAction
): SignupState {
  switch (action.type) {
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
