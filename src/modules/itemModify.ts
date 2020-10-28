import { ActionType } from 'typesafe-actions';
import axios, { AxiosError } from 'axios';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { ItemDetailObject } from '@base/types/item';
import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getItemModifyInfo, postItemModifyInfo } from '@base/api/item';

const GET_ITEM_MODIFY = 'itemDetail/GET_ITEM_MODIFY' as const;
const GET_ITEM_MODIFY_SUCCESS = 'itemDetail/GET_ITEM_MODIFY_SUCCESS' as const;
const GET_ITEM_MODIFY_ERROR = 'itemDetail/GET_ITEM_MODIFY_ERROR' as const;
const POST_ITEM_MODIFY = 'itemDetail/POST_ITEM_MODIFY' as const;
const POST_ITEM_MODIFY_SUCCESS = 'itemDetail/POST_ITEM_MODIFY_SUCCESS' as const;
const POST_ITEM_MODIFY_ERROR = 'itemDetail/POST_ITEM_MODIFY_ERROR' as const;

export const getItemModify = (productionId: null) => ({
  type: GET_ITEM_MODIFY,
  payload: productionId,
});

export const getItemModifySuccess = (data: ItemDetailObject) => ({
  type: GET_ITEM_MODIFY_SUCCESS,
  payload: data,
});

export const getItemModifyFailure = (error: AxiosError) => ({
  type: GET_ITEM_MODIFY_ERROR,
  payload: error,
});

export const postItemModify = (data) => ({
  type: POST_ITEM_MODIFY,
  payload: data,
});

export const postItemModifySuccess = () => ({
  type: POST_ITEM_MODIFY_SUCCESS,
});

export const postItemModifyFailure = (error: AxiosError) => ({
  type: POST_ITEM_MODIFY_ERROR,
  payload: error,
});

const actions = {
  getItemModify,
  getItemModifySuccess,
  getItemModifyFailure,
  postItemModify,
  postItemModifySuccess,
  postItemModifyFailure,
};

export const ActionsWithAuth = {
  getItemModify,
  postItemModify,
};
type ItemModifyAction = ActionType<typeof actions>;

export const getItemModifySaga = createPromiseSaga(
  GET_ITEM_MODIFY,
  getItemModifyInfo
);
export const postItemModifySaga = createPromiseSaga(
  POST_ITEM_MODIFY,
  postItemModify
);

const initialState = {
  itemInfo: reducerUtils.initial(null),
};

export default function itemDetail(state = initialState, action) {
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
    case POST_ITEM_MODIFY_SUCCESS:
    case POST_ITEM_MODIFY_ERROR:
      return handleAsyncActions(
        POST_ITEM_MODIFY,
        'itemInfo',
        null
      )(state, action);
    default:
      return state;
  }
}
