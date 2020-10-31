import { ActionType } from 'typesafe-actions';
import { fork, call, put, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { MyInfo, MyPageState } from '@base/types/mypage';
import * as mypageAPI from '@base/api/mypage';
import { handleIfAuthError, clearTokens } from '@base/lib/auth';

const INITIALIZE_ERROR = 'mypage/INITIALIZE_ERROR' as const;

const GET_MY_INFO = 'mypage/GET_MY_INFO' as const;
const GET_MY_INFO_SUCCESS = 'mypage/GET_MY_INFO_SUCCESS' as const;
const GET_MY_INFO_FAIL = 'mypage/GET_MY_INFO_FAIL' as const;

const REQUEST_UNREGISTER = 'mypage/REQUEST_UNREGISTER' as const;
const UNREGISTER_SUCCESS = 'mypage/UNREGISTER_SUCCESS' as const;
const UNREGISTER_FAIL = 'mypage/UNREGISTER_FAIL' as const;

const SAVE_MY_INFO = 'mypage/SAVE_MY_INFO' as const;
const MY_INFO_SAVE_SUCCESS = 'mypage/MY_INFO_SAVE_SUCCESS' as const;
const MY_INFO_SAVE_FAIL = 'mypage/MY_INFO_SAVE_FAIL' as const;

const UPLOAD_MY_PHOTO = 'mypage/UPLOAD_MY_PHOTO' as const;
const UPLOAD_MY_PHOTO_SUCCESS = 'mypage/UPLOAD_MY_PHOTO_SUCCESS' as const;
const UPLOAD_MY_PHOTO_FAIL = 'mypage/UPLOAD_MY_PHOTO_FAIL' as const;

const REQUEST_PASSWORD_CHANGE = 'mypage/REQUEST_PASSWORD_CHANGE' as const;
const PASSWORD_CHANGE_SUCCESS = 'mypage/PASSWORD_CHANGE_SUCCESS' as const;
const PASSWORD_CHANGE_FAIL = 'mypage/PASSWORD_CHANGE_FAIL' as const;

const GET_MY_STORE_LIST = 'mypage/GET_MY_STORE_LIST' as const;
const GET_MY_STORE_LIST_SUCCESS = 'mypage/GET_MY_STORE_LIST_SUCCESS' as const;
const GET_MY_STORE_LIST_FAIL = 'mypage/GET_MY_STORE_LIST_FAIL' as const;

const DELETE_MY_STORE_ITEM = 'mypage/DELETE_MY_STORE_ITEM' as const;
const DELETE_MY_STORE_ITEM_SUCCESS = 'mypage/DELETE_MY_STORE_ITEM_SUCCESS' as const;
const DELETE_MY_STORE_ITEM_FAIL = 'mypage/DELETE_MY_STORE_ITEM_FAIL' as const;

export const SAVE_MY_INFO_TO_REDUX = 'mypage/SAVE_MY_INFO' as const;
export const REMOVE_SIGNIN = 'mypage/REMOVE_SIGNIN' as const;
export const SAVE_MY_STORE_LIST_TO_REDUX = 'mypage/SAVE_MY_STORE_LIST_TO_REDUX' as const;
export const SAVE_MY_PHOTO_TO_REDUX = 'mypage/SAVE_MY_PHOTO_TO_REDUX' as const;
export const DELETE_MY_STORE_ITEM_IN_REDUX = 'mypage/DELETE_MY_STORE_ITEM_IN_REDUX' as const;

export const actionsWithAuth = [
  GET_MY_INFO,
  REQUEST_UNREGISTER,
  SAVE_MY_INFO,
  UPLOAD_MY_PHOTO,
  REQUEST_PASSWORD_CHANGE,
  GET_MY_STORE_LIST,
  DELETE_MY_STORE_ITEM,
];

export const initializeError = () => ({
  type: INITIALIZE_ERROR,
});

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
  type: REQUEST_UNREGISTER,
});

export const unregisterSuccess = () => ({
  type: UNREGISTER_SUCCESS,
});

export const removeSignin = () => ({
  type: REMOVE_SIGNIN,
});

export const unregisterFail = (error: string | number) => ({
  type: UNREGISTER_FAIL,
  payload: error,
});

export const getMyStoreList = () => ({
  type: GET_MY_STORE_LIST,
});

export const getMyStoreListSuccess = () => ({
  type: GET_MY_STORE_LIST_SUCCESS,
});

export const saveMyStoreListToRedux = (store: any) => ({
  type: SAVE_MY_STORE_LIST_TO_REDUX,
  paylaod: store,
});

export const getMyStoreListFail = (error: string) => ({
  type: GET_MY_STORE_LIST_FAIL,
  error,
});

