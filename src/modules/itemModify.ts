import { ActionType } from 'typesafe-actions';
import axios, { AxiosError } from 'axios';
import { takeLatest, fork, call, put } from 'redux-saga/effects';

import { getItemDetail } from './itemDetail';
import { initialize } from './salesPredict';
import { ItemDetailObject } from '@base/types/item';
import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getItemModifyInfo, postItemModifyInfo } from '@base/api/item';

const GET_ITEM_MODIFY = 'itemModify/GET_ITEM_MODIFY' as const;
const GET_ITEM_MODIFY_SUCCESS = 'itemModify/GET_ITEM_MODIFY_SUCCESS' as const;
const GET_ITEM_MODIFY_ERROR = 'itemModify/GET_ITEM_MODIFY_ERROR' as const;
const POST_ITEM_MODIFY = 'itemModify/POST_ITEM_MODIFY' as const;
const POST_ITEM_MODIFY_SUCCESS = 'itemModify/POST_ITEM_MODIFY_SUCCESS' as const;
const POST_ITEM_MODIFY_ERROR = 'itemModify/POST_ITEM_MODIFY_ERROR' as const;
const CLEAR_DATA = 'itemModify/CLEAR_DATA' as const;

export const getItemModify = (data) => ({
  type: GET_ITEM_MODIFY,
  payload: data,
});

export const getItemModifySuccess = (data: ItemDetailObject) => ({
  type: GET_ITEM_MODIFY_SUCCESS,
  payload: data,
});

export const getItemModifyFailure = (error: AxiosError) => ({
  type: GET_ITEM_MODIFY_ERROR,
  payload: error,
});

export const postItemModify = (data: FormData, productionId) => ({
  type: POST_ITEM_MODIFY,
  payload: data,
  productionId,
});

export const postItemModifySuccess = () => ({
  type: POST_ITEM_MODIFY_SUCCESS,
});

export const postItemModifyFailure = (error: AxiosError) => ({
  type: POST_ITEM_MODIFY_ERROR,
  payload: error,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

const actions = {
  getItemModify,
  getItemModifySuccess,
  getItemModifyFailure,
  postItemModify,
  postItemModifySuccess,
  postItemModifyFailure,
  clearData,
};

export const ActionsWithAuth = [GET_ITEM_MODIFY, POST_ITEM_MODIFY];
type ItemModifyAction = ActionType<typeof actions>;

function* getItemModifySaga(
  action: ActionType<typeof getPredictData>,
  accessToken: string
) {
  const { productionId, storeId } = action.payload;
  try {
    const result = yield call(
      getItemModifyInfo,
      productionId,
      storeId,
      accessToken
    );
    yield put({ type: GET_ITEM_MODIFY_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: GET_ITEM_MODIFY_ERROR, payload: error });
  }
}

function* postItemModifySaga(
  action: ActionType<typeof getPredictData>,
  accessToken: string
) {
  const data = action.payload;
  try {
    yield call(postItemModifyInfo, data, accessToken);
    yield put(getItemDetail(action.productionId));
    yield put(initialize());
    yield put({ type: POST_ITEM_MODIFY_SUCCESS });
  } catch (error) {
    yield put({ type: POST_ITEM_MODIFY_ERROR, payload: error });
  }
}

export function* itemModifyWithAuthSaga(
  action: ActionsWithAuth,
  accessToken: string
) {
  switch (action.type) {
    case GET_ITEM_MODIFY:
      return yield fork(getItemModifySaga, action, accessToken);
    case POST_ITEM_MODIFY:
      return yield fork(postItemModifySaga, action, accessToken);
  }
}

const initialState = {
  loading: false,
  error: null,
  itemInfo: reducerUtils.initial(null),
};

export default function itemModify(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM_MODIFY:
    case GET_ITEM_MODIFY_SUCCESS:
    case GET_ITEM_MODIFY_ERROR:
      return handleAsyncActions(
        GET_ITEM_MODIFY,
        'itemInfo',
        null
      )(state, action);
    case POST_ITEM_MODIFY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_ITEM_MODIFY_SUCCESS:
      return initialState;
    case POST_ITEM_MODIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
