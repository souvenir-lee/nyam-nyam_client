import { ActionType } from 'typesafe-actions';
import axios, { AxiosError } from 'axios';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { ItemDetailObject } from '@base/types/item';
import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getItemDetailInfo } from '@base/api/item';

const GET_ITEM_DETAIL = 'itemDetail/GET_ITEM_DETAIL' as const;
const GET_ITEM_DETAIL_SUCCESS = 'itemDetail/GET_ITEM_DETAIL_SUCCESS' as const;
const GET_ITEM_DETAIL_ERROR = 'itemDetail/GET_ITEM_DETAIL_ERROR' as const;

export const getItemDetail = (productionId: null) => ({
  type: GET_ITEM_DETAIL,
  payload: productionId,
});

export const getItemDetailSuccess = (data: ItemDetailObject) => ({
  type: GET_ITEM_DETAIL_SUCCESS,
  payload: data,
});

export const getItemDetailFailure = (error: AxiosError) => ({
  type: GET_ITEM_DETAIL_ERROR,
  payload: error,
});

const actions = {
  getItemDetail,
  getItemDetailSuccess,
  getItemDetailFailure,
};

type ItemDetailAction = ActionType<typeof actions>;

const getItemDetailSaga = createPromiseSaga(GET_ITEM_DETAIL, getItemDetailInfo);

export function* itemDetailSaga() {
  yield takeLatest(GET_ITEM_DETAIL, getItemDetailSaga);
}

const initialState = {
  itemInfo: reducerUtils.initial(null),
};

export default function itemDetail(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM_DETAIL:
    case GET_ITEM_DETAIL_SUCCESS:
    case GET_ITEM_DETAIL_ERROR:
      return handleAsyncActions(
        GET_ITEM_DETAIL,
        'itemInfo',
        null
      )(state, action);
    default:
      return state;
  }
}