export const saveMyInfo = (username: string) => ({
  type: SAVE_MY_INFO,
  payload: username,
});

export const saveMyInfoToRedux = (username: string) => ({
  type: SAVE_MY_INFO_TO_REDUX,
  payload: username,
});

export const uploadMyPhoto = (type: string, uri: string) => ({
  type: UPLOAD_MY_PHOTO,
  payload: { type, uri },
});

export const uploadMyPhotoSuccess = () => ({
  type: UPLOAD_MY_PHOTO_SUCCESS,
});

export const saveMyPhotoToRedux = (uri: string) => ({
  type: SAVE_MY_PHOTO_TO_REDUX,
  payload: uri,
});

export const uploadMyPhotoFail = (error: string) => ({
  type: UPLOAD_MY_PHOTO_FAIL,
  payload: error,
});

export const myInfoSaveSucceess = () => ({
  type: MY_INFO_SAVE_SUCCESS,
});

export const myInfoSaveFail = (error: string) => ({
  type: MY_INFO_SAVE_FAIL,
  payload: error,
});

export const requestPasswordChange = (
  currentPassword: string,
  password: string
) => ({
  type: REQUEST_PASSWORD_CHANGE,
  payload: { currentPassword, password },
});

export const passwordChangeSuccess = () => ({
  type: PASSWORD_CHANGE_SUCCESS,
});

export const passwordChangeFail = (error: string) => ({
  type: PASSWORD_CHANGE_FAIL,
  payload: { passwordChange: error },
});

export const deleteMyStoreItem = (id: number | string) => ({
  type: DELETE_MY_STORE_ITEM,
  payload: id,
});

export const deleteMyStoreItemSuccess = () => ({
  type: DELETE_MY_STORE_ITEM_SUCCESS,
});

export const deleteMyStoreItemInRedux = (id: number | string) => ({
  type: DELETE_MY_STORE_ITEM_IN_REDUX,
  payload: id,
});

export const deleteMyStoreItemFail = (error: string) => ({
  type: DELETE_MY_STORE_ITEM_FAIL,
  payload: error,
});

const actions = {
  initializeError,
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
  passwordChangeFail,
  getMyStoreList,
  getMyStoreListSuccess,
  getMyStoreListFail,
  deleteMyStoreItem,
  deleteMyStoreItemSuccess,
  deleteMyStoreItemFail,
  uploadMyPhoto,
  uploadMyPhotoSuccess,
  uploadMyPhotoFail,
};

type MyPageAction = ActionType<typeof actions>;

type ActionsWithAuth = ReturnType<typeof getMyInfo>;

export function* getMyInfoSaga(action: any, accessToken: string) {
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
      if (res && res.status === 404) {
        const msg = '내 정보가 존재하지 않습니다';
        yield put(getMyInfoFail(msg));
        Alert.alert(msg);
      } else {
        const msg = '알 수 없는 에러가 발생했습니다.';
        yield put(getMyInfoFail('알 수 없는 에러가 발생했습니다:'));
        Alert.alert(msg);
      }
    } else {
      yield put(getMyInfoFail('서버에서 응답이 없습니다.'));
      Alert.alert('서버에서 응답이 없습니다.');
    }
  }
}

export function* requestUnregisterSaga(accessToken: string) {
  let res;
  console.log('before request unregister');

  try {
    res = yield call(mypageAPI.unregister, accessToken);
    console.log('unregister res success: ', res);

    clearTokens();

    yield put(unregisterSuccess());
    yield put(removeSignin());

    console.log(
      'unregister result action:',
      yield select((state) => state.signin)
    );
  } catch (e) {
    res = e.response;
    console.error('unregister fail: ', res);

    const msg = '알 수 없는 에러가 발생했습니다.';
    if (res && !(yield call(handleIfAuthError, res.status))) {
      yield put(unregisterFail(msg));
    } else {
      yield put(unregisterFail('서버에서 응답이 없습니다.'));
    }
  }
}

export function* saveMyInfoSaga(action: any, accessToken: string) {
  let res;
  console.log('before save my info');

  try {
    console.log('before request myinfo save action:', action);
    res = yield call(mypageAPI.saveMyInfo, accessToken, action.payload);
    console.log('save my info res success: ', res);
    Alert.alert('닉네임이 변경되었습니다.');

    put(myInfoSaveSucceess());
    put(saveMyInfoToRedux(action.payload));
  } catch (e) {
    res = e.response;
    console.log('my info save failed: ', res);
    Alert.alert('닉네임을 변경할 수 없습니다:', res ? res.data : '');

    if (res && !(yield call(handleIfAuthError, res.status))) {
      yield put(myInfoSaveFail(res.statusText));
    } else {
      yield put(myInfoSaveFail('서버에서 응답이 없습니다.'));
    }
  }
}

