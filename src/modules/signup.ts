import { select, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getStoreByKeyword } from '@base/api';
import { AddressAPIProps, AddressObject } from '@base/types/api';
import { UserFields, SignupState, SignupInfo } from '@base/types/auth';
import { PickedAddressObject } from '@base/types/SignUpAddress';
import { Coords } from '@base/types/defaultTypes';
import * as authAPI from '@base/api/auth';
import * as RootNavigation from '@base/navigation';

//액션 타입
export const VERIFY_EMAIL = 'signup/VERIFY_EMAIL' as const;
export const VERIFY_EMAIL_SUCCESS = 'signup/VERIFY_EMAIL_SUCCESS' as const;
export const VERIFY_EMAIL_ERROR = 'signup/VERIFY_EMAIL_ERROR' as const;
export const GET_ADDRESS = 'signup/GET_ADDRESS' as const;
export const GET_ADDRESS_SUCCESS = 'signup/GET_ADDRESS_SUCCESS' as const;
export const GET_ADDRESS_ERROR = 'signup/GET_ADDRESS_ERROR' as const;
export const ADD_PICKED_ADDRESS = 'signup/ADD_ADDRESS' as const;
export const REMOVE_PICKED_ADDRESS = 'signup/REMOVE_ADDRESS' as const;
export const UPDATE_LOCATION = 'signup/UPDATE_LOCATION' as const;
export const REQUEST_SIGNUP = 'signup/REQUEST_SIGNUP' as const;
export const REQUEST_SIGNUP_SUCCESS = 'signup/REQUEST_SIGNUP_SUCCESS' as const;
export const REQUEST_SIGNUP_ERROR = 'signup/REQUEST_SIGNUP_ERROR' as const;
export const CLEANUP = 'signup/CLEANUP' as const;

//액션 생성자
export const verifyEmail = (userFields) => ({
  type: VERIFY_EMAIL,
  payload: userFields,
});

export const verifyEmailSuccess = () => ({
  type: VERIFY_EMAIL_SUCCESS,
});

export const verifyEmailFailure = (error: AxiosError) => ({
  type: VERIFY_EMAIL_ERROR,
  payload: error,
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

export const requestSignup = () => ({
  type: REQUEST_SIGNUP,
});

export const requestSignupSuccess = () => ({
  type: REQUEST_SIGNUP_SUCCESS,
  payload: true,
});

export const requestSignupFailure = (error) => ({
  type: REQUEST_SIGNUP_ERROR,
  payload: error,
});

export const cleanUp = () => ({
  type: CLEANUP,
});

//리덕스 사가
export const confirmEmailSaga = createPromiseSaga(
  VERIFY_EMAIL,
  authAPI.confirmEmail
);
export const getAddressSaga = createPromiseSaga(GET_ADDRESS, getStoreByKeyword);
export function* requestSignupSaga() {
  const {
    userFields: {
      data: { email, username, password },
    },
    picked_address: { data },
  } = yield select((state) => state.signup);
  try {
    const picked_address_arr = [];
    for (const key in data) {
      picked_address_arr.push(data[key]);
    }

    if (!picked_address_arr.length) {
      throw new Error('선택된 가게가 없습니다.');
    }

    const signupInfo = {
      email,
      username,
      password,
      storename: picked_address_arr[0].place_name,
      storeaddress: picked_address_arr[0].address_name,
      latitude: picked_address_arr[0].coord.x,
      longitude: picked_address_arr[0].coord.y,
    };

    yield call(authAPI.requestSignup, signupInfo);
    yield put(requestSignupSuccess());
  } catch (error) {
    yield put(requestSignupFailure(error));
  }
}

export function* signupSaga() {
  yield takeLatest(VERIFY_EMAIL, confirmEmailSaga);
  yield takeEvery(GET_ADDRESS, getAddressSaga);
  yield takeLatest(REQUEST_SIGNUP, requestSignupSaga);
}

const actions = {
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  getAddress,
  getAddressSuccess,
  getAddressError,
  addAddress,
  removeAddress,
  updateLocation,
  requestSignup,
  requestSignupSuccess,
  requestSignupFailure,
  cleanUp,
};

type SignupAction = ActionType<typeof actions>;

const initialState = {
  userFields: reducerUtils.initial({}),
  address: reducerUtils.initial([]),
  picked_address: reducerUtils.initial({}),
  coords: null,
  signupSuccess: reducerUtils.initial(false),
};

//리듀서
export default function signup(
  state = initialState,
  action: SignupAction
): SignupState {
  switch (action.type) {
    case VERIFY_EMAIL:
    case VERIFY_EMAIL_SUCCESS:
    case VERIFY_EMAIL_ERROR:
      return handleAsyncActions(VERIFY_EMAIL, 'userFields', {})(state, action);
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
    case REQUEST_SIGNUP:
      return {
        ...state,
        signupSuccess: {
          loading: true,
        },
      };
    case REQUEST_SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: {
          loading: false,
          error: null,
          data: true,
        },
      };
    case REQUEST_SIGNUP_ERROR:
      return {
        ...state,
        signupSuccess: {
          loading: false,
          error: action.payload,
          data: false,
        },
      };
    case CLEANUP:
      return initialState;
    default:
      return state;
  }
}
