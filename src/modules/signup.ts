/* eslint-disable no-case-declarations */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getStoreByKeyword } from '@base/api';
import { AddressAPIProps, AddressObject } from '@base/types/api';
import { UserFields, SignupState } from '@base/types/auth';
import { PickedAddressObject, Coords } from '@base/types/SignUpAddress';
import * as authAPI from '@base/api/auth';
import * as RootNavigation from '@base/navigation';


//액션 타입
const INPUT_USER_FIELDS = 'signup/INPUT_USER_FIELDS' as const;
const EMAIL_IS_VALID ='signup/EMAIL_IS_VALID' as const;
const EMAIL_IS_INVALID ='signup/EMAIL_IS_INVALID' as const;

const GET_ADDRESS = 'signup/GET_ADDRESS' as const;
const GET_ADDRESS_SUCCESS = 'signup/GET_ADDRESS_SUCCESS' as const;
const GET_ADDRESS_ERROR = 'signup/GET_ADDRESS_ERROR' as const;

const ADD_PICKED_ADDRESS = 'signup/ADD_ADDRESS' as const;
const REMOVE_PICKED_ADDRESS = 'signup/REMOVE_ADDRESS' as const;

const UPDATE_LOCATION = 'signup/UPDATE_LOCATION' as const;


//액션 생성자
export const inputUserFields = (userFields: UserFields) => ({
  type: INPUT_USER_FIELDS,
  payload: userFields
});

export const emailIsValid = () => ({
  type: EMAIL_IS_VALID
});


export const emailIsInValid = (errMsg: string) => ({
  type: EMAIL_IS_INVALID,
  payload:errMsg
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
function* confirmEmailSaga(action: ReturnType<typeof inputUserFields>){
  const email = action.payload.email;
  let res;

  try{
    res = yield call(authAPI.confirmEmail, email);
    console.log('confirm email:', res);

    yield put(emailIsValid());
  
    RootNavigation.navigate('SignUpAddress', {});
  } catch(e){
    res = e.response;
    console.log('res: ', res);

    if(res.status == 400){
      yield put(emailIsInValid('잘못된 이메일입니다.'));
    } else if(res.status === 409){
      yield put(emailIsInValid('이미 존재하는 이메일입니다.'));
    } else {
      yield put(emailIsInValid(e.message));
    }
  }
}

const getAddressSaga = createPromiseSaga(GET_ADDRESS, getStoreByKeyword);

export function* signupSaga() {
  yield takeLatest(INPUT_USER_FIELDS, confirmEmailSaga);
  yield takeEvery(GET_ADDRESS, getAddressSaga);
}


const actions = {
  inputUserFields,
  emailIsValid,
  emailIsInValid,
  getAddress,
  getAddressSuccess,
  getAddressError,
  addAddress,
  removeAddress,
  updateLocation,
};

type SignupAction = ActionType<typeof actions>;

const initialState = {
  userFields: {
    email: '',
    password: '',
    username: ''
  },
  isEmailValid: false,
  errMsg: null,
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
    case INPUT_USER_FIELDS:
      return {
        ...state,
        userFields: action.payload 
      };
    case EMAIL_IS_VALID:
      return {
        ...state,
        isEmailValid: true
      };
    case EMAIL_IS_INVALID:
      return {
        ...state,
        isEmailValid: false,
        errMsg: action.payload
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