export function* uploadMyPhotoSaga(action: any, accessToken: string) {
  let res;
  console.log('before upload my photo');

  try {
    const { type, uri } = action.payload;
    res = yield call(mypageAPI.uploadPhoto, accessToken, type, uri);

    yield put(uploadMyPhotoSuccess());

    console.log('upload my photo success:', res);
  } catch (e) {
    res = e.response;
    console.error('upload my photo fail:', res);

    const isAuthError = yield call(handleIfAuthError, res.status);

    if (res && !isAuthError) {
      yield put(uploadMyPhotoFail('알려지지 않은 에러입니다.'));
    } else {
      yield put(uploadMyPhotoFail('서버에서 응답이 없습니다..'));
    }
  }
}

export function* requestPasswordChangeSaga(action: any, accessToken: string) {
  let res;
  const { currentPassword, password } = action.payload;
  console.log('before request password change');

  try {
    res = yield call(
      mypageAPI.changePassword,
      accessToken,
      currentPassword,
      password
    );

    console.log('password change success:', res);
    Alert.alert('비밀번호가 변경되었습니다');

    yield put(passwordChangeSuccess());
  } catch (e) {
    res = e.response;
    console.log('password change fail:', res);

    if (res && !(yield call(handleIfAuthError, res.status))) {
      console.log('not auth error');
      if (res && res.status === 404) {
        console.log('password change 404 error');
        const msg = '기존의 비밀번호가 틀렸습니다.';

        yield put(passwordChangeFail(msg));
      } else {
        yield put(passwordChangeFail('비밀번호를 변경할 수 없습니다.'));
      }
    } else {
      yield put(passwordChangeFail('서버에서 응답이 없습니다.'));
    }
  }
}

export function* deleteMyStoreItemSaga(action: any, accessToken: string) {
  let res;
  const storeId = action.payload;
  console.log('before delete mystore item');

  try {
    res = yield call(mypageAPI.deleteMyStoreItem, accessToken, storeId);
    console.log('delete mystore item success: ', res);

    yield put(deleteMyStoreItemSuccess());
    yield put(deleteMyStoreItemInRedux(storeId));
  } catch (e) {
    res = e.response;
    console.log('delete mystore fail:', res);

    if (res && !(yield call(handleIfAuthError, res.status))) {
      yield put(deleteMyStoreItemFail('가게를 삭제할 수 없습니다'));
    } else {
      yield put(deleteMyStoreItemFail('서버에서 응답이 없습니다.'));
    }
  }
}

export function* mypageSaga(action: ActionsWithAuth, accessToken: string) {
  console.log('saga pattern:', action);
  switch (action.type as any) {
    case GET_MY_INFO:
      return yield fork(getMyInfoSaga, action, accessToken);
    case REQUEST_UNREGISTER:
      return yield fork(requestUnregisterSaga, accessToken);
    case SAVE_MY_INFO:
      return yield fork(saveMyInfoSaga, action, accessToken);
    case UPLOAD_MY_PHOTO:
      return yield fork(uploadMyPhotoSaga, action, accessToken);
    case REQUEST_PASSWORD_CHANGE:
      return yield fork(requestPasswordChangeSaga, action, accessToken);
    case DELETE_MY_STORE_ITEM:
      return yield fork(deleteMyStoreItemSaga, action, accessToken);
  }
}

const initialState: MyPageState = {
  store: 0,
  production: 0,
  upload: 0,
  loading: false,
  error: null,
};

export default function mypage(
  state: MyPageState = initialState,
  action: MyPageAction
): MyPageState {
  switch (action.type) {
    case INITIALIZE_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_MY_INFO:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_INFO_SUCCESS:
      console.log('info success:', action.payload);
      return {
        ...state,
        store: action.payload.store,
        production: action.payload.production,
        upload: action.payload.upload,
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
        error: action.payload,
      };

    case SAVE_MY_INFO:
      return {
        ...state,
        loading: true,
      };
    case MY_INFO_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case MY_INFO_SAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPLOAD_MY_PHOTO:
      return {
        ...state,
        loading: false,
      };
    case UPLOAD_MY_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPLOAD_MY_PHOTO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REQUEST_PASSWORD_CHANGE:
      return {
        ...state,
        loading: true,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_MY_STORE_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_STORE_LIST_SUCCESS:
      return {
        ...state,
      };

    case DELETE_MY_STORE_ITEM:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MY_STORE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_MY_STORE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
