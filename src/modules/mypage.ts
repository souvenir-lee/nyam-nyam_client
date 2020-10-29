import { ActionType } from 'typesafe-actions';
import { fork, call, put, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

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
const REQUEST_PASSWORD_CHANGE = 'mypage/REQUEST_PASSWORD_CHANGE' as const;
const PASSWORD_CHANGE_SUCCESS = 'mypage/PASSWORD_CHANGE_SUCCESS' as const;
const PASSWORD_CHANGE_FAIL = 'mypage/PASSWORD_CHANGE_FAIL' as const;

export const MODIFY_MY_INFO = 'mypage/MODIFY_MY_INFO' as const;
export const REMOVE_SIGNIN = 'mypage/REMOVE_SIGNIN' as const;

export const actionsWithAuth = [
  GET_MY_INFO, 
  REQUEST_UNREGISTER,
  SAVE_MY_INFO,
  REQUEST_PASSWORD_CHANGE
];

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

export const removeSignin = () => ({
  type: REMOVE_SIGNIN
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

export const requestPasswordChange = (currentPassword:string, password:string) => ({
  type: REQUEST_PASSWORD_CHANGE,
  payload: { currentPassword, password}
});

export const passwordChangeSuccess = () => ({
  type: PASSWORD_CHANGE_SUCCESS
});

export const passwordChangeFail = (error: string) => ({
  type: PASSWORD_CHANGE_FAIL,
  payload: { passwordChange: error }
});


const actions = {
  getMyInfo,
  getMyinfoSuccess,
  getMyInfoFail,
  requestUnregister,
  unregisterSuccess,
  unregisterFail,
  saveMyInfo,
  myInfoSaveSucceess,
  myInfoSaveFail,
  requestPasswordChange,
  passwordChangeSuccess,
  passwordChangeFail
};

type MyPageAction = ActionType<typeof actions>;

type ActionsWithAuth = ReturnType<typeof getMyInfo>;

function* getMyInfoSaga(
  action: any,
  accessToken: string
) {
  //const userId = action.payload;
  let res;
  console.log('before get myinfo');

  try {
    res = yield call(mypageAPI.getMyInfo, accessToken);
    console.log('myinfo res success:', res);
    const myInfo = res.data;

    yield put(getMyinfoSuccess(myInfo));
  } catch (e) {
    res = e.response;

    if (res && !(yield call(handleIfAuthError, res.status))) {
      if (res && res.status == 404) {
        const msg = '내 정보가 존재하지 않습니다';
        yield put(getMyInfoFail(msg));
        Alert.alert(msg);
      } else {
        const msg = '알 수 없는 에러가 발생했습니다.'
        yield put(getMyInfoFail('알 수 없는 에러가 발생했습니다:'));
        Alert.alert(msg);
      }
    } else {
        const msg = '알 수 없는 에러가 발생했습니다.'
        yield put(getMyInfoFail('알 수 없는 에러가 발생했습니다:'));
        Alert.alert(msg);
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
    
    yield put(unregisterSuccess());
    yield put(removeSignin());

    console.log('unregister result action:', yield select(state => state.signin));
  } catch(e){
    res = e.response;
    console.error('unregister fail: ', res);

    let msg = '알 수 없는 에러가 발생했습니다.';
    if(res && !(yield call(handleIfAuthError, res.status))){
      yield put(unregisterFail(msg));
    } else {
      yield put(unregisterFail(msg));
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
    console.log('before request myinfo save action:', action);
    res = yield call(mypageAPI.saveMyInfo, accessToken, action.payload);
    console.log('save my info res success: ', res);
    Alert.alert('닉네임이 변경되었습니다.');
    
    put(myInfoSaveSucceess());
    put(removeSignin())
  } catch(e){
    res = e.response;
    console.log('my info save failed: ', res);
    Alert.alert('닉네임을 변경할 수 없습니다:', res ? res.data : '');

    if(res && !(yield call(handleIfAuthError, res.status))){
      yield put(myInfoSaveFail(res.statusText));
    } else {
      yield put(myInfoSaveFail(res.statusText));
    }
  }
}

export function* requestPasswordChangeSaga(
   action: any,
   accessToken: string
){
  let res;
  const { currentPassword, password } = action.payload;
  console.log('before request password change');

  try{
    res = yield call(mypageAPI.changePassword, accessToken, currentPassword, password);

    console.log('password change success:', res);
    Alert.alert('비밀번호가 변경되었습니다');

    yield put(passwordChangeSuccess());
  } catch(e){
    res = e.response;
    console.log('password change fail:', res);

    if(res && !(yield call(handleIfAuthError, res.status))){
      console.log('not auth error');
      if(res && res.status == 404){
        console.log('password change 404 error');
        const msg = '기존의 비밀번호가 틀렸습니다.';
        yield put(passwordChangeFail(msg));
        Alert.alert(msg);

      } else {
        Alert.alert('비밀번호를 변경할 수 없습니다.');
      }
    } else {
      console.log('wtf error');
      Alert.alert('비밀번호를 변경할 수 없습니다.');
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
      case SAVE_MY_INFO:
        return yield fork(saveMyInfoSaga, action, accessToken);
      case REQUEST_PASSWORD_CHANGE:
        return yield fork(requestPasswordChangeSaga, action, accessToken);
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
        loading: false,
        error: null
      };
    case MY_INFO_SAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case REQUEST_PASSWORD_CHANGE:
      return {
        ...state,
        loading: true
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        loading:false,
        error: null
      };
    case PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
