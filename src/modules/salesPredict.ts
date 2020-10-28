/* eslint-disable no-case-declarations */
import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getOpenWeather } from '@base/api/weather';
import { getPredictDataOfWeather } from '@base/api/predict';
import { SalesPredictState } from '@base/types/SalesPredict';
import { Coords } from '@base/types/defaultTypes';
import { WeatherAPIResults } from '@base/types/weather';
import { PredictDataAPIResults } from '@base/types/predict';

const GET_WEATHER = 'salesPredict/GET_WEATHER' as const;
const GET_WEATHER_SUCCESS = 'salesPredict/GET_WEATHER_SUCCESS' as const;
const GET_WEATHER_ERROR = 'salesPredict/GET_WEATHER_ERROR' as const;
const GET_PREDICT_DATA = 'salesPredict/GET_PREDICT_DATA' as const;
const GET_PREDICT_DATA_SUCCESS = 'salesPredict/GET_PREDICT_DATA_SUCCESS' as const;
const GET_PREDICT_DATA_ERROR = 'salesPredict/GET_PREDICT_DATA_ERROR' as const;

export const getWeather = (info: Coords) => ({
  type: GET_WEATHER,
  payload: info,
});

export const getWeatherSuccess = (data: WeatherAPIResults) => ({
  type: GET_WEATHER_SUCCESS,
  payload: data,
});

export const getWeatherFailure = (error: AxiosError) => ({
  type: GET_WEATHER_ERROR,
  payload: error,
});

export const getPredictData = (day: number) => ({
  type: GET_PREDICT_DATA,
  payload: day,
});

export const getPredictDataSuccess = (data: PredictDataAPIResults) => ({
  type: GET_PREDICT_DATA_SUCCESS,
  payload: data,
});

export const getPredictDataFailure = (error: AxiosError) => ({
  type: GET_PREDICT_DATA_ERROR,
  payload: error,
});

function* getWeatherSaga(action: ActionType<typeof getWeather>) {
  try {
    // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
    const payload = yield call(getOpenWeather, action.payload);
    yield put({ type: GET_PREDICT_DATA, payload: 0 });
    yield put({ type: GET_WEATHER_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_WEATHER_ERROR, error: true, payload: e });
  }
}

function* getPredictDataSaga(
  action: ActionType<typeof getPredictData>,
  accessToken: string
) {
  try {
    const day = action.payload;
    // TODO: state에 저장되어 있는 day 날짜의 날씨 정보를 기준으로 날씨 선정
    const weather = '맑음';
    const storeId = 1;
    const payload = yield call(getPredictDataOfWeather, {
      weather,
      storeId,
      accessToken,
    });
    // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
    yield put({ type: GET_PREDICT_DATA_SUCCESS, payload, meta: day });
  } catch (error) {
    yield put({ type: GET_PREDICT_DATA_ERROR, payload: error });
  }
}

export function* salesPredictWithAuthSaga(
  action: ActionsWithAuth,
  accessToken: string
) {
  console.log(accessToken);
  switch (action.type) {
    case GET_PREDICT_DATA:
      return yield fork(getPredictDataSaga, action, accessToken);
  }
}

export function* salesPredictSaga() {
  yield takeLatest(GET_WEATHER, getWeatherSaga);
}

const actions = {
  getWeather,
  getWeatherSuccess,
  getWeatherFailure,
  getPredictData,
  getPredictDataSuccess,
  getPredictDataFailure,
};

type SalesPredictAction = ActionType<typeof actions>;

export const ActionsWithAuth = [GET_PREDICT_DATA];

const initialState = {
  weather: reducerUtils.initial({ current: null, daily: [] }),
  predictData: reducerUtils.initial({}),
};

export default function salesPredict(
  state: SalesPredictState = initialState,
  action: SalesPredictAction
): SalesPredictState {
  switch (action.type) {
    case GET_WEATHER:
    case GET_WEATHER_SUCCESS:
    case GET_WEATHER_ERROR:
      return handleAsyncActions<SalesPredictState>(
        GET_WEATHER,
        'weather',
        { current: null, daily: [] },
        true
      )(state, action);
    case GET_PREDICT_DATA:
    case GET_PREDICT_DATA_SUCCESS:
    case GET_PREDICT_DATA_ERROR:
      return handleAsyncActionsById<SalesPredictState>(
        GET_PREDICT_DATA,
        'predictData',
        [],
        false
      )(state, action);
    default:
      return state;
  }
}
